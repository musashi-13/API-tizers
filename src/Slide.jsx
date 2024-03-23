import { React, useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock, faLocationDot, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const getDarkestColor = (palette) => {
    return palette.reduce((minArray, currentArray) => {
        return currentArray[0] < minArray[0] ? currentArray : minArray;
    }, palette[0]);
};

export default function Slide({ item, slide, idx }){
    const [mainColor, setMainColor] = useState('#f0f0f0');

    useEffect(() => {
        const colorThief = new ColorThief();

        const img = new Image();
        img.src = item.eventImage;

        img.addEventListener('load', () => {
            const palette = colorThief.getPalette(img, 4);
            console.log(palette)
            const darkestColor = getDarkestColor(palette)
            const rgbColor = `rgb(${darkestColor.join(', ')})`;
            setMainColor(rgbColor);
        });
    }, [item.eventImage]);
    
    return(
        <div className={slide === idx ? "SlideHolder" : "SlideHolder slide-hidden"} style={{background: `linear-gradient(to right, rgb(0,0,0,1) -400px, ${mainColor} 400px)`}}>
            <div className='SlideContent'>
                <h1 style={{color:"white"}}>{item.eventName}</h1>
                <p style={{color: "rgb(255, 255, 255, 0.8)"}}>
                    <FontAwesomeIcon icon={faCalendarDays}/>
                    &nbsp;{item.eventDate}&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faClock}/>
                    &nbsp;{item.eventTime}&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faLocationDot}/>
                    &nbsp;{item.eventLoc}
                </p>
                <p style={{color: "rgb(255, 255, 255, 0.8)", width: "80%"}}>{item.eventDesc}</p>
                <button className="regButton">
                    <a style={{ textDecoration: "none" }} href='https://www.google.com' target="_blank" rel="noreferrer">
                        Register Now! <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs'/>
                    </a>
                </button>
                <button className="regButton">
                    <a style={{ textDecoration: "none" }} href='www.google.com' target="_blank" rel="noreferrer">
                        Instagram <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs'/>
                    </a>
                </button>
            </div>
            
            <div style={{position: "relative"}}>
                <img src={item.eventImage} alt="event" height={"400px"} style={{marginRight:"2em"}}/>
                <div style={{position: "absolute", top:"0px",background: `linear-gradient(to right, ${mainColor}, rgb(0,0,0,0))`, width:"120px", height:"400px"}}></div>
                <div style={{position: "absolute", top:"0px", left:"380px",background: `linear-gradient(to right, rgb(0,0,0,0), ${mainColor})`, width:"120px", height:"400px"}}></div>
            </div>
        </div>
    )
}