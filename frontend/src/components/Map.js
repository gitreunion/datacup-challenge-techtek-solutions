import React, { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import InfoTab from './InfoTab';
import Header from "./Header";
import RightSide from "./RightSide";
import axios from 'axios';
import gpsdata from '../data.js';

function getKeyValue(obj, keys) {
    // If keys is a single key (not an array), convert it into an array
    if (!Array.isArray(keys)) {
        keys = [keys];
    }

    // Loop through each key in the keys array
    for (let key of keys) {
        // If the object is null or undefined, return null
        if (obj === null || obj === undefined) {
            return null;
        }

        // Check if the key exists in the current object
        if (key in obj) {
            return obj[key];
        }

        // Loop through the object's properties
        for (let prop in obj) {
            // If the property is an object, recurse into it
            if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                const result = getKeyValue(obj[prop], key);
                if (result !== null) {
                    return result; // Return the value if found in nested objects
                }
            }
        }
    }

    // If none of the keys are found, return null
    return null;
}

export default function Map() {
    const [showInfoTab, setShowInfoTab] = useState(false);
    const [array, setArray] = useState([]);
    const [map, setMap] = useState(null);

    useEffect(() => {
        async function fetchAllContracts() {
          try {
            const response = await axios.get(
              'https://boamp-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/boamp/records',
              {
                params: {
                  select: 'id, objet, dateparution, datefindiffusion, datelimitereponse, nomacheteur, donnees',
                  where: 'code_departement=974',
                  limit: 20,
                  order_by: 'datelimitereponse DESC',
                  offset: 20
                },
              }
            );
            response.data.results.forEach((result) => {
                result.donnees = JSON.parse(result.donnees);
                var cp = getKeyValue(result.donnees, ["cp", "Code postal", "code postal", "Code Postal", "Code Postal de l'acheteur", "Code postal de l'acheteur", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)", "Code postal de l'acheteur (acheteur) (acheteur)"]) ;
                if (cp === null) {
                    cp = "97400";
                }
                const saintDenisData = gpsdata["97400"];
                var longitude = gpsdata[cp].Longitude;
                var latitude = gpsdata[cp].Latitude;
                var marker = L.marker([latitude, longitude]).addTo(map)
                    .setIcon(L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                    }))
            });
          } catch (error) {
            console.error('Error fetching contracts:', error);
          }
        }
        fetchAllContracts();
    }, []);

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
            <RightSide />
            {showInfoTab && <InfoTab onClose={() => setShowInfoTab(false)} />}
        </div>
    );
};
