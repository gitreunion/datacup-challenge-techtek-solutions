import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InfoTab from './InfoTab';
import Header from "./Header";
import RightSide from "./RightSide";
import axios from 'axios';
import gpsdata from '../data.js';

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

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {
            const map = L.map('map', {
                center: [-21.105158264291664, 55.52111226755224],
                zoom: 10,
                zoomControl: false
            });
            setMap(map);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);

            async function fetchAllContracts() {
                try {
                    const response = await axios.get(
                        'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
                        {
                            params: {
                                select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur, donnees',
                                where: 'code_departement=974',
                                limit: 100,
                                order_by: 'datelimitereponse DESC',
                                offset: 100
                            },
                        }
                    );
                    setContracts(response.data.results);

                    const processedPostalCodes = new Set();
                    response.data.results.forEach((result) => {
                        if (typeof result.donnees === 'string') {
                            result.donnees = JSON.parse(result.donnees);
                        }
                        var cp = getKeyValue(result.donnees, ["cp", "Code postal", "code postal", "Code Postal", "Code Postal de l'acheteur", "Code postal de l'acheteur", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)"]);
                        if (cp === null || cp === undefined || cp === "") {
                            cp = "97400";
                            result.donnees.cp = cp;
                        }

                        if (!processedPostalCodes.has(cp)) {
                            processedPostalCodes.add(cp);
                            const coordinates = gpsdata[cp] || gpsdata["97400"];
                            if (!coordinates) {
                                console.error(`No coordinates found for postal code: ${cp}`);
                                return;
                            }
                            var longitude = coordinates.Longitude;
                            var latitude = coordinates.Latitude;
                            var marker = L.marker([latitude, longitude]).addTo(map)
                                .setIcon(L.icon({
                                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                                    iconSize: [30, 30],
                                    iconAnchor: [15, 30],
                                }));
                            marker.on('click', () => {
                                setCurrentPostalCode(cp);
                                setShowInfoTab(true);
                                setShowAllContracts(false);
                            });
                        }
                    });
                } catch (error) {
                    console.error('Error fetching contracts:', error);
                }
            }
            fetchAllContracts();
        }
    }, [map]);

    const contractsCount = contracts.length;

    const filteredContracts = contracts.filter(contract => {
        const donnees = typeof contract.donnees === 'string' ? JSON.parse(contract.donnees) : contract.donnees;
        const cp = getKeyValue(donnees, ["cp", "Code postal", "code postal", "Code Postal", "Code Postal de l'acheteur", "Code postal de l'acheteur", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)"]);
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
            >
                {contractsCount} contrats trouvés
            </button>
            {showInfoTab && <InfoTab contracts={showAllContracts ? contracts : filteredContracts} onClose={() => setShowInfoTab(false)} />}
        </div>
    );
};