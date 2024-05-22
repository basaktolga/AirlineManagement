import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SeatMap from './SeatMap';
import './viewFlight.css';

const ViewFlight = () => {
    const location = useLocation();
    const { flightDetails } = location.state || {}; // Add a fallback for location.state
    const [flight, setFlight] = useState(flightDetails || {}); // Initialize with flightDetails if available
    const [currentView, setCurrentView] = useState('plane'); // Default view is 'plane'

    console.log('Flight details:', flightDetails);

    useEffect(() => {
        if (flightDetails) {
            console.log('Setting flight:', flightDetails);
            setFlight(flightDetails);
        }
    }, [flightDetails]);

    return (
        <div className="view-flight-page">
            <nav className='viewflight-navbar'>
                <Link to="/dashboard">
                    <img src="./logowhite.png" alt="Logo" className="logo" />
                </Link>
                <Link to="/dashboard" className='nav-item'>Home</Link>
                <span className='nav-item'>Flight Details</span>
            </nav>
            {flight && flight.flight_num && (
                <div className='flight-details'>
                    <h1>Flight Details</h1>
                    <p><strong>Flight Number:</strong> {flight.flight_num}</p>
                    <p><strong>Date:</strong> {flight.date}</p>
                    <p><strong>Time: </strong>{flight.time}</p>
                    <p><strong>Origin Airport:</strong> {flight.origin_airport_name}</p>
                    <p><strong>Origin Airport Code:</strong> {flight.origin_airport_code}</p>
                    <p><strong>Destination Airport:</strong> {flight.destination_airport_name}</p>
                    <p><strong>Destination Airport Code:</strong> {flight.destination_airport_code}</p>
                    <p><strong>Distance:</strong> {flight.distance} KM</p>
                    <p><strong>Vehicle:</strong> {flight.vehicle_type}</p>
                </div>
            )}
            <div className='view-flight-container'>
                <div className="view-buttons">
                    <button onClick={() => setCurrentView('plane')}>Plane Map View</button>
                    <button onClick={() => setCurrentView('tabular')}>Tabular View</button>
                    <button onClick={() => setCurrentView('extended')}>Extended View</button>
                </div>

                {flight && currentView === 'plane' && (
                    <>
                        <SeatMap flight={flight} />
                    </>
                )}

                {flight && currentView === 'tabular' && (
                    <>
                        {/* Tabular View Component */}
                        <div>Tabular View</div>
                    </>
                )}

                {flight && currentView === 'extended' && (
                    <>
                        {/* Extended View Component */}
                        <div>Extended View</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewFlight;
