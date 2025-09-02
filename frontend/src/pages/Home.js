import React, { useEffect, useState, useMemo, useRef } from 'react';
import Main from './Main';
import Footer from './Footer';
import UNavbar from './UNavbar';

import img1 from '../images/inventory_rubber_mats.jpeg';
import img2 from '../images/gym_rubber_flooring.jpeg';
import img3 from '../images/rubber_runner_mats.jpeg';
import img4 from '../images/rubber_playground_mats.jpeg';
import img5 from '../images/commercial_flooring.jpeg';
import img6 from '../images/rubber_carpet_tile.jpeg';
import myImage from '../images/myImage.png';
import locationMap from '../images/location-map.png';

import {
  Box, Grid, CardMedia, List, ListItem, ListItemIcon, ListItemText, Typography,
  FormControl, InputLabel, Select, MenuItem, TextField, Button
} from '@mui/material';
import { LocationOn, Mail, Phone, AccessTime } from '@mui/icons-material';

// ----------------- demo products -----------------
const products = [
  { id: 1, name: 'Inventory rubber mats', price: '400LKR', image: img1, carrier: 'Dialog' },
  { id: 2, name: 'Gym rubber flooring', price: '1,333LKR', image: img2, carrier: 'Etisalat' },
  { id: 3, name: 'Rubber runner mats', price: '860LKR', image: img3, carrier: 'Mobitel' },
  { id: 4, name: 'Rubber playground mats', price: '500LKR', image: img4, carrier: 'Hutch' },
  { id: 5, name: 'Commercial flooring', price: '600LKR', image: img5, carrier: 'Dialog' },
  { id: 6, name: 'Rubber carpet tile', price: '550LKR', image: img6, carrier: 'Mobitel' },
];

// ----------------- Reactified Google Maps Component -----------------
const MapSriLanka = ({ carrierFilter, setCarrierFilter }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [locations, setLocations] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [formData, setFormData] = useState({ name: '', latitude: '', longitude: '', description: '' });

  // Load Google Maps script dynamically
  const loadGoogleMapsAPI = async () => {
    const res = await fetch('/api/config');
    const config = await res.json();
    if (!config.hasGoogleMapsKey) {
      alert('Google Maps API key not configured');
      return;
    }

    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };





  

  // Initialize map dynamically
  const initMap = () => {
    if (!mapRef.current) return;
    const m = new window.google.maps.Map(mapRef.current, {
      zoom: 7,
      center: { lat: 7.8731, lng: 80.7718 }, // Sri Lanka
      mapTypeId: 'roadmap',
    });
    setMap(m);
  };

  // Load locations from backend
  const loadLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      if (!res.ok) throw new Error('Failed to fetch locations');
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Update markers whenever locations or filter changes
  useEffect(() => {
    if (!map) return;
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = locations
      .filter(loc => carrierFilter === 'All' || loc.carrier === carrierFilter)
      .map((loc, index) => {
        const lat = loc.coordinates?.latitude || 0;
        const lng = loc.coordinates?.longitude || 0;
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map,
          title: loc.name || 'Unnamed Location',
          animation: window.google.maps.Animation.DROP
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding:10px;">
                      <h3>${loc.name}</h3>
                      <p>${loc.description || 'No description'}</p>
                      <p>Lat: ${lat}, Lng: ${lng}</p>
                    </div>`
        });
        marker.addListener('click', () => infoWindow.open(map, marker));
        return marker;
      });

    setMarkers(newMarkers);

    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      newMarkers.forEach(m => bounds.extend(m.getPosition()));
      map.fitBounds(bounds);
    }
  }, [map, locations, carrierFilter]);

  useEffect(() => {
    (async () => {
      await loadGoogleMapsAPI();
      initMap();
      await loadLocations();
    })();
  }, []);

  // Add location handler
  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          description: formData.description
        })
      });
      if (!res.ok) throw new Error('Failed to add location');
      await loadLocations();
      setFormData({ name: '', latitude: '', longitude: '', description: '' });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Delete location handler
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/locations/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete location');
      await loadLocations();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Map */}
      <Box ref={mapRef} sx={{ flex: 2, borderRadius: 2, overflow: 'hidden' }} />

      {/* Sidebar */}
      <Box sx={{ flex: 1, ml: 2, bgcolor: 'white', borderRadius: 2, p: 2, boxShadow: 1, overflowY: 'auto' }}>
        
        {/* Carrier Filter inside sidebar */}
        <FormControl size="small" fullWidth sx={{ mb: 2 }}>
          <InputLabel id="carrier-filter-label">Filter by Carrier</InputLabel>
          <Select
            labelId="carrier-filter-label"
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Dialog">Dialog</MenuItem>
            <MenuItem value="Mobitel">Mobitel</MenuItem>
            <MenuItem value="Etisalat">Etisalat</MenuItem>
            <MenuItem value="Hutch">Hutch</MenuItem>
          </Select>
        </FormControl>

        {/* Location list */}
        <Typography variant="h6" gutterBottom>Locations</Typography>
        {locations.length === 0 ? (
          <Typography variant="body2" color="text.secondary">No locations found</Typography>
        ) : (
          locations.map((loc, i) => (
            <Box key={loc._id || i} sx={{ p: 1.5, mb: 1.5, border: '1px solid #ddd', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1">{loc.name}</Typography>
                <Button color="error" size="small" onClick={() => handleDelete(loc._id, loc.name)}>Delete</Button>
              </Box>
              <Typography variant="body2" color="text.secondary">{loc.description || 'No description'}</Typography>
              <Typography variant="caption" color="text.secondary">
                Lat: {loc.coordinates?.latitude}, Lng: {loc.coordinates?.longitude}
              </Typography>
            </Box>
          ))
        )}

        {/* Add Location Form */}
        <Box component="form" onSubmit={handleAddLocation} sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Add New Location</Typography>
          <TextField fullWidth size="small" label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} sx={{ mb: 1 }} />
          <TextField fullWidth size="small" label="Latitude" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} sx={{ mb: 1 }} />
          <TextField fullWidth size="small" label="Longitude" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} sx={{ mb: 1 }} />
          <TextField fullWidth size="small" multiline minRows={2} label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} sx={{ mb: 1 }} />
          <Button type="submit" variant="contained" fullWidth>Add Location</Button>
        </Box>
      </Box>
    </Box>
  );
};

// ----------------- Main Home Component -----------------
const Home = () => {
  const [carrierFilter, setCarrierFilter] = useState('All');

  const filteredProducts = useMemo(() => {
    if (carrierFilter === 'All') return products;
    return products.filter(p => p.carrier === carrierFilter);
  }, [carrierFilter]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden" }}>
      <UNavbar />

      {/* Content area */}
      <Box sx={{ display: "flex", gap: 2, flex: 1, px: 2, pb: 2, pt: 2 }}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Map + Sidebar with filter & form */}
          <Box sx={{ flex: 1, minHeight: 500, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <MapSriLanka carrierFilter={carrierFilter} setCarrierFilter={setCarrierFilter} />
          </Box>

          {/* Products */}
          <Box sx={{ flex: 1, minHeight: 200 }}>
            <Main products={filteredProducts} />
          </Box>
        </Box>
      </Box>

      

      <Footer />
    </Box>
  );
};

export default Home;
