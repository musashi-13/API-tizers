import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarCard from './SidebarCard';
import CollegeEvents from './CollegeEvents.json';
import cardTheme from './CardTheme';


const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="closeButton" onClick={onClose}><FontAwesomeIcon icon={faX} size='xl'/></button>
        <div className= "sidebarContainer">
        <h2 style={{marginLeft: "1em"}}>Hurry up before they close!</h2>
        {CollegeEvents.map(cEvent => {
            const eventFromDate = new Date(cEvent.eventFrom);
            const eventToDate = new Date(cEvent.eventTo);
            const today = new Date();
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
            closingDate-today < 86400000 && closingDate-today >0
            ) {
                return (
                    <div>
                    <SidebarCard
                        EventName={cEvent.eventName}
                        EventFrom={formattedFromDate}
                        EventTo={formattedToDate}
                        EventDesc={cEvent.eventDesc}
                        StudentCrit={cEvent.studentCriteria}
                        RegLink={cEvent.regLink}
                        RegStatus={closingDate - today}
                        linearGradient={gradientStyle}
                    />
                    </div>
                );
            } else {
                return null
            }
        })}
        </div>
    </div>
  );
};

export default Sidebar;