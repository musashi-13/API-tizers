import './login.css'
import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate} from 'react-router-dom'

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === 'admin@gmail.com' && password === 'password') {
            navigate('/addEvent');
        } else {
            alert('Incorrect username or password');
        }
    };

    return(
        <div className="loginPage">
            <form class="form" onSubmit={handleSubmit}>
                <p className='Heading'>Login as admin</p>
                <input
                    type="email"
                    className="inputBox"
                    placeholder=" Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="inputBox"
                    placeholder=" Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className='forgotpass'><a href='https://www.google.com'>Forgot password?</a></p>
                <button type='submit' className='loginbutton'>Login</button>
                <p>Having trouble?&nbsp;<Link to='/addEvent'>Contact us</Link></p>
                <Link className='backbutton' to='/'><FontAwesomeIcon icon={faHome} /></Link>
            </form>
        </div>
    )
}