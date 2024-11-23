import React from "react";

export default function InfoTab({ contracts, onClose }) {
    return (
        <div className="absolute left-0 top-0 h-full w-1/4 p-4 bg-white z-50 shadow-lg">
            <div className="flex flex-col items-start space-y-4">
                <button 
                    className="self-end bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full h-8"
                    onClick={onClose}
                >
                    Close
                </button>
                <div className="overflow-y-auto max-h-[100vh]">
                    {contracts.map(contract => (
                        contract.id ? (
                            <div key={contract.id} className="p-2 border-b border-gray-200">
                                <h3 className="font-bold">{contract.objet}</h3>
                                <p>Date de parution: {contract.dateparution}</p>
                                <p>Date de fin de diffusion: {contract.datefindiffusion}</p>
                                <p>Date limite de réponse: {contract.datelimitereponse}</p>
                                <p>Nom de l'acheteur: {contract.nomacheteur}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}
