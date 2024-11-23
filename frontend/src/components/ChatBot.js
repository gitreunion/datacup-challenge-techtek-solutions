import React, { useState } from 'react';

const ChatBot = ({ className }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'GUIA', text: 'Comment puis-je me rendre utile ?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newMessage = { sender: 'Vous', text: inputValue };
        setMessages([...messages, newMessage]);
        setInputValue('');

        try {
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
                body: JSON.stringify({ message: inputValue, model: 'llama3.1' }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la réponse du serveur');
            }

            const aiResponse = await response.text();
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'AI', text: aiResponse }
            ]);
        } catch (error) {
            console.error('Error calling API:', error);
            const aiErrorResponse = { sender: 'AI', text: 'Désolé, une erreur est survenue. Essayez encore.' };
            setMessages((prevMessages) => [...prevMessages, aiErrorResponse]);
        }
    };

    return (
        <div className={`absolute transition-all ${className}`} style={{ zIndex: 1000, backgroundColor: "red" }}>
            <button
                className={`absolute bottom-2 ml-2 inline-flex transition-all ${className} items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900`}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isChatOpen}
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={{ zIndex: 1000 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-white block border-gray-200 align-middle">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
                </svg>
            </button>

            {isChatOpen && (
                <div style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)', zIndex: 1000 }}
                    className={`absolute bottom-[calc(4rem+1.5rem)] ml-2 transition-all ${className} mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]`}>
                    <div className="flex flex-col space-y-1.5 pb-6">
                        <h2 className="font-semibold text-lg tracking-tight">GUIA</h2>
                        <p className="text-sm text-[#6b7280] leading-3">Powered by TechTek solutions</p>
                    </div>

                    <div className="pr-4 h-[474px] overflow-y-auto" style={{ minWidth: '100%' }}>
                        {messages.map((message, index) => (
                            <div key={index} className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                                    <div className="rounded-full bg-gray-100 border p-1">
                                        <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                            </path>
                                        </svg>
                                    </div>
                                </span>
                                <p className="leading-relaxed"><span className="block font-bold text-gray-700">{message.sender} </span>{message.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center pt-0">
                        <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleSendMessage}>
                            <input
                                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                                placeholder="Entrez votre message"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                                type="submit"
                            >
                                Soumettre
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;