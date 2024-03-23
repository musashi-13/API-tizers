import './addevent.css'
import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus, faInfoCircle, faSquareXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


export default function AddEvent(){

    const [edesc, setDesc] = useState('');
    const [ename, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDescChange = (event) => {
    setDesc(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form successfully submitted");
    };
    
    const handleAdd = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        console.log(isSubmitting);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setIsSubmitting(false);
        console.log(isSubmitting);
    };

    return(
        <div className='event-container'>
            <form className={`event-form ${isSubmitting ? 'submitting' : ''}`} onSubmit={handleSubmit}>
                <Link to='../login'><FontAwesomeIcon icon={faArrowLeft} style={{position: "absolute", color: "rgb(96, 96, 96)"}} /></Link>
                <h2>Add an event</h2>
                <label>Event Name</label>
                <div>
                    <input maxLength='25' type="text" value={ename} onChange={handleNameChange} style={{width: '83%'}}/>
                    <label>{ename.length}/25</label>
                </div> 
                <label>Event Description &nbsp; 
                    <FontAwesomeIcon className='info-bubble' icon={faInfoCircle} size='xs'/>
                    <span class="info-text">Keep</span>
                </label>
                <div>
                    <input maxLength='120' type="text" value={edesc} onChange={handleDescChange} style={{width: '83%'}}/>
                    <label>{edesc.length}/120</label>
                </div>  
                <label>Event Category &nbsp; 
                    <FontAwesomeIcon className='info-bubble' icon={faInfoCircle} size='xs'/>
                    <span class="info-text">Tooltip text</span>
                </label>
                <select className='select-category'>
                <option value="Hackathon">--Category--</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Fest">Fest</option>
                    <option value="Recruitment">Recruitment</option>
                    <option value="Competition">Competition</option>
                    <option value="Conference">Conference</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Marathon">Marathon</option>
                    <option value="ISAs">ISAs</option>
                </select>
                <label>Start date and time</label>
                <div className='date-time-container'>
                    <input type='date'/>
                    <input type='time'/>
                </div>
                <label>End date and time</label>
                <div className='date-time-container'>
                    <input type='date'/>
                    <input type='time'/>
                </div>
                <label>Registration Link</label>
                <input/>
                <label>Registration end date and time</label>
                <div className='date-time-container'>
                    <input type='date'/>
                    <input type='time'/>
                </div>
                <label>Instagram Link</label>
                <input/>
                <label>Add Image Link</label>
                <input/>
                <div className='event-button-container'>
                {!isSubmitting ? (
                        <>
                            <button type='button' id='Add' onClick={handleAdd}>Add &nbsp; <FontAwesomeIcon icon={faFolderPlus} /></button>
                            <button type='clear' id='Clear'>Clear &nbsp; <FontAwesomeIcon icon={faSquareXmark} /></button>
                        </>
                    ) : (
                        <>
                            <button type='submit' id='Confirm'>Confirm</button>
                            <button type='button' id='Cancel' onClick={handleCancel}>Cancel</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}