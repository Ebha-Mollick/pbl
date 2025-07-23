import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const SearchForm = ({ locations, setDirections }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleRoute = () => {
    const fromLoc = locations.find(loc => loc.name === from);
    const toLoc = locations.find(loc => loc.name === to);

    if (!fromLoc || !toLoc) {
      alert('Please select valid locations');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
      origin: fromLoc,
      destination: toLoc,
      travelMode: window.google.maps.TravelMode.WALKING
    }, (result, status) => {
      if (status === 'OK') setDirections(result);
      else alert('Route not found: ' + status);
    });
  };

  return (
    <div>
      <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" />
      <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" />
      <button onClick={handleRoute}>Get Directions</button>
    </div>
  );
};

export default SearchForm;