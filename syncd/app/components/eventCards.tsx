import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare, faCalendarDay, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
export default function EventCards() {
    const [events, setEvents] = useState([]);
    const [showLiked, setShowLiked] = useState(false);

    const toggleShowLiked = (e: any) => {
        setShowLiked(!showLiked);
    };

    const categoryColors = {
        all: "bg-stone-200",
        hackathons: "bg-blue-200",
        conferences: "bg-fuchsia-200",
        competitions: "bg-teal-200",
        fests: "bg-green-200",
        quizzes: "bg-purple-200",
        marathons: "bg-amber-200",
        exams: "bg-rose-200",
        recruitments: "bg-lime-200",
        other: "bg-gray-200" 
    };

    const [isActiveAll, setIsActiveAll] = useState(true);
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const [isActive5, setIsActive5] = useState(false);
    const [isActive6, setIsActive6] = useState(false);
    const [isActive7, setIsActive7] = useState(false);
    const [isActive8, setIsActive8] = useState(false);

    const toggleColorAll = () => {
        setIsActiveAll(true);
        setIsActive1(false);
        setIsActive2(false);
        setIsActive3(false);
        setIsActive4(false);
        setIsActive5(false);
        setIsActive6(false);
        setIsActive7(false);
        setIsActive8(false);
    };
    const toggleColor1 = () => {
        setIsActiveAll(false);
        setIsActive1(!isActive1);
    };
    const toggleColor2 = () => {
        setIsActiveAll(false);
        setIsActive2(!isActive2);
    };
    const toggleColor3 = () => {
        setIsActiveAll(false);
        setIsActive3(!isActive3);
    };
    const toggleColor4 = () => {
        setIsActiveAll(false);
        setIsActive4(!isActive4);
    };
    const toggleColor5 = () => {
        setIsActiveAll(false);
        setIsActive5(!isActive5);
    };
    const toggleColor6 = () => {
        setIsActiveAll(false);
        setIsActive6(!isActive6);
    };
    const toggleColor7 = () => {
        setIsActiveAll(false);
        setIsActive7(!isActive7);
    };
    const toggleColor8 = () => {
        setIsActiveAll(false);
        setIsActive8(!isActive8);
    };
    useEffect(() => {
        // Fetch events data from data.json
        fetch('/data.json')
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(error => console.error('Error fetching events:', error));
    }, []);

    return (
        <div>
            <div className="flex gap-4 justify-center my-4">
                <button className="text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4" onClick={toggleShowLiked}><FontAwesomeIcon icon={faHeart} /></button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActiveAll ? (categoryColors.all): ('')}`} onClick={toggleColorAll}>All</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive1 ? (categoryColors.hackathons): ('')}`} onClick={toggleColor1}>Hackathons</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive2 ? (categoryColors.conferences): ('')}`} onClick={toggleColor2}>Conferences</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive3 ? (categoryColors.fests): ('')}`} onClick={toggleColor3}>Festivals</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive4 ? (categoryColors.recruitments): ('')}`} onClick={toggleColor4}>Recruitments</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive5 ? (categoryColors.competitions): ('')}`} onClick={toggleColor5}>Competitions</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive6 ? (categoryColors.quizzes): ('')}`} onClick={toggleColor6}>Quizzes</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive7 ? (categoryColors.exams): ('')}`} onClick={toggleColor7}>Exams</button>
                <button className={`text-primary-300 shadow rounded-xl border-2 border-primary-300 py-1 px-4 ${isActive8 ? (categoryColors.marathons): ('')}`} onClick={toggleColor8}>Marathons</button>
            </div>
            <div className="flex gap-4 flex-wrap mx-8 justify-center text-primary-300">
                {events.map((event: any, index: any) => (
                    (isActiveAll 
                        || (isActive1 && event.event_category==="hackathons") 
                        || (isActive2 && event.event_category==="conferences")
                        || (isActive3 && event.event_category==="fests")
                        || (isActive4 && event.event_category==="recruitments")
                        || (isActive5 && event.event_category==="competitions")
                        || (isActive6 && event.event_category==="quiezzes")
                        || (isActive7 && event.event_category==="exams")
                        || (isActive8 && event.event_category==="marathons")) ? (
                        <div key={index} style={{width: "21em"}} className={`p-4 rounded-xl shadow-lg ${(categoryColors as any)[event.event_category] || categoryColors.other}`}>   
                            <div className="flex justify-between">
                                <p className="font-bold text-xl pb-4">{event.event_name}</p>
                                <button className={`heartButton ${showLiked ? 'liked' : ''}`} onClick={() => (setShowLiked)}>
                                    <FontAwesomeIcon icon={faHeart} size="2xl" />
                                </button></div>
                            {event.event_location &&< p><FontAwesomeIcon icon={faLocationDot} />  {event.event_location}</p> }
                            <div >{event.event_date && <p><FontAwesomeIcon icon={faCalendarDay} /> {event.event_date}</p>}{event.event_time && <p><FontAwesomeIcon icon={faClock} /> {event.event_time}</p>}</div>
                            <p className="pt-4"><b>Restrictions: {event.event_restrictions || 'Not specified'}</b></p>
                            <p>Sign up before: {event.last_date_for_signing_up || 'Not specified'}</p>
                            {event.event_registration_link && (
                                <a href={event.event_registration_link} target="_blank" rel="noopener noreferrer">
                                    <u>Register</u><FontAwesomeIcon style={{paddingLeft: "0.4rem"}} icon={faArrowUpRightFromSquare} size="xs"/>
                                </a>
                            )}
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    )
}