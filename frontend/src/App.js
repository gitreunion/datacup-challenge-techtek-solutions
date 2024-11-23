import './App.css'  // Importe le fichier CSS pour la mise en forme de l'application
import React from 'react'  // Importe React, qui est nécessaire pour la création de composants

import Map from './components/Map'  // Importe le composant Map, qui sera utilisé dans l'application

// Composant principal de l'application
function App() {
    return (
        // Structure principale de l'application
        <div className="App">
            {/* Affichage du composant Map */}
            <Map />
        </div>
    )
}

// Exporte le composant App pour qu'il puisse être utilisé ailleurs (par exemple, dans index.js)
export default App
