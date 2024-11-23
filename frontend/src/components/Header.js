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
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        className="ml-2 border rounded-full p-4 h-12 w-60 border-gray-200 focus:outline-none"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un contrat..."
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                    {search && (
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setSearch('')}
                        />
                    )}
                </div>
            </div>

            <div className="relative ml-6 flex gap-6">
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
