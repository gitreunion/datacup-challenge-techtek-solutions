import React from "react";

export default function InfoTab({ onClose }) {
    return (
        <div className="absolute left-0 top-0 h-full w-1/4 p-4 bg-white z-50 shadow-lg">
            <div className="flex flex-col items-start space-y-4">
                <button 
                    className="self-end bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full h-8"
                    onClick={onClose}
                >
                    Close
                </button>
                <div className="flex items-center space-x-2">
                    <img
                        className="h-12 w-12 rounded-full"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="avatar"
                    />
                    <div>
                        <p className="font-bold">John Doe</p>
                        <p className="text-gray-500">
                            <span className="text-blue-500">En ligne</span>
                        </p>
                    </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full h-12">
                    Contacter
                </button>
            </div>
        </div>
    );
};