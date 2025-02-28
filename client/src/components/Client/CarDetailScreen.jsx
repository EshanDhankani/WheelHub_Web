import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./apiUrl";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Button,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import { MapPin, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Navbar from "../Navbar";

const CustomRating = ({ label, value, maxValue }) => (
  <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
    <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: "bold" }}>
      {label}
    </Typography>

    <LinearProgress
      variant="determinate"
      value={(value / maxValue) * 100}
      sx={{
        height: 8,
        width: "70%",
        borderRadius: 5,
        backgroundColor: "#e0e0e0",
        "& .MuiLinearProgress-bar": {
          borderRadius: 5,
          backgroundColor: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
        },
      }}
    />
    <Typography variant="body2" sx={{ ml: 2 }}>
      {value}/{maxValue}
    </Typography>
  </Box>
);

CustomRating.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

const CarDetailScreen = () => {
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/carAds/${id}`);
        setCarDetails(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError("Failed to fetch car details. Please try again.");
        setCarDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!carDetails) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography>Car details not found.</Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          background: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
          minHeight: "100vh",
          pt: 2,
        }}
      >
        <Container maxWidth="lg" sx={{ mb: 9 }}></Container>

        <Container
          maxWidth="lg"
          sx={{
            background: "#fff",
            borderRadius: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            p: 4,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(45deg, #6DD5FA, #2980B9, #6DD5FA)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              p: 3,
              textAlign: "center",
              color: "#fff",
              mb: 5,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", letterSpacing: 1.5, color: "white" }}
            >
              {carDetails.carInfo}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <MapPin size={32} style={{ marginRight: 8 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                {carDetails.city}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  mb: 6,
                  overflow: "hidden",
                  borderRadius: 4,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  loop={true}
                  style={{ width: "100%", height: "500px" }}
                >
                  {carDetails.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`${api}/${image}`}
                        alt={`${carDetails.carInfo} - ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                  Car Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Registered In
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {carDetails.city}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Color
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {carDetails.exteriorColor}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Mileage
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {carDetails.mileage.toLocaleString()} km
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Year
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {carDetails.year}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h5" fontWeight="bold" color="#B8001F">
                      Seller Comments
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "500" }}
                    >
                      {carDetails.adDescription}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  mb: 2,
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 10px 16px rgba(0,0,0,0.4)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    <Phone style={{ marginRight: 8 }} /> Contact:{" "}
                    {carDetails.mobileNumber}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#D32F2F",
                      marginTop: "18px",
                    }}
                  >
                    PKR: {parseInt(carDetails.price).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 4,
                  boxShadow: "0 10px 16px rgba(0,0,0,0.4)",
                  marginTop: "30px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#D32F2F" }}
                  >
                    Safety Tips for transaction
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <Typography sx={{ color: "black", fontWeight: "500" }}>
                      1. Use a safe location to meet seller
                    </Typography>
                    <Typography sx={{ color: "black", fontWeight: "500" }}>
                      2. Avoid cash transactions
                    </Typography>
                    <Typography sx={{ color: "black", fontWeight: "500" }}>
                      3. Beware of unrealistic offers
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>

              <Button
                variant="contained"
                onClick={() =>
                  navigate("/chat", {
                    state: {
                      carDetails: carDetails,
                      carId: id,
                    },
                  })
                }
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#030950",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#020738",
                  },
                }}
              >
                Contact Me
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CarDetailScreen;
