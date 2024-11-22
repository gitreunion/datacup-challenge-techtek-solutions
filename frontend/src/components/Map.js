import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InfoTab from './InfoTab';
import Header from "./Header";
import RightSide from "./RightSide";

export default function Map() {
    const [showInfoTab, setShowInfoTab] = useState(false);

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
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();

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
            <Header className={showInfoTab ? 'ml-1/4' : ''} />
            <div id="map" style={{ height: '100vh', zIndex: 1 }} />
            {showInfoTab && <InfoTab />}
            <RightSide />
        </div>
    );
};