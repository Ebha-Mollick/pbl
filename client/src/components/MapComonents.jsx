import { GoogleMap, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';
import React, { useState } from 'react';

const MapComponent = ({ locations, directions }) => {
  const center = { lat: 18.6070, lng: 73.8750 };

  return (
    <GoogleMap
      center={center}
      zoom={18}
      mapContainerStyle={{ height: '500px', width: '100%' }}
    >
      {locations.map((loc, index) => (
        <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} title={loc.name} />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapComponent;