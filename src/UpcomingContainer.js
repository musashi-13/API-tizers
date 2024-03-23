import React, { useRef, useState } from 'react';
import UpcomingCard from './upcoming';
import CollegeEvents from './CollegeEvents.json';
import cardTheme from './CardTheme';


function UpcomingCardContainer(props) {
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

  return (
    <div
    className= "upcomingCardContainer"
    ref={containerRef}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    >
      {CollegeEvents.map(cEvent => {
        const eventFromDate = new Date(cEvent.eventFrom);
        const eventToDate = new Date(cEvent.eventTo);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const closingDate = new Date(cEvent.regStatus);
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
        const gradientStyle = cardTheme[cEvent.eventTheme];
        if (
          eventFromDate.getDate() === today.getDate() &&
          eventFromDate.getMonth() === today.getMonth() &&
          eventFromDate.getFullYear() === today.getFullYear()
        ) {
          return null;
        } else {
          return (
            <div 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
              {props.filterAll || 
              (props.hackathons && cEvent.eventTheme==="Hackathon") ||
              (props.fests && cEvent.eventTheme==="Cultural") ||
              (props.recruitments && cEvent.eventTheme==="Recruitment") ||
              (props.competitions && cEvent.eventTheme==="Competition") ||
              (props.quizzes && cEvent.eventTheme==="Quiz") ||
              (props.marathons && cEvent.eventTheme==="Marathon") ||
              (props.isas && cEvent.eventTheme==="ISA") ||
              (props.conferences && cEvent.eventTheme==="Conference") ? (
              <UpcomingCard
                EventName={cEvent.eventName}
                EventFrom={formattedFromDate}
                EventTo={formattedToDate}
                EventDesc={cEvent.eventDesc}
                StudentCrit={cEvent.studentCriteria}
                RegLink={cEvent.regLink}
                RegStatus={closingDate - today}
                Like={props.showLiked}
                linearGradient={gradientStyle}
              />
              ) : (null)}
              </div>
          );  
        }
      })}
    </div>
  );
}

export default UpcomingCardContainer;