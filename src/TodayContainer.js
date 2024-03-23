import React, { useRef, useState } from 'react';
import TodayCard from './Today';
import CollegeEvents from './CollegeEvents.json';
import cardTheme from './CardTheme';

function TodayCardContainer(props) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const today = new Date();
  const eventsToday = CollegeEvents.filter((cEvent) => {
    const eventFromDate = new Date(cEvent.eventFrom);
    const eventToDate = new Date(cEvent.eventTo);

    return (
      (today.getDate() >= eventFromDate.getDate() &&
        today.getMonth() >= eventFromDate.getMonth() &&
        today.getFullYear() >= eventFromDate.getFullYear()) &&
      (today.getDate() <= eventToDate.getDate() &&
        today.getMonth() <= eventToDate.getMonth() &&
        today.getFullYear() <= eventToDate.getFullYear())
    );
  });
  console.log(props.filterAll)
  return (
    <div className="todayCardContainer" ref={containerRef}>
      {eventsToday.length > 0 ? (
        eventsToday.map((cEvent) => {
          const eventFromDate = new Date(cEvent.eventFrom);
          const eventToDate = new Date(cEvent.eventTo);
          const formattedFromDate = eventFromDate.toLocaleDateString('en-IN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
          });
          const formattedToDate = eventToDate.toLocaleDateString('en-IN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            hour12: true,
          });
          const closingDate = new Date(cEvent.regStatus);
          return (
            <div>
              {props.filterAll || 
              (props.hackathons && cEvent.eventTheme==="Hackathon") ||
              (props.fests && cEvent.eventTheme==="Cultural") ||
              (props.recruitments && cEvent.eventTheme==="Recruitment") ||
              (props.competitions && cEvent.eventTheme==="Competition") ||
              (props.quizzes && cEvent.eventTheme==="Quiz") ||
              (props.marathons && cEvent.eventTheme==="Marathon") ||
              (props.isas && cEvent.eventTheme==="ISA") ||
              (props.conferences && cEvent.eventTheme==="Conference") ? (
                <div
                  key={cEvent.id}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                >
                  <TodayCard
                    EventName={cEvent.eventName}
                    EventFrom={formattedFromDate}
                    EventTo={formattedToDate}
                    EventDesc={cEvent.eventDesc}
                    StudentCrit={cEvent.studentCriteria}
                    RegLink={cEvent.regLink}
                    RegStatus={closingDate - today}
                    Like={props.showLiked}
                    TodayStatus={true}
                    linearGradient={cardTheme[cEvent.eventTheme]}
                  />
                </div>
              ):(
                <TodayCard/>
              )}
            </div>
          );
        })
      ) : (
        <TodayCard />
      )}
    </div>
  );
}

export default TodayCardContainer;
