import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InfoTab from './InfoTab';
import Header from "./Header";
import axios from 'axios';

export default function Map() {
    const [showInfoTab, setShowInfoTab] = useState(false);
    const [contracts, setContracts] = useState([]);

    async function fetchAllContracts() {
        try {
            const response = await axios.get(
                'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
                {
                    params: {
                        select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur',
                        where: 'code_departement=974',
                        limit: 20,
                    },
                }
            );
            console.log('Contracts:', response.data.results);
            setContracts(response.data.results || []);
        } catch (error) {
            console.error('Error fetching contracts:', error);
            setContracts([]);
        }
    }

    useEffect(() => {
        fetchAllContracts();
    }, []);

    useEffect(() => {
        if (!L.DomUtil.get('map')._leaflet_id) {
            const map = L.map('map', {
                center: [-21.105158264291664, 55.52111226755224],
                zoom: 10,
                zoomControl: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const marker = L.marker([-21.01, 55.27]).addTo(map)
                .setIcon(L.icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                }))

            marker.on('click', () => {
                map.setView(marker.getLatLng(), 15);
                setShowInfoTab(true);
            });

            L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
        }
    }, []);

    return (
        <div className="relative">
            <Header className={showInfoTab ? 'translate-x-1/4' : ''} />
            <div id="map" style={{ height: '100vh', zIndex: 1 }} />
            {showInfoTab && <InfoTab contracts={contracts} onClose={() => setShowInfoTab(false)} />}
        </div>
    );
};