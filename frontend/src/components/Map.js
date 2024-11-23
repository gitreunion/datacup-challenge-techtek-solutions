import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import axios from 'axios'
import gpsdata from '../data.js'
import InfoTab from './InfoTab'
import Header from './Header'
import RightSide from './RightSide'
import ChatBot from './ChatBot.js'
import Agrandir from './agrandir.png'

function getKeyValue(obj, keys) {
    if (!Array.isArray(keys)) {
        keys = [keys]
    }

    for (let key of keys) {
        if (obj === null || obj === undefined) {
            return null
        }

        if (key in obj) {
            return obj[key]
        }

        for (let prop in obj) {
            if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                const result = getKeyValue(obj[prop], key)
                if (result !== null) {
                    return result
                }
            }
        }
    }
    return null
}

export default function Map() {
    const [showInfoTab, setShowInfoTab] = useState(false)
    const [showAllContracts, setShowAllContracts] = useState(false)
    const [contracts, setContracts] = useState([])
    const [map, setMap] = useState(null)
    const [currentPostalCode, setCurrentPostalCode] = useState('97400')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedContract, setSelectedContract] = useState(null)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {
            // Initialize the Leaflet map
            const mapInstance = L.map('map', {
                center: [-21.105158264291664, 55.52111226755224], // Center coordinates of the map
                zoom: 10, // Initial zoom level
                zoomControl: false, // Disable zoom controls
            })
            setMap(mapInstance)

            // Add a tile layer to the map (Esri satellite imagery)
            L.tileLayer(
                'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                {
                    attribution:
                        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                }
            ).addTo(mapInstance)

            // Add zoom control to the map
            L.control
                .zoom({
                    position: 'bottomright',
                })
                .addTo(mapInstance)
        }
    }, [])

    const handleRecenter = () => {
        if (map) {
            // Recenter the map to the initial coordinates
            map.setView([-21.105158264291664, 55.52111226755224], 10)
            setShowInfoTab(false)
        }
    }

    useEffect(() => {
        if (map) {
            // Fetch all contracts whenever the map, search, or category changes
            fetchAllContracts(map, category, search)
        }
    }, [map, search, category])

    async function fetchAllContracts(map, category, search) {
        const limit = 100
        let offset = 0
        const allContracts = []
        const processedPostalCodes = new Set()

        setIsLoading(true)

        // Remove existing marker clusters from the map
        if (map.markerClusterGroup) {
            map.removeLayer(map.markerClusterGroup)
        }

        // Create a new marker cluster group
        const markerClusterGroup = L.markerClusterGroup()
        map.addLayer(markerClusterGroup)
        map.markerClusterGroup = markerClusterGroup

        try {
            // Loop to fetch contracts from the API
            while (offset < 1000) {
                const whereClause = `code_departement=974${
                    category ? ` and type_marche="${category}"` : ''
                }`
                const response = await axios.get(
                    'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
                    {
                        params: {
                            select: 'id, idweb, filename, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur, donnees',
                            where: whereClause,
                            limit,
                            order_by: 'datelimitereponse DESC',
                            offset,
                        },
                    }
                )

                const results = response.data.results || []
                if (results.length === 0) {
                    break
                }

                // Filter out contracts that have a past response deadline
                results.forEach((result) => {
                    var date_now = new Date()
                    var date_limit = new Date(result.datelimitereponse)
                    if (date_now > date_limit) {
                        results.pop(result)
                    } else {
                        allContracts.push(result)
                    }
                })

                // Add markers for contracts
                results.forEach((result) => {
                    let { donnees } = result
                    if (typeof donnees === 'string') {
                        donnees = JSON.parse(donnees)
                    }

                    const cp =
                        getKeyValue(donnees, [
                            'cp',
                            'Code postal',
                            'code postal',
                        ]) || '97400'
                    if (!processedPostalCodes.has(cp)) {
                        processedPostalCodes.add(cp)

                        const coordinates = gpsdata[cp] || gpsdata['97400']
                        if (!coordinates) {
                            console.warn(
                                `No coordinates found for postal code: ${cp}`
                            )
                            return
                        }

                        const { Longitude, Latitude } = coordinates
                        if (
                            result.objet
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        ) {
                            const marker = L.marker([Latitude, Longitude], {
                                icon: L.icon({
                                    iconUrl:
                                        'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30],
                                }),
                            })

                            marker.on('click', () => {
                                setCurrentPostalCode(cp)
                                setShowInfoTab(true)
                                setShowAllContracts(false)
                                map.setView([Latitude, Longitude], 15)
                            })

                            markerClusterGroup.addLayer(marker)
                        }
                    }
                })

                offset += limit
            }

            const filteredContracts = allContracts.filter((contract) => {
                return contract.objet
                    .toLowerCase()
                    .includes(search.toLowerCase())
            })

            setContracts(filteredContracts)
        } catch (error) {
            console.error('Error fetching contracts:', error.message)
            alert('Failed to fetch contracts. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    // Filter the contracts by the selected postal code
    const filteredContracts = contracts.filter((contract) => {
        const donnees =
            typeof contract.donnees === 'string'
                ? JSON.parse(contract.donnees)
                : contract.donnees
        const cp = getKeyValue(donnees, ['cp', 'Code postal', 'code postal'])
        return cp === currentPostalCode
    })

    return (
        <div className="relative overflow-x-hidden">
            <Header
                className={showInfoTab ? 'translate-x-1/4' : ''}
                search={search}
                setSearch={setSearch}
                onCategoryChange={setCategory}
            />
            <div id="map" style={{ height: '100vh', zIndex: 1 }} />
            <RightSide />

            {/* Button to show all contracts */}
            <button
                className="absolute bottom-0 p-4 mb-6 bg-white z-50 shadow-lg rounded-full"
                onClick={() => {
                    setShowInfoTab(true)
                    setShowAllContracts(true)
                }}
                disabled={isLoading}
            >
                {isLoading
                    ? 'Chargement...'
                    : `${contracts.length} contrats trouvés`}
            </button>

            {/* Button to recenter the map */}
            <button
                className="absolute bottom-24 right-3 bg-white text-black z-50 rounded-sm border-1 border-black"
                onClick={handleRecenter}
            >
                <img src={Agrandir} alt="Recenter" width="30" height="30" />
            </button>

            {/* Chatbot */}
            <ChatBot className={showInfoTab ? 'translate-x-60' : ''} />

            {/* Info tab */}
            {showInfoTab && (
                <InfoTab
                    contracts={showAllContracts ? contracts : filteredContracts}
                    onClose={() => setShowInfoTab(false)}
                    onSelectContract={setSelectedContract}
                    selectedContract={selectedContract}
                />
            )}
        </div>
    )
}
