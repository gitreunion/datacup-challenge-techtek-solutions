import React from "react";

export default function InfoTab({ contracts, onClose, isLoading }) {
    return (
        <div className="fixed left-0 top-0 h-full w-1/4 p-4 bg-white z-50 shadow-lg overflow-hidden ">
            <div className="flex flex-col h-full gap-4  ">
                <button 
                    className="self-end bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full h-8"
                    onClick={onClose}
                >
                    Close
                </button>
                <div className="overflow-y-auto flex flex-col max-h-full gap-2">
                    {contracts.map(contract => (
                        contract.id ? (
                            <div key={contract.id} className="flex flex-col p-6 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition-shadow relative">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{contract.objet}</h3>
                            <div className="text-sm text-gray-600">
                              <p className="mb-1"><strong>Date de parution:</strong> {contract.dateparution}</p>
                              <p className="mb-1"><strong>Date de fin de diffusion:</strong> {contract.datefindiffusion}</p>
                              <p className="mb-1"><strong>Date limite de réponse:</strong> {contract.datelimitereponse}</p>
                              <p className="mb-4"><strong>Nom de l'acheteur:</strong> {contract.nomacheteur}</p>
                              <a
                                href={`https://www.boamp.fr/avis/detail/${contract.idweb}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                              >
                                Détails
                              </a>
                            </div>
                          </div>
                          
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
}
