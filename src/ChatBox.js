import React, { useState, useEffect } from 'react';
import './ChatBox.css'; // You can create ChatBox.css file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Added loading spinner icon
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyA9Zldp6ml7Y97uANdAVgHz8KJ0bboXC_E');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadKnowledgeBase();
    }, []);

    const loadKnowledgeBase = async () => {
        try {
            const response = await fetch('./ok.txt');
            const knowledge = await response.text();
            setKnowledgeBase(knowledge);
        } catch (error) {
            console.error('Error loading knowledge base:', error);
        }
    };

    const aiRun = async () => {
        setLoading(true);
        setResponse([]);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${knowledgeBase} ${search}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().split('\n');
        setResponse(text);
        setLoading(false);
        addToHistory(search, text);
    }

    const addToHistory = (prompt, response) => {
        const updatedHistory = [...history.slice(-2), { prompt, response }];
        setHistory(updatedHistory);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        if (search.trim() !== '') {
            aiRun();
        }
    }

    return (
        <div className="container">
            <h1 className="heading">Ask Anything to Our AI ChatBot</h1>
            <div className="content">
                <div className="input-container">
                    <input className="input-field" placeholder='Ask something...' onChange={(e) => handleChangeSearch(e)} />
                    <button className="search-button" onClick={() => handleClick()}>
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Ask"}
                    </button>
                </div>

                {loading && aiResponse.length === 0 ?
                    <p className="loading-text">Thinking...</p>
                    :
                    <div className="response-container">
                        {aiResponse.map((line, index) => (
                            <p key={index} className="response-text">
                                {line}
                            </p>
                        ))}
                    </div>
                }

                <div className="history-container">
                    <h2 className="history-heading">Recent Conversations</h2>
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                            <p className="prompt-text"><strong>User:</strong> {item.prompt}</p>
                            <p className="response-text"><strong>AI:</strong> {item.response.join(' ')}</p>
                        </div>
                    ))}
                </div>

                <Link className="backButton" to="/">
                    <FontAwesomeIcon icon={faHome} /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default AiwithText;
