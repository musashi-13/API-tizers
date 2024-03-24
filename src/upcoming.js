import React, { useState, useEffect } from "react";
import { faHeart, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CollegeEvents from "./CollegeEvents.json"; // Import JSON file

function UpcomingCard(props) {
  const [eventData, setEventData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find event data by eventId
    const event = CollegeEvents.find(event => event.eventName === props.EventName);
    setEventData(event);
    
    // Check if there's a stored value for this event's favorite status
    const likedStatus = localStorage.getItem(`event_${props.EventName}_liked`);
    setIsLiked(likedStatus === "true");
  }, [props.EventName]);

  const handleLike = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    // Store the new liked status in localStorage
    localStorage.setItem(`event_${props.EventName}_liked`, newLikedStatus.toString());
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="UpcomingCard" style={{ background: props.linearGradient }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0 }}>{eventData.eventName}</h1>
        <button className={`heartButton ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          <FontAwesomeIcon icon={faHeart} size="2xl" />
        </button>
      </div>
      <p style={{ marginTop: 0, marginBottom: '1em', fontSize: '14px', textTransform: "uppercase" }}>
        <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: "0.5em" }} />
        {props.EventFrom} to {props.EventTo}
      </p>
      <p style={{ margin: '0.3em', fontSize: '14px' }}>{eventData.eventDesc}</p>
      <p style={{ marginTop: '0.3em', marginLeft: '0.3em', marginBottom: '1em', fontSize: '14px' }}>
        Criteria: {props.StudentCrit}
      </p>
      {props.RegStatus > 86400000 ? (
        <button className="regButton">
          <a href={props.RegLink} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
            Register Now!
          </a>
        </button>
      ) : props.RegStatus > 0 ? (
        <button className="regButton">
          <a href={props.RegLink} style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
            Closing Soon..
          </a>
        </button>
      ) : (
        <button className="regButton" disabled>
          Closed :/
        </button>
      )}
    </div>
  );
}

export default UpcomingCard;
