import React from 'react';

import Main from './Main';
import Footer from './Footer';
import Sidebar2 from './Sidebar2';
import UNavbar from './UNavbar';
import MapSriLanka from './MapSriLanka';

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
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { LocationOn, Mail, Phone, AccessTime } from '@mui/icons-material';

// ----------------- demo products (unchanged except carrier) -----------------
const products = [
  { id: 1, name: 'Inventory rubber mats', price: '400LKR',  image: img1, description: '', carrier: 'Dialog' },
  { id: 2, name: 'Gym rubber flooring',   price: '1,333LKR', image: img2, description: '', carrier: 'Etisalat' },
  { id: 3, name: 'Rubber runner mats',    price: '860LKR',  image: img3, description: '', carrier: 'Mobitel' },
  { id: 4, name: 'Rubber playground mats',price: '500LKR',  image: img4, description: '', carrier: 'Hutch' },
  { id: 5, name: 'Commercial flooring',   price: '600LKR',  image: img5, description: '', carrier: 'Dialog' },
  { id: 6, name: 'Rubber carpet tile',    price: '550LKR',  image: img6, description: '', carrier: 'Mobitel' },
];

// ----------------- alarm points (sample data) -----------------
// Add or fetch from your API later. Each alarm has: id, name, carrier, lat, lng, city, severity.
const alarms = [
  // Dialog
  { id: 'D-001', name: 'BTS Outage',     carrier: 'Dialog',   city: 'Colombo 05',   lat: 6.8796,  lng: 79.8685,  severity: 'High' },
  { id: 'D-002', name: 'Backhaul Issue', carrier: 'Dialog',   city: 'Kandy',        lat: 7.2906,  lng: 80.6337,  severity: 'Medium' },
  // Mobitel
  { id: 'M-001', name: 'Power Failure',  carrier: 'Mobitel',  city: 'Galle',        lat: 6.0535,  lng: 80.2210,  severity: 'High' },
  { id: 'M-002', name: 'Node Down',      carrier: 'Mobitel',  city: 'Jaffna',       lat: 9.6615,  lng: 80.0255,  severity: 'Low' },
  // Etisalat
  { id: 'E-001', name: 'Link Flap',      carrier: 'Etisalat', city: 'Kurunegala',   lat: 7.4863,  lng: 80.3620,  severity: 'Medium' },
  { id: 'E-002', name: 'BTS Degraded',   carrier: 'Etisalat', city: 'Matara',       lat: 5.9549,  lng: 80.5540,  severity: 'Low' },
  // Hutch
  { id: 'H-001', name: 'Packet Loss',    carrier: 'Hutch',    city: 'Trincomalee',  lat: 8.5711,  lng: 81.2335,  severity: 'Medium' },
  { id: 'H-002', name: 'No Service',     carrier: 'Hutch',    city: 'Anuradhapura', lat: 8.3114,  lng: 80.4037,  severity: 'High' },
];

const Home = () => {
  // Carrier filter
  const [carrierFilter, setCarrierFilter] = React.useState('All');

  const filteredProducts = React.useMemo(() => {
    if (carrierFilter === 'All') return products;
    return products.filter(p => p.carrier === carrierFilter);
  }, [carrierFilter]);

  const filteredAlarms = React.useMemo(() => {
    if (carrierFilter === 'All') return alarms;
    return alarms.filter(a => a.carrier === carrierFilter);
  }, [carrierFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background layer (optional) */}
      <Box
        sx={{
          position: "absolute", inset: 0, zIndex: -1,
          backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
        }}
      />

      <UNavbar />

      {/* Carrier Filter */}
      <Box sx={{ px: 2, pt: 2, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="carrier-filter-label">Filter by Carrier</InputLabel>
          <Select
            labelId="carrier-filter-label"
            label="Filter by Carrier"
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

        <Typography variant="body2" color="text.secondary">
          Showing {filteredAlarms.length} alarm{filteredAlarms.length !== 1 ? 's' : ''} on map
        </Typography>
      </Box>

      {/* Content area: sidebar + main */}
      <Box sx={{ display: "flex", gap: 2, flex: 1, px: 2, pb: 2 }}>
        <Sidebar2 />

        <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Dynamic Sri Lanka Map with filtered alarms */}
          <Box sx={{ height: 420, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <MapSriLanka alarms={filteredAlarms} />
          </Box>

          {/* Products / other main content */}
          <Box sx={{ flex: 1, minHeight: 200 }}>
            <Main products={filteredProducts} />
          </Box>
        </Box>
      </Box>

      {/* Contact Us Section */}
      <Box py={5} px={3} bgcolor="#f9f9f9" id="contact-us">
        <Typography variant="h4" align="center" gutterBottom>
          CONTACT US
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt="Location Map"
              image={locationMap}
              sx={{ borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemIcon><LocationOn fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText
                  primary="Our Office Address"
                  secondary="PRI (Pvt) Ltd. 123, Industrial Zone, Colombo 05, Colombo 00500, Sri Lanka"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon><Mail fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="General Enquiries" secondary="prirubber@email.com" />
              </ListItem>
              <ListItem>
                <ListItemIcon><Phone fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="Call Us" secondary="+94-78 111 1111" />
              </ListItem>
              <ListItem>
                <ListItemIcon><AccessTime fontSize="large" color="primary" /></ListItemIcon>
                <ListItemText primary="Our Timing" secondary="Mon - Sun: 10:00 AM - 07:00 PM" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* About Us Section */}
      <Box py={5} px={3} bgcolor="#f9f9f9" id="about-us">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              alt="Decorative Image"
              height="400"
              image={myImage}
              sx={{ borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ pl: { md: 3 }, mt: { xs: 2, md: 0 } }}>
            <Typography variant="h4" component="h2" gutterBottom>ABOUT US</Typography>
            <Typography variant="body1" color="textSecondary">
              HomiTask — an intelligent and efficient home task management solution designed to streamline household organization.
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>
              Wishlist tracking, shopping lists, meal planning, and inventory—backed by automation, smart notifications, and AI-driven insights.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
