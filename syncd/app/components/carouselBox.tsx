'use client'
import Carousel from 'react-material-ui-carousel'
import CarouselSlide from './carouselSlide';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface CarouselBoxProps {
    collegeName: string;
  }


interface EventItem {
    eventName: string;
    eventDesc: string;
    eventImage: string;
    eventDate: string;
    eventTime: string;
    eventLoc: string;
}
export default function CarouselBox() {

    const [clg, setCollege] = useState('');
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams){
        const college = searchParams.get('college')
        if (college){
            setCollege(college)
        }
        }
    }, [searchParams]);

    const items = [
        {
            eventName: "Diplomat Wars 4.0",
            eventDesc: "Diplomat Wars is the PES MUN Society 's event that de-constructs the skill set of diplomacy and provide a glimpse of the enthralling World of Model UNs. Whether you are a seasoned MUNer or just curious, this is your chance to showcase and polish your analytical and soft skills!",
            eventImage: "/diplomatwars.png",
            eventDate: "3rd Feb - 4th Feb 2024",
            eventTime: "8 AM",
            eventLoc: "MRD Auditorium"
        },
        {
            eventName: "Otakuiz",
            eventDesc: "Anime lovers and Quizzing enthusiasts join us, QQC on 30th January,2024 for an unforgettable experience as we challenge your quick thinking and knowledge on all things anime. Get a chance to win cash prizes upto 3000 rupees!",
            eventImage: "/animequiz.png",
            eventDate: "30th Jan 2024",
            eventTime: "4 PM",
            eventLoc: "3rd Floor Seminar Hall, BE Block"
        }
    ]
    

    return(
        <div style={{zIndex: "5"}}>
            <p className='text-primary-300 pl-12 py-2 text-xl font-semibold'>Latest events in {clg}</p>
            <Carousel sx={{width: "90vw", margin: "auto", zIndex: "3"}} autoPlay={true} swipe={true} indicators={true} navButtonsAlwaysVisible={true} cycleNavigation={true} animation='slide'>
            {
                items.map( (item, i) => 
                <div className='z-4' key={i}>
                    <CarouselSlide {...item}/>
                </div> 
            )}
            </Carousel>
        </div>
    )
}