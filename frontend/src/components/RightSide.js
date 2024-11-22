import React, { useState } from "react";

export default function RightSide() {
    const [showInfoTab, setShowInfoTab] = useState(false);
    const [showDateInput, setShowDateInput] = useState(false);
    const [showSliderInput, setShowSliderInput] = useState(false);
    const [price, setPrice] = useState(40000);
    const [selectedDate, setSelectedDate] = useState("");

    return (
        <div>
            <button
                onClick={() => setShowInfoTab(!showInfoTab)}
                className="p-3 bg-blue-600 text-white rounded-full fixed right-4 top-1/2 transform -translate-y-1/2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ zIndex: 1000 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            {showInfoTab && (
                <div className="absolute right-20 top-1/2 transform -translate-y-1/2 h-auto w-80 p-6 bg-white z-50 shadow-lg rounded-2xl flex flex-col items-start space-y-4">
                    <label className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            className="form-checkbox h-5 w-5 text-blue-600" 
                            checked={showDateInput}
                            onChange={(e) => setShowDateInput(e.target.checked)} 
                        />
                        <span className="text-gray-700">Date</span>
                    </label>
                    {showDateInput && (
                        <input 
                            type="date" 
                            className="w-full p-2 border rounded-md" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    )}
                    <label className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={showSliderInput}
                            onChange={(e) => setShowSliderInput(e.target.checked)}
                        />
                        <span className="text-gray-700">Prix</span>
                    </label>
                    {showSliderInput && (
                        <div className="w-full">
                            <input
                                type="range"
                                min="40000"
                                max="240000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full"
                            />
                            <span className="block text-gray-700 text-center mt-2">{price} €</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}