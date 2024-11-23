import React from "react";

export default function InfoTab({ contracts, onClose }) {
    return (
        <div className="fixed left-0 top-0 h-full w-1/4 p-4 bg-white z-50 shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
                <button 
                    className="self-end bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full h-8"
                    onClick={onClose}
                >
                    Close
                </button>
                <div className="overflow-y-auto flex-1 max-h-full">
                    {contracts.map(contract => (
                        contract.id ? (
                            <div key={contract.id} className="p-2 border-b border-gray-200">
                                <h3 className="font-bold">{contract.objet}</h3>
                                <p>Date de parution: {new Date(contract.dateparution).toLocaleDateString()}</p>
                                <p>Date de fin de diffusion: {new Date(contract.datefindiffusion).toLocaleDateString()}</p>
                                <p>Date limite de réponse: {new Date(contract.datelimitereponse).toLocaleDateString()}</p>
                                <p>Nom de l'acheteur: {contract.nomacheteur}</p>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}