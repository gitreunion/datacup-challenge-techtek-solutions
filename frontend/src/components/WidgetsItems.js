import React from 'react'

export default function WidgetsItems({ name, category, onCategoryChange }) {
    return (
        <div className="rounded-full h-8">
            {/* Bouton avec un fond bleu et un texte blanc */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full h-full"
                onClick={() => onCategoryChange(category)} // Appelle la fonction `onCategoryChange` avec la valeur `category` comme argument lorsqu'on clique sur le bouton
            >
                {/* Affiche le texte de l'élément */}
                {name}
            </button>
        </div>
    )
}
