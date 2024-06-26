import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from 'next/image';

export default function AiwithText() {
    const [viewChat, setViewChat] = useState(false);
    const [highlightedPrompt, setHighlightedPrompt] = useState<string | null>(null);

    const genAI = new GoogleGenerativeAI('AIzaSyA9Zldp6ml7Y97uANdAVgHz8KJ0bboXC_E');

    const [search, setSearch] = useState<string>('');
    const [aiResponse, setResponse] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [knowledgeBase, setKnowledgeBase] = useState<string>('');
    const [history, setHistory] = useState<{ prompt: string; response: string[] }[]>([]);
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

    useEffect(() => {
        loadKnowledgeBase();
    }, []);

    const loadKnowledgeBase = async () => {
        try {
            const response = await fetch('./data.json');
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
        const prompt = `${knowledgeBase} ${search} . Also give the respone in a beautiful paragraph format for each event`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().split('\n').map(paragraph => {
            return paragraph.split('**').map((part, i) => {
                if (i % 2 === 0) {
                    return part;
                } else {
                    return `**${part}**`; // Convert JSX elements to strings
                }
            }).join('');
        });
        setResponse(text);
        setLoading(false);
        addToHistory(search, text);
    }

    const addToHistory = (prompt: string, response: string[]) => {
        const updatedHistory = [...history.slice(-2), { prompt, response }];
        setHistory(updatedHistory);
    }

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    
        // Standard prompts/questions suggestions
        const standardPrompts = [
            "What are the upcoming events",
            "What are the upcoming hackathons",
            "Internship opportunities"
        ];
    
        const userInput = e.target.value.trim().toLowerCase();
        const suggestedPrompts = standardPrompts.filter(prompt =>
            prompt.toLowerCase().includes(userInput)
        );
    
        // You can set the suggested prompts in state or use them directly in the UI
        // For simplicity, let's set them in state
        setSuggestedPrompts(suggestedPrompts);
    }

    const handleClick = () => {
        if (search.trim() !== '') {
            aiRun();
        }
    }

    const handleSuggestedPromptClick = (prompt: string) => {
        setSearch(prompt);
        aiRun();
        addToHistory(prompt, []);
    }

    const handlePromptMouseEnter = (prompt: string) => {
        setHighlightedPrompt(prompt);
    }

    const handlePromptMouseLeave = () => {
        setHighlightedPrompt(null);
    }

    return (
        <div style={{ zIndex: 20 }}>
            {viewChat ? (
                <div className="flex flex-col gap-4 bg-white text-primary-300 rounded-xl p-4 shadow-lg" style={{ width: "50em" }}>
                    <div className='flex justify-between mx-4'>
                        <Image src='/logo sm.png' alt='logo' width={24} height={18} />
                        <h1 className="font-semibold text-xl text-center">Ask Devin, our AI ChatBot</h1>
                        <button onClick={() => { setViewChat(false) }}><FontAwesomeIcon icon={faXmark} size='lg' /></button>
                    </div>
                    <div className='flex gap-4'>
                        <div className="text-primary-300">
                            {loading && aiResponse.length === 0 ?
                                <p className="loading-text">Thinking...</p>
                                :
                                <div className="border-2 border-dark-800 rounded-xl h-[20em] overflow-y-scroll scrollbar-hidden mb-4 p-4">
                                    {aiResponse.map((line, index) => (
                                        <p key={index} className="h-auto max-h-full">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            }
                            <div className="flex gap-4 justify-center">
                                <input
                                    style={{ width: "20em" }}
                                    className="text-xl px-4 py-2 rounded-xl border border-primary-200 outline-none"
                                    placeholder='Ask something...'
                                    onChange={(e) => handleChangeSearch(e)}
                                />
                                <button
                                    className="bg-primary-200 border border-dark-100 px-6 text-primary-300 rounded-lg hover:bg-white"
                                    onClick={() => handleClick()}
                                >
                                    {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faPaperPlane} />}
                                </button>
                            </div>
                            {suggestedPrompts.length > 0 && (
                                <div className="suggested-prompts">
                                    <p className="font-semibold">Suggested Prompts:</p>
                                    <ul>
                                        {suggestedPrompts.map((prompt, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSuggestedPromptClick(prompt)}
                                                onMouseEnter={() => handlePromptMouseEnter(prompt)}
                                                onMouseLeave={handlePromptMouseLeave}
                                                style={{ cursor: 'pointer', backgroundColor: highlightedPrompt === prompt ? '#f0f0f0' : 'transparent' }}
                                            >
                                                {prompt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold pb-4 text-lg">Recent Conversations</h2>
                            <div className="h-[22em] overflow-y-scroll scrollbar-hidden" style={{ width: "17em" }}>
                                {history.map((item, index) => (
                                    <div key={index} className="border-2 border-dark-800 px-4 rounded-lg mb-2" style={{ width: "15em" }}>
                                        <p className="prompt-text"><strong>User:</strong> {item.prompt}</p>
                                        <p className="overflow-hidden" style={{ height: "4.5em" }}><strong>AI:</strong> {item.response.join(' ')}</p>
                                        <p>...</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                    <div>
                        <button onClick={() => { setViewChat(true) }} className='bg-primary-100 font-bold text-xl p-4 rounded-xl shadow-lg'>AI Chat<FontAwesomeIcon icon={faMessage} className='ml-4' /></button>
                    </div>
                )}
        </div>
    );
            }