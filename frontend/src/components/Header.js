import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import WidgetsItems from './WidgetsItems'

export default function Header({
    className,
    search,
    setSearch,
    onCategoryChange,
}) {
    return (
        <header
            className={`absolute w-full p-4 flex items-center transition-all ${className}`}
            style={{ zIndex: 1000 }}
        >
            {/* Conteneur pour la barre de recherche */}
            <div className="flex items-center space-x-4">
                {/* Champ de saisie de la recherche */}
                <div className="relative">
                    <input
                        className="ml-2 border rounded-full p-4 h-12 w-60 border-gray-200 focus:outline-none"
                        type="text"
                        value={search}  // Valeur de recherche contrôlée par l'état `search`
                        onChange={(e) => setSearch(e.target.value)} // Met à jour `search` lorsque l'utilisateur tape
                        placeholder="Rechercher un contrat..."
                    />
                    {/* Icône de recherche */}
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                    {/* Icône de suppression (pour effacer la recherche) */}
                    {search && (
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setSearch('')} // Vide la valeur de recherche au clic
                        />
                    )}
                </div>
            </div>

            {/* Conteneur pour les éléments de catégorie */}
            <div className="relative ml-6 flex gap-6">
                {/* Composants de catégorie avec changement de catégorie */}
                <WidgetsItems
                    name="Fournitures"
                    category="FOURNITURES"
                    onCategoryChange={onCategoryChange}
                />
                <WidgetsItems
                    name="Services"
                    category="SERVICES"
                    onCategoryChange={onCategoryChange}
                />
                <WidgetsItems
                    name="Travaux"
                    category="TRAVAUX"
                    onCategoryChange={onCategoryChange}
                />
            </div>
        </header>
    )
}
