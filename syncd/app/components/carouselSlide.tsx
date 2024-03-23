"use client"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import ColorThief from 'colorthief';
import NextImage from "next/image";
type EventItem = {
    eventName: string;
    eventDesc: string;
    eventImage: string;
    eventDate: string;
    eventTime: string;
    eventLoc: string;
};

type RGBColor = [number, number, number];
type Palette = RGBColor[];

const getDarkestColor = (palette: Palette): RGBColor => {
    return palette.reduce((minArray: RGBColor, currentArray: RGBColor) => {
        return currentArray[0] < minArray[0] ? currentArray : minArray;
    }, palette[0]);
};



export default function CarouselSlide(item: EventItem) {
    
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
    return (
        <div className="flex" style={{background: `linear-gradient(to right, rgb(0,0,0,1) -400px, ${mainColor} 400px)`, height: "310px"}}>
            
            <div className="flex p-4 pl-12 flex-col" style={{width: "50em"}}>
                <h1 className="text-white text-3xl font-semibold pb-4">{item.eventName}</h1>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarDays}/>
                    <p className="pr-2">{item.eventDate}</p>
                    <FontAwesomeIcon icon={faClock}/>
                    <p className="pr-2">{item.eventTime}</p>
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <p className="pr-2">{item.eventLoc}</p>
                </div>
                <p className="text-white text-opacity-80">{item.eventDesc}</p>
                <div className="flex gap-4 py-4">
                    <button>
                        <a style={{ textDecoration: "none" }} href='https://www.google.com' target="_blank" rel="noreferrer">
                            Register Now! <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs'/>
                        </a>
                    </button>
                    <button>
                        <a style={{ textDecoration: "none" }} href='www.google.com' target="_blank" rel="noreferrer">
                            Instagram <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='xs'/>
                        </a>
                    </button>
                </div>
            </div>
            
            <div className="flex">
                <div style={{
                    background: `linear-gradient(to right, ${mainColor}, rgb(0,0,0,0))`, 
                    width:"140px", height:"310px",
                    translate: "52px"
                    }}></div>
                <NextImage src={item.eventImage} alt="event" height={500} width={625}/>
            </div>
        </div>
    )
}