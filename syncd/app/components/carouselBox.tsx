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
            eventName: "NexGen",
            eventDesc: "24 hour hackathon by Nexus Club under the CSE department.",
            eventImage: "/diplomatwars.png",
            eventDate: "6th Apr - 7th Apr 2024",
            eventTime: "8 AM",
            eventLoc: "MRD Auditorium, RR campus, PES university"
        },
        {
            eventName: "Graviton 2.0",
            eventDesc: "First 24 hour Quantum hackathon by QForest, the Quantum Club of PES University",
            eventImage: "/animequiz.png",
            eventDate: "6th Apr - 7th Apr 202",
            eventTime: "8 AM",
            eventLoc: "13rd Floor, BE Block"
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
