import React, { useState } from 'react'

export default function RightSide() {
    // Déclaration des états pour gérer l'affichage des différents éléments du côté droit de l'écran
    const [showInfoTab, setShowInfoTab] = useState(false) // Affiche ou masque la boîte d'informations
    const [showDateInput, setShowDateInput] = useState(false) // Affiche ou masque le champ de date
    const [showSliderInput, setShowSliderInput] = useState(false) // Affiche ou masque le curseur de prix
    const [price, setPrice] = useState(40000) // Valeur du prix (défini à 40000€ par défaut)
    const [selectedDate, setSelectedDate] = useState('') // Valeur de la date sélectionnée

    return (
        <div>
            {/* Bouton pour afficher/masquer la boîte d'informations */}
            <button
                onClick={() => setShowInfoTab(!showInfoTab)} // Change l'état de `showInfoTab` lorsqu'il est cliqué
                className="p-3 bg-blue-600 text-white rounded-full fixed right-4 top-1/2 transform -translate-y-1/2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ zIndex: 1000 }} // Assure que le bouton est au-dessus des autres éléments
            >
                {/* Icône de flèche pour indiquer l'action d'ouverture/fermeture de la boîte */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7" // Forme de la flèche
                    />
                </svg>
            </button>

            {/* Boîte d'informations, visible si `showInfoTab` est true */}
            {showInfoTab && (
                <div className="absolute right-20 top-1/2 transform -translate-y-1/2 h-auto w-80 p-6 bg-white z-50 shadow-lg rounded-2xl flex flex-col items-start space-y-4">
                    {/* Section pour la date */}
                    <label className="flex items-center space-x-2">
                        {/* Case à cocher pour activer/désactiver l'input de date */}
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={showDateInput} // L'état `showDateInput` détermine si la case est cochée
                            onChange={(e) => setShowDateInput(e.target.checked)} // Change l'état lors de la modification
                        />
                        <span className="text-gray-700">Date</span>
                    </label>

                    {/* Champ de date, visible si `showDateInput` est true */}
                    {showDateInput && (
                        <input
                            type="date"
                            className="w-full p-2 border rounded-md"
                            value={selectedDate} // Valeur du champ date
                            onChange={(e) => setSelectedDate(e.target.value)} // Met à jour la date sélectionnée
                        />
                    )}

                    {/* Section pour le prix */}
                    <label className="flex items-center space-x-2">
                        {/* Case à cocher pour activer/désactiver l'input du slider de prix */}
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={showSliderInput} // L'état `showSliderInput` détermine si la case est cochée
                            onChange={(e) =>
                                setShowSliderInput(e.target.checked)
                            } // Change l'état lors de la modification
                        />
                        <span className="text-gray-700">Prix</span>
                    </label>

                    {/* Curseur pour le prix, visible si `showSliderInput` est true */}
                    {showSliderInput && (
                        <div className="w-full">
                            <input
                                type="range"
                                min="40000" // Valeur minimale du curseur
                                max="240000" // Valeur maximale du curseur
                                value={price} // Valeur actuelle du prix
                                onChange={(e) => setPrice(e.target.value)} // Met à jour la valeur du prix lors du changement du curseur
                                className="w-full"
                            />
                            {/* Affichage du prix sélectionné */}
                            <span className="block text-gray-700 text-center mt-2">
                                {price} €
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
