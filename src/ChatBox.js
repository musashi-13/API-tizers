import React, { useState } from 'react';
import './ChatBox.css'; // You can create ChatBox.css file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyA9Zldp6ml7Y97uANdAVgHz8KJ0bboXC_E');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${search}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }


    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input placeholder='Chat using Generative AI' onChange={(e) => handleChangeSearch(e)} />
                <button style={{ marginLeft: '20px' }} onClick={() => handleClick()}>Search</button>
            </div>

            {
                loading == true && (aiResponse == '') ?
                    <p style={{ margin: '30px 0' }}>Loading ...</p>
                    :
                    <div style={{ margin: '30px 0' }}>
                        <p>{aiResponse}</p>
                    </div>
            }
            <Link className="backButton" to="/">
                    <FontAwesomeIcon icon={faHome} /> Back to Home
            </Link>
        </div>
    );
};
export default AiwithText
