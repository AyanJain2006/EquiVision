import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

const ChatUI = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const quickSuggestions = [
        "Best stocks to buy",
        "Gold investment",
        "Analyze my portfolio"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { sender: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            const res = await sendChatMessage(userId, text);
            const aiData = res.data;
            const aiMsg = { sender: 'ai', data: aiData };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error("Chat API Error", err);
            setMessages(prev => [...prev, { sender: 'ai', error: 'Sorry, I could not process your request at this time.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-['Manrope']">
            {isOpen && (
                <div className="bg-white w-80 sm:w-[400px] h-[550px] shadow-2xl rounded-2xl mb-4 flex flex-col border border-gray-200 overflow-hidden transform transition-all">
                    {/* Header */}
                    <div className="bg-primary text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-white text-2xl">smart_toy</span>
                            <span className="font-bold text-lg">FinAI Advisor</span>
                        </div>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 my-auto">
                                <p className="mb-4">Hello! I'm your personal financial advisor.</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {quickSuggestions.map((suggestion, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleSend(suggestion)}
                                            className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-1 shrink-0">
                                        <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                    </div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl p-3 ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-white shadow-sm border border-gray-100 rounded-bl-sm text-gray-800'}`}>
                                    {msg.sender === 'user' ? (
                                        <p className="text-sm">{msg.text}</p>
                                    ) : msg.error ? (
                                        <p className="text-sm text-red-500">{msg.error}</p>
                                    ) : (
                                        <div className="space-y-3">
                                            <p className="text-sm">{msg.data.advice}</p>
                                            
                                            {msg.data.allocation && (
                                                <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-xs">
                                                    <p className="font-bold mb-1 text-gray-600">Suggested Allocation:</p>
                                                    <ul className="list-disc pl-4 space-y-0.5">
                                                        <li>Stocks: {msg.data.allocation.stocks}</li>
                                                        <li>Gold: {msg.data.allocation.gold}</li>
                                                        <li>Bonds: {msg.data.allocation.bonds}</li>
                                                    </ul>
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-600">
                                                <strong>Reasoning:</strong> {msg.data.reasoning}
                                            </div>
                                            
                                            {msg.data.risk_level && (
                                                <div className="inline-block bg-secondary/10 px-2 py-1 rounded text-xs font-bold text-secondary">
                                                    Risk: {msg.data.risk_level}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 shrink-0">
                                    <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                                </div>
                                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm p-4 flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestions if user is typing or if there's history */}
                    {messages.length > 0 && !isTyping && (
                        <div className="px-4 py-2 bg-gray-50 flex overflow-x-auto gap-2 no-scrollbar border-t border-gray-200">
                             {quickSuggestions.map((suggestion, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleSend(suggestion)}
                                    className="whitespace-nowrap bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                                placeholder="Ask about stocks, gold, or portfolio..."
                                className="w-full bg-gray-100 text-sm rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button 
                                onClick={() => handleSend(inputValue)}
                                className="absolute right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button 
                onClick={toggleChat}
                className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all focus:outline-none"
            >
                {isOpen ? (
                    <span className="material-symbols-outlined text-3xl">close</span>
                ) : (
                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                )}
            </button>
        </div>
    );
};

export default ChatUI;
