import React from "react";

export default function InfoTab({ contracts, onClose, onSelectContract, selectedContract }) {
    return (
        <div className="fixed left-0 top-0 h-full w-1/4 p-4 bg-white z-50 shadow-lg overflow-hidden">
            <div className="flex flex-col h-full">
                <button 
                    className="self-end bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full h-8"
                    onClick={onClose}
                >
                    Close
                </button>
                {selectedContract ? (
                    <div className="p-4 border-t border-gray-200 overflow-y-auto flex-1 max-h-full">
                        <h3 className="font-bold">{selectedContract.objet}</h3>
                        <p>Date de parution: {selectedContract.dateparution}</p>
                        <p>Date de fin de diffusion: {selectedContract.datefindiffusion}</p>
                        <p>Date limite de réponse: {selectedContract.datelimitereponse}</p>
                        <p>Nom de l'acheteur: {selectedContract.nomacheteur}</p>
                        <button 
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full h-8"
                            onClick={() => onSelectContract(null)}
                        >
                            Back to list
                        </button>
                    </div>
                ) : (
                    <div className="overflow-y-auto flex-1 max-h-full">
                        {contracts.map(contract => (
                            contract.id ? (
                                <div 
                                    key={contract.id} 
                                    className="p-2 border-b border-gray-200 cursor-pointer"
                                    onClick={() => onSelectContract(contract)}
                                >
                                    <h3 className="font-bold">{contract.objet}</h3>
                                    <p>Date de parution: {contract.dateparution}</p>
                                    <p>Date de fin de diffusion: {contract.datefindiffusion}</p>
                                    <p>Date limite de réponse: {contract.datelimitereponse}</p>
                                    <p>Nom de l'acheteur: {contract.nomacheteur}</p>
                                </div>
                            ) : null
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}