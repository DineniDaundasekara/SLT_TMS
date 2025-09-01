import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EventNoteIcon from "@mui/icons-material/EventNote";

// 🔹 Video Background Wrapper
const VideoBackground = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: "-1",
});

// 🔹 Full Page Container (Overlay)
const PageContainer = styled(Box)({
  minHeight: "100vh",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",
});

// 🔹 Dark Overlay for Text Readability
const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(47, 47, 47, 0.8)", // 🔽 Increased darkness (was 0.5, now 0.8)
  zIndex: 0,
});


// 🔹 Services Section
// 🔹 Smaller Services Section
const ServicesSection = styled(Box)({
  position: "relative",
  //background: "rgba(0, 0, 0, 0.7)", // Dark backdrop for readability
  padding: "3px 170px", // 🔽 Reduced padding
  borderRadius: "8px", // 🔽 Smaller border radius
  zIndex: 1,
   // 🔽 Reduced margin
});


// 🔹 Service Card Styling
const CustomCard = styled(Card)({
  textAlign: "center",
  padding: "1px",
  borderRadius: "12px",
  background: "#f8f8f8",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
  },
});

// 🔹 Icon Styling
const IconWrapper = styled(Box)({
  fontSize: "4rem",
  color: "#007BFF",
  marginBottom: "10px",
});

// 🔹 Highlighted Text (Golden)
const HighlightText = styled("span")({
  color: "#FFD700",
  fontWeight: "bold",
});

const Main = () => {
const services = [
  {
    title: "Inventory Management",
    description:
      "Track all your household items in one place, stay updated on stock levels and expiry dates.",
    icon: <InventoryIcon fontSize="large" sx={{ color: "#007BFF" }} />,
  },
  {
    title: "Smart Grocery Lists",
    description:
      "Generate grocery lists automatically based on low-stock items and meal plans.",
    icon: <ShoppingCartIcon fontSize="large" sx={{ color: "#007BFF" }} />,
  },
  {
    title: "Personalized Planning",
    description:
      "Create AI-powered schedules for meals, shopping, and tasks based on your preferences.",
    icon: <EventNoteIcon fontSize="large" sx={{ color: "#007BFF" }} />,
  },
];

  return (
    <PageContainer>
      {/* 🎥 Background Video */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src="/videos/v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* 🌓 Overlay to Improve Readability */}
      <Overlay />

      {/* 🌟 Welcome Section */}
      <Box
        position="relative"
        zIndex={1}
        sx={{ padding: "100px 20px", mt: -10}}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to <HighlightText>HOMITASK</HighlightText>
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          The Smarter Way to Manage Your Home Tasks.
        </Typography>
      </Box>

      {/* 📌 Services Section */}
      {/* 📌 Services Section */}
      <ServicesSection>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 0 }}>
          {" "}
          {/* 🔽 Reduced size */}
          Our Services
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {" "}
          {/* 🔽 Smaller text */}
          We offer a wide range of services to meet all your needs in the rubber
          industry.
        </Typography>

        <Container maxWidth="md">
          {" "}
          {/* 🔽 Changed to "md" for a smaller width */}
          <Grid container spacing={3} justifyContent="center">
            {" "}
            {/* 🔽 Reduced spacing */}
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CustomCard>
                  <CardContent>
                    <IconWrapper>{service.icon}</IconWrapper>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#007BFF" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                      {service.description}
                    </Typography>
                  </CardContent>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ServicesSection>
    </PageContainer>
  );
};

export default Main;
