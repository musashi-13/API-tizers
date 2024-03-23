import React, { useState } from 'react';
import './App.css';
import TodayCardContainer from './TodayContainer';
import UpcomingCardContainer from './UpcomingContainer';
import Calendar from './calendar';
import Sidebar from './sideBar';
import Slideshow from './Slideshow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faBell, faScrewdriverWrench, faUser} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
function App() {
  const [showLiked, setShowLiked] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };  
  const toggleShowLiked = () => {
    setShowLiked(!showLiked);
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
  return (
    <div>
      
      <nav className="navBar">
        <h1 className="nameLogo">SYNCd</h1>
        <button className="navButtons"><a href='https://github.com/musashi-13/Calendarize' style={{textDecoration: "none", color: "white"}}><FontAwesomeIcon icon={faGithub} size="xl"/></a></button>      
        <button className="navButtons"><Link to='/login' style={{color: 'white'}}><FontAwesomeIcon icon={faScrewdriverWrench} size="xl"/></Link></button>
        <button className="navButtons"><FontAwesomeIcon icon={faUser} size="xl"/></button>      
        <button className="navButtons" onClick={toggleSidebar}><FontAwesomeIcon icon={faBell} size="xl"/></button>
      </nav>
      <div style={{position: "fixed", height: "54px", backdropFilter: "blur(5px)", width: "100%", zIndex: "9"}}></div>
      <div style={{height: "40px"}}></div>
      <h1 className="todayEvents" style={{marginBottom: "0.5em", position: "relative"}}>Spotlight</h1>
      <Slideshow/>
      <div className='filterContainer'>
          <button className={`filterButtons ${showLiked ? 'activeLiked' : 'activeUnliked'}`} onClick={toggleShowLiked}><FontAwesomeIcon icon={faHeart} size="l" /></button>
          <button className={`filterButtons ${isActiveAll ? 'activeAll' : ''}`} onClick={toggleColorAll}>All</button>
          <button className={`filterButtons ${isActive1 ? 'active1' : ''}`} onClick={toggleColor1}>Hackathons</button>
          <button className={`filterButtons ${isActive2 ? 'active2' : ''}`} onClick={toggleColor2}>Fests</button>
          <button className={`filterButtons ${isActive3 ? 'active3' : ''}`} onClick={toggleColor3}>Recruitments</button>
          <button className={`filterButtons ${isActive4 ? 'active4' : ''}`} onClick={toggleColor4}>Competitions</button>
          <button className={`filterButtons ${isActive5 ? 'active5' : ''}`} onClick={toggleColor5}>Conferences</button>
          <button className={`filterButtons ${isActive6 ? 'active6' : ''}`} onClick={toggleColor6}>Quizzes</button>
          <button className={`filterButtons ${isActive7 ? 'active7' : ''}`} onClick={toggleColor7}>Marathons</button>
          <button className={`filterButtons ${isActive8 ? 'active8' : ''}`} onClick={toggleColor8}>ISAs</button>
      </div>
      <h1 className="todayEvents">Today's Events</h1>
      <TodayCardContainer showLiked={showLiked} filterAll={isActiveAll} hackathons={isActive1} fests={isActive2} recruitments={isActive3} competitions={isActive4} conferences={isActive5} quizzes={isActive6} marathons={isActive7} isas={isActive8}/>
      <h1 className="upcomingEvents">Upcoming Events</h1>
      <UpcomingCardContainer showLiked={showLiked} filterAll={isActiveAll} hackathons={isActive1} fests={isActive2} recruitments={isActive3} competitions={isActive4} conferences={isActive5} quizzes={isActive6} marathons={isActive7} isas={isActive8}/>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="calendarContainer">
        <Calendar />
      </div>
    </div>
  );
}
export default App; 