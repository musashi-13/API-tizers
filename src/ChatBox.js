import React, { useState } from 'react';
import './ChatBox.css'; // You can create ChatBox.css file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ChatBox() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Make an API call to get the response for the prompt
        try {
            const apiResponse = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt }),
            });
            const responseData = await apiResponse.json();
            setResponse(responseData.response); // Assuming your API returns a 'response' field
        } catch (error) {
            console.error('Error fetching response:', error);
            // Handle error
        }
    };

    return (
        <div className="chatBoxPage">
            <form className="form" onSubmit={handleSubmit}>
                <p className="Heading">Chat with our AI</p>
                <input
                    type="text"
                    className="inputBox"
                    placeholder="Type your prompt here"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit" className="submitBtn">
                    Submit
                </button>
                {response && (
                    <div className="responseContainer">
                        <p className="response">{response}</p>
                    </div>
                )}
                <Link className="backButton" to="/">
                    <FontAwesomeIcon icon={faHome} /> Back to Home
                </Link>
            </form>
        </div>
    );
}
