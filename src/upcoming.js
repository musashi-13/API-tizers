import React, { useState } from "react";
import { faHeart, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UpcomingCard(props) {
  const [isLiked, setIsLiked] = useState(props.like);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  if(!props.Like){
    if(props.EventName !== "Nil"){
      return (
        <div className="UpcomingCard" style={{ background: props.linearGradient }}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <h1 style={{margin:0}}>{props.EventName}</h1>
          <button className={`heartButton ${isLiked ? 'liked' : ''}`} onClick={handleLike}><FontAwesomeIcon icon={faHeart} size="2xl" />
          </button>
          </div>
          <p style={{marginTop:0, marginBottom: '1em', fontSize:'14px', textTransform: "uppercase"}}><FontAwesomeIcon icon={faCalendarDays} style={{marginRight: "0.5em"}}/>{props.EventFrom} to {props.EventTo}</p>
          <p style={{margin:'0.3em', fontSize:'14px',}}>{props.EventDesc}</p>
          <p style={{marginTop:'0.3em',marginLeft:'0.3em', marginBottom: '1em', fontSize:'14px',}}>Criteria: {props.StudentCrit}</p>
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
            )
          }
        </div>
      );
    } else {
      return(
        <div style={{height: "11em", width: "18em"}}>
          <img src="https://ih1.redbubble.net/image.2415273964.3364/st,small,507x507-pad,600x600,f8f8f8.jpg" width={80} height={80} style={{borderRadius: "10px"}} alt="ghost"></img>
        </div>
      );
    }
  } else if (isLiked) {
    return (
      <div className="UpcomingCard" style={{ background: props.linearGradient }}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h1 style={{margin:0}}>{props.EventName}</h1>
        <button className={`heartButton ${isLiked ? 'liked' : ''}`} onClick={handleLike}><FontAwesomeIcon icon={faHeart} size="2xl" />
        </button>
        </div>
        <p style={{marginTop:0, marginBottom: '1em', fontSize:'14px', textTransform: "uppercase"}}>{props.EventFrom} to {props.EventTo}</p>
        <p style={{margin:'0.3em', fontSize:'14px',}}>{props.EventDesc}</p>
        <p style={{marginTop:'0.3em',marginLeft:'0.3em', marginBottom: '1em', fontSize:'14px',}}>Criteria: {props.StudentCrit}</p>
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
          )
        }
      </div>
    );
  }
}
export default UpcomingCard