import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import eventsData from './CollegeEvents.json';
import cardTheme from './CardTheme';
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState([]);
  const [selectedEventDate, setSelectedEventDate] = useState(null);

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const getDaysArray = () => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };

  const getEventInfo = (day) => {
    const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);

    const matchingEvents = eventsData.filter((event) => {
      const eventFrom = new Date(event.eventFrom);
      const eventTo = new Date(event.eventTo);

      const eventStartDate = new Date(eventFrom.getFullYear(), eventFrom.getMonth(), eventFrom.getDate());

      return currentDate >= eventStartDate && currentDate < eventTo;
    });

    return matchingEvents;
  };

  const createCalendar = () => {
    const calendar = [];

    calendar.push(
      <tr key="header">
        {getDaysArray().map((day) => (
          <th key={day} className="header-cell">
            {day}
          </th>
        ))}
      </tr>
    );

    const totalWeeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    for (let week = 0; week < totalWeeks; week++) {
      const row = [];

      for (let day = 0; day < 7; day++) {
        const dayNumber = week * 7 + day + 1 - firstDayOfMonth;

        row.push(
          <td key={day} className="calendar-cell" onClick={() => handleDateClick(dayNumber)}>
            {dayNumber > 0 && dayNumber <= daysInMonth ? (
              <div>
                <div>{dayNumber}</div>
                {getEventInfo(dayNumber).map((event, index) => (
                  <div key={index}>
                    <strong style={{background: cardTheme[event.eventTheme], color:'white', padding: "0.2em",borderRadius:"0.2em", margin:"0.3em"} }className='cont'>{event.eventName}</strong>
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </td>
        );
      }

      calendar.push(<tr key={week}>{row}</tr>);
    }

    return calendar;
  };

  const handleDateClick = (day) => {
    if (day > 0 && day <= daysInMonth) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day

      const matchingEvents = eventsData.filter((event) => {
        const eventStartDate = new Date(event.eventFrom);
        const eventEndDate = new Date(event.eventTo);

        return eventStartDate <= endOfDay && eventEndDate >= currentDate;
      });

      setSelectedEventData(matchingEvents);
      setSelectedEventDate(currentDate);
      setShowEventModal(true);
    } else {
      setSelectedEventData([]);
      setSelectedEventDate(null);
      setShowEventModal(false);
    }
  };

  const hideEventModal = () => {
    setSelectedEventDate(null);
    setShowEventModal(false);
  };

  return (
    <div style={{display: "flex"}}>
      <div>
        <h1>Calendar of Events</h1>
        <div className="div-container">
          <button onClick={prevMonth} className="b1">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          &nbsp;&nbsp;
          <span>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          &nbsp;&nbsp;
          <button onClick={nextMonth} className="b2">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <table className="calendar-table">
          <tbody>{createCalendar()}</tbody>
        </table>
      </div>
      <div style={{position: "relative", top: "100px", marginLeft: "20px", width: "300px"}}>
        {showEventModal && selectedEventDate && (
          <div className="event-modal">
            <div className="event-modal-content">
              <h2>Events for {selectedEventDate.toLocaleDateString('en-IN')}: {selectedEventData.length > 0 ? '' : 'No events'}</h2>
              <ul style={{margin: 0, padding: 0}}>
                {selectedEventData.map((event, index) => (
                  <div key={index}>
                    <h3 style={{margin:0, marginTop:"10px"}}>{event.eventName}</h3>
                    <p style={{margin:0}}>{event.eventDesc}</p>
                    <p style={{margin:0}}>{event.studentCriteria}</p>
                    <p style={{margin:0}}>Registration Link: {event.regLink}</p>
                    <p style={{margin:0}}>Last Date to Register: {event.regStatus}</p>
                    <p style={{margin:0}}>Category: {event.eventTheme}</p>
                  </div>
                ))}
              </ul>
              <button onClick={hideEventModal} style={{marginTop: "20px", backgroundColor: "rgb(0,0,0,0)", border: "none"}}>
                <FontAwesomeIcon icon={faX} size='xl' />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;