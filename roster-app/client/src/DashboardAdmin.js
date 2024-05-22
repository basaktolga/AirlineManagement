import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';
import axios from 'axios';

const DashboardAdmin = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [departureAirport, setDepartureAirport] = useState('');
    const [destinationAirport, setDestinationAirport] = useState('');
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestination] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchMode, setSearchMode] = useState('flightNumber'); // 'flightNumber' or 'filter'
    const navigate = useNavigate();

    const handleSearch = async (event) => {
        event.preventDefault();
        const date = (year && month && day) ? `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}` : '';
        const flight_num = flightNumber.toUpperCase();
        const dep_airport_code = departureAirport.toUpperCase();
        const dest_airport_code = destinationAirport.toUpperCase();

        try {
            const response = await axios.get('http://localhost:5001/flight-info/find_flight_information', {
                params: {
                    flight_num: flight_num,
                    date: date,
                    origin_city: departureCity,
                    origin_airport_code: dep_airport_code,
                    destination_airport_code: dest_airport_code,
                    destination_city: destinationCity
                }
            });
            setSearchResults(response.data);
            setFlightNumber('');
            setDay('');
            setMonth('');
            setYear('');
            setDepartureAirport('');
            setDestinationAirport('');
            setDepartureCity('');
            setDestination('');
        } catch (error) {
            console.error('Error fetching flight data:', error);
            // Optionally handle the error, e.g., show an error message in your UI
        }
    };

    const handleGenerateRoster = (flight) => {
        navigate('/viewFlight', {
            state: {
                flightDetails: flight
            }
        });
    };

    const handleViewRoster = (flight) => {
        navigate('/viewFlight', {
            state: {
                flightDetails: flight
            }
        });
    };

    return (
        <div className='dashboard-page'>
            <nav className='dashboard-navbar'>
                <Link to="/dashboard">
                    <img src="./logowhite.png" alt="Logo" className="logo" />
                </Link>
                <Link to="/dashboard" className='nav-item'>Home</Link>
                <span className='nav-item'>Flight Details</span>
            </nav>
            <div className='dashboard-header'>
                <h1>Admin Dashboard</h1>
                <p>Welcome Admin! Select a flight below.</p>
            </div>
            <div className="search-toggle">
                <button type="button" onClick={() => setSearchMode('flightNumber')} className={searchMode === 'flightNumber' ? 'active' : ''}>
                    Search by Flight Number
                </button>
                <button type="button" onClick={() => setSearchMode('filter')} className={searchMode === 'filter' ? 'active' : ''}>
                    Search by Filter
                </button>
            </div>
            <div className='dashboard-menu'>
                <form classname='searchform' onSubmit={handleSearch}>
                    <div className='input_container'>
                        {searchMode === 'flightNumber' && (
                            <div className='dashboard-menu-item'>
                                <label htmlFor="flightNumber">Flight Number</label>
                                <input
                                    type="text"
                                    id="flightNumber"
                                    name="flightNumber"
                                    placeholder="Enter flight number"
                                    value={flightNumber}
                                    onChange={(e) => setFlightNumber(e.target.value)}
                                />
                            </div>
                        )}
                        {searchMode === 'filter' && (
                            <div className='dashboard-menu-item'>
                                <div className='filter'>
                                    <label htmlFor="date">Date</label>
                                    <div id='Date_Container'>
                                        <input
                                            type="text"
                                            placeholder="Day"
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Month"
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Year"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='filter'>
                                    <label htmlFor="departureCity">Departure City</label>
                                    <input
                                        type="text"
                                        id="departureCity"
                                        name="departureCity"
                                        placeholder="Enter departure city"
                                        value={departureCity}
                                        onChange={(e) => setDepartureCity(e.target.value)}
                                    />
                                </div>
                                <div className='filter'>
                                    <label htmlFor="departureAirport">Departure Airport Code</label>
                                    <input
                                        type="text"
                                        id="departureAirport"
                                        name="departureAirport"
                                        placeholder="Enter departure airport"
                                        value={departureAirport}
                                        onChange={(e) => setDepartureAirport(e.target.value)}
                                    />
                                </div>
                                <div className='filter'>
                                    <label htmlFor="destinationCity">Destination City</label>
                                    <input
                                        type="text"
                                        id="destinationCity"
                                        name="destinationCity"
                                        placeholder="Enter destination city"
                                        value={destinationCity}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                                <div className='filter'>
                                    <label htmlFor="destinationAirport">Destination Airport Code</label>
                                    <input
                                        type="text"
                                        id="destinationAirport"
                                        name="destinationAirport"
                                        placeholder="Enter destination airport"
                                        value={destinationAirport}
                                        onChange={(e) => setDestinationAirport(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit">Search Flights</button>
                </form>
            </div>
            <div className='results-section'>
                {searchResults.length > 0 && (
                    <div>
                        <h2>Results</h2>
                        <ul>
                            {searchResults.map((flight, index) => (
                                <li key={index} className='result-item'>
                                    <div>
                                        <p><strong>Flight Number:</strong> {flight.flight_num}</p>
                                        <p><strong>Date:</strong> {flight.date}</p>
                                        <p><strong>Origin Airport:</strong> {flight.origin_airport_code}</p>
                                        <p><strong>Destination Airport:</strong> {flight.destination_airport_code}</p>
                                    </div>
                                    <div className='result-buttons'>
                                        <button onClick={() => handleGenerateRoster(flight)}>Generate Roster</button>
                                        <button onClick={() => handleViewRoster(flight)}>View Roster</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardAdmin;

