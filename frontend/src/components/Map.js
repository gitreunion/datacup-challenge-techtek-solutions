import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import axios from 'axios';
import gpsdata from '../data.js';
import InfoTab from './InfoTab';
import Header from "./Header";
import RightSide from "./RightSide";

function getKeyValue(obj, keys) {
    if (!Array.isArray(keys)) {
        keys = [keys];
    }

    for (let key of keys) {
        if (obj === null || obj === undefined) {
            return null;
        }

        if (key in obj) {
            return obj[key];
        }

        for (let prop in obj) {
            if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                const result = getKeyValue(obj[prop], key);
                if (result !== null) {
                    return result;
                }
            }
        }
    }

    return null;
}

export default function Map() {
    const [showInfoTab, setShowInfoTab] = useState(false);
    const [showAllContracts, setShowAllContracts] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [map, setMap] = useState(null);
    const [currentPostalCode, setCurrentPostalCode] = useState("97400");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {
            const mapInstance = L.map('map', {
                center: [-21.105158264291664, 55.52111226755224],
                zoom: 10,
                zoomControl: false,
            });
            setMap(mapInstance);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance);

            L.control.zoom({
                position: 'bottomright',
            }).addTo(mapInstance);

            fetchAllContracts(mapInstance);
        }
    }, [map]);

    async function fetchAllContracts(mapInstance) {
        const limit = 100;
        let offset = 0;
        const allContracts = [];
        const processedPostalCodes = new Set();

        setIsLoading(true);

        const markerClusterGroup = L.markerClusterGroup();
        mapInstance.addLayer(markerClusterGroup);

        try {
            while (offset < 1000) {
                const response = await axios.get(
                    'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
                    {
                        params: {
                            select: 'id, idweb, filename, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur, donnees',
                            where: 'code_departement=974',
                            limit,
                            order_by: 'datelimitereponse DESC',
                            offset,
                        },
                    }
                );

                const results = response.data.results || [];
                if (results.length === 0) {
                    break;
                }

                results.forEach((result) => {
                    var date_now = new Date();
                    var date_limit = new Date(result.datelimitereponse);
                    if (date_now > date_limit) {
                        results.pop(result);
                    } else {
                        allContracts.push(result);
                    }
                });

                // Process the current batch of contracts
                results.forEach((result) => {
                    let { donnees } = result;
                    if (typeof donnees === 'string') {
                        donnees = JSON.parse(donnees);
                    }

                    const cp = getKeyValue(donnees, ["cp", "Code postal", "code postal"]) || "97400";
                    if (!processedPostalCodes.has(cp)) {
                        processedPostalCodes.add(cp);

                        const coordinates = gpsdata[cp] || gpsdata["97400"];
                        if (!coordinates) {
                            console.warn(`No coordinates found for postal code: ${cp}`);
                            return;
                        }

                        const { Longitude, Latitude } = coordinates;

                        const marker = L.marker([Latitude, Longitude], {
                            icon: L.icon({
                                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                                iconSize: [30, 30],
                                iconAnchor: [15, 30],
                            }),
                        });

                        marker.on('click', () => {
                            setCurrentPostalCode(cp);
                            setShowInfoTab(true);
                            setShowAllContracts(false);
                            mapInstance.setView([Latitude, Longitude], 15);
                        });

                        markerClusterGroup.addLayer(marker, { chunkedLoading: true, chunkProgress: true });
                    }
                });

                offset += limit;
            }

            mapInstance.addLayer(markerClusterGroup);
            setContracts(allContracts);
        } catch (error) {
            console.error('Error fetching contracts:', error.message);
            alert('Failed to fetch contracts. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }
    const filteredContracts = contracts.filter((contract) => {
        const donnees = typeof contract.donnees === 'string' ? JSON.parse(contract.donnees) : contract.donnees;
        const cp = getKeyValue(donnees, ["cp", "Code postal", "code postal"]);
        return cp === currentPostalCode;
    });

    return (
        <div className="relative overflow-x-hidden">
            <Header className={showInfoTab ? 'translate-x-1/4' : ''} />
            <div id="map" style={{ height: '100vh', zIndex: 1 }} />
            <RightSide />

            <button
                className="absolute bottom-0 p-4 mb-6 bg-white z-50 shadow-lg rounded-full"
                onClick={() => {
                    setShowInfoTab(true);
                    setShowAllContracts(true);
                }}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : `${contracts.length} contrats trouvés`}
            </button>

            {showInfoTab && (
                <InfoTab
                    contracts={showAllContracts ? contracts : filteredContracts}
                    onClose={() => setShowInfoTab(false)}
                />
            )}
        </div>
    );
}