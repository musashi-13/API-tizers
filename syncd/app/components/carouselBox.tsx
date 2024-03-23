import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import CarouselSlide from './carouselSlide';

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
export default function CarouselBox(props: CarouselBoxProps) {
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
        <div>
            <p className='text-primary-300 px-4 py-2 text-xl font-semibold'>Latest events in {props.collegeName}</p>
            <Carousel sx={{width: "90vw", margin: "auto"}} autoPlay={true} swipe={true} indicators={true} navButtonsAlwaysVisible={true} cycleNavigation={true} animation='slide'>
            {
                items.map( (item, i) => 
                <div key={i}>
                    <CarouselSlide {...item}/>
                </div> 
            )}
            </Carousel>
        </div>
    )
}