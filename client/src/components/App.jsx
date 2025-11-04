import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import MapComponent from './components/MapComponent';
import SearchForm from './components/SearchForm';
import axios from 'axios';

function App() {
  const [locations, setLocations] = useState([]);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/locations')
      .then(res => setLocations(res.data));
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD4EXAMPLE12345678lghfj-WXYZ" libraries={['places']}>
      <h1>AIT Smart Campus Navigation</h1>
      <SearchForm locations={locations} setDirections={setDirections} />
      <MapComponent locations={locations} directions={directions} />
    </LoadScript>
  );
}

export default App;