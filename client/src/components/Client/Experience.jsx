import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  CardContent,
  Link,
  IconButton,
} from "@mui/material";

const Experience = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const carTypes = [
    { icon: "/assets/Sedan.png", label: "Sedan" },
    { icon: "/assets/Hatchback.png", label: "Hatchback" },
    { icon: "/assets/Coupe.png", label: "Coupe" },
    { icon: "/assets/Hybrid.png", label: "Hybrid" },
    { icon: "/assets/Convertible.png", label: "Convertible" },
    { icon: "/assets/Van.png", label: "Van" },
  ];

  const mostSearchedCars = [
    {
      image: "/assets/car1.png",
      price: "$95,000",
      model: "Audi A6 3.5- New",
      details: "3.5 D5 PowerPulse Momentum 5dr AWD…",
      mileage: "100 miles",
    },
    {
      image: "/assets/car2.png",
      price: "$95,000",
      model: "New GLC - 2023",
      details: "4.0L Petrol, Automatic, AWD",
      mileage: "50 mi",
    },
    {
      image: "/assets/car3.png",
      price: "$58,000",
      model: "Audi A6 3.5 - New",
      details: "3.5L Petrol, Automatic, AWD",
      mileage: "100 mi",
    },
    {
      image: "/assets/car4.png",
      price: "$45,000",
      model: "Corolla Altis - 2023",
      details: "1.5L Petrol, CVT, AWD",
      mileage: "800 mi",
    },
  ];

  const mostSearchedParts = [
    {
      image: "/assets/15.jpg",
      price: "$95,000",
      model: "Audi A6 3.5- New",
      details: "3.5 D5 PowerPulse Momentum 5dr AWD…",
      mileage: "100 miles",
    },
    {
      image: "/assets/16.jpg",
      price: "$95,000",
      model: "New GLC - 2023",
      details: "4.0L Petrol, Automatic, AWD",
      mileage: "50 mi",
    },
    {
      image: "/assets/17.jpg",
      price: "$58,000",
      model: "Audi A6 3.5 - New",
      details: "3.5L Petrol, Automatic, AWD",
      mileage: "100 mi",
    },
    {
      image: "/assets/18.jpg",
      price: "$45,000",
      model: "Corolla Altis - 2023",
      details: "1.5L Petrol, CVT, AWD",
      mileage: "800 mi",
    },
  ];

  const features = [
    {
      icon: "/assets/11.png",
      title: "Special Financing Offers",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: "/assets/12.png",
      title: "Trusted Car Dealership",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: "/assets/13.png",
      title: "Transparent Pricing",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: "/assets/14.png",
      title: "Expert Car Service",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
  ];

  const testimonials = [
    {
      image: "/assets/c1.png",
      text: "I had an amazing experience purchasing my car! The staff was friendly and knowledgeable.",
      name: "Lesile Alexander",
      title: "Verified Buyer",
    },
    {
      image: "/assets/c2.png",
      text: "A smooth and hassle-free process. The team made buying my first car so easy and enjoyable!",
      name: "Sarah Williams",
      title: "Verified Buyer",
    },
    {
      image: "/assets/c3.png", // Image path for customer
      text: "Highly recommend! Great selection of cars and excellent customer service.",
      name: "Michael Green",
      title: "Verified Buyer",
    },
    {
      image: "/assets/customer4.jpg", // Image path for customer
      text: "A wonderful experience! They helped me find the perfect car that fit my needs and budget.",
      name: "Emily White",
      title: "Verified Buyer",
    },
    {
      image: "/assets/customer4.jpg", // Image path for customer
      text: "A wonderful experience! They helped me find the perfect car that fit my needs and budget.",
      name: "Emily White",
      title: "Verified Buyer",
    },
  ];

  const teamMembers = [
    {
      image: "/assets/m1.png", // Image path for team member
      name: "John Doe",
      role: "Lahore",
    },
    {
      image: "/assets/m2.png", // Image path for team member
      name: "Sarah Smith",
      role: "Karachi",
    },
    {
      image: "/assets/m3.png", // Image path for team member
      name: "Michael Green",
      role: "Islamabad",
    },
    {
      image: "/assets/m4.png", // Image path for team member
      name: "Emily White",
      role: "Rawalpindi",
    },
  ];

  return (
    <Box>
      {/* Browse by Type Section */}
      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Browse by Type
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {loading ? (
            <CircularProgress />
          ) : (
            carTypes.map((type, index) => (
              <Grid item xs={6} sm={3} md={2} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    padding: "1rem",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "10px",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  <img
                    src={type.icon}
                    alt={type.label}
                    style={{
                      width: "35px",
                      height: "30px",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {type.label}
                  </Typography>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Box>
        {/* Are You Looking For a Car? */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: "2rem",
              borderRadius: "15px",
              backgroundColor: "#C1D9E9",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <img
              src="/assets/buy.png"
              alt="Car Icon"
              style={{
                width: "80px",
                height: "80px",
                position: "absolute",
                top: "99px",
                right: "15px",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Are You Looking For a Car?
            </Typography>
            <Typography sx={{ margin: "1rem 0", color: "#555" }}>
              We are committed to providing our customers with exceptional
              service.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#405FF2",
                color: "#fff",
                textTransform: "none",
                borderRadius: "25px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Do You Want to Sell a Car? */}
          <Box
            sx={{
              flex: 1,
              padding: "2rem",
              borderRadius: "15px",
              backgroundColor: "#FFCFEF",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <img
              src="/assets/sell.png"
              alt="Sell Car Icon"
              style={{
                width: "80px",
                height: "80px",
                position: "absolute",
                top: "99px",
                right: "15px",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Do You Want to Sell a Car?
            </Typography>
            <Typography sx={{ margin: "1rem 0", color: "#57777" }}>
              We are committed to providing our customers with exceptional
              service.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#050B20",
                color: "#fff",
                textTransform: "none",
                borderRadius: "25px",
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          The Most Searched Cars
        </Typography>

        <Grid container spacing={2}>
          {mostSearchedCars.map((car, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  backgroundColor: "#050B20",
                  color: "#fff",
                }}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#C7253E",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  <i className="mdi mdi-message"></i>
                </Box>
                <Box sx={{ padding: "1rem" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    {car.model}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", margin: "10px 0", color: "white" }}
                  >
                    {car.details}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <i className="mdi mdi-speedometer"></i>

                      <Typography
                        variant="body2"
                        sx={{ color: "white", marginLeft: "4px" }}
                      >
                        {car.mileage}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {car.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#C7253E",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: "25px",
                        padding: "6px 16px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "2rem" }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  style={{ width: "60px", height: "60px" }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginTop: "1rem" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", marginTop: "0.5rem" }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          We provide Autoparts
        </Typography>
        <Grid container spacing={2}>
          {mostSearchedParts.map((car, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  backgroundColor: "#050B20",
                  color: "#fff",
                }}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#C7253E",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  <i className="mdi mdi-message"></i>
                </Box>
                <Box sx={{ padding: "1rem" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    {car.model}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px", margin: "10px 0", color: "white" }}
                  >
                    {car.details}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <i className="mdi mdi-speedometer"></i>
                      <Typography
                        variant="body2"
                        sx={{ color: "white", marginLeft: "4px" }}
                      >
                        {car.mileage}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {car.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#C7253E",
                        color: "#fff",
                        textTransform: "none",
                        borderRadius: "25px",
                        padding: "6px 16px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ padding: "2rem", backgroundColor: "fff" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "start", marginBottom: "2rem" }}
        >
          What Our Customers Say
        </Typography>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          navigation={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  padding: "1.5rem",
                  textAlign: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  backgroundColor: "#C1D9E9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginBottom: "1rem",
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: "black", fontWeight: "600" }}
                >
                  {testimonial.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontStyle: "italic",
                    marginBottom: "1.5rem",
                    fontWeight: "500",
                  }}
                >
                  "{testimonial.text}"
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                  {testimonial.name}
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={{ padding: "3rem 1rem", backgroundColor: "#F4F4F4" }}>
        {/* Team Section with 4 members */}
        <Typography
          variant="h4"
          sx={{ textAlign: "start", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Our Mechanics
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  padding: "2rem",
                  backgroundColor: "#ffffff",
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: 200,
                    height: 220,
                    margin: "0 auto 1rem",
                    borderRadius: "50%",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <img
        src="/assets/bg.png" // Replace with your image path
        alt="Featured"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          color: "white",
          padding: "40px 20px",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
     
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Join WheelHub
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "5px", color: "white" }}
            >
              Email:{" "}
              <Link href="mailto:info@wheelhub.com" color="inherit">
                info@yourwebsite.com
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "5px", color: "white" }}
            >
              Phone: +123 456 7890
            </Typography>
            <Typography
              variant="body2"
              sx={{ marginBottom: "5px", color: "white" }}
            >
              Address: 123 Your Street, City, Country
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Quick Links
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Get in Touch
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Help center
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Live Chat
            </Typography>
            <Typography href="#" color="inherit" display="block">
              How it Works
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Our Brands
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Toyota
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Audi
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              BMW
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Nissan
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Ford
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Porsche
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Volswagen
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Sale Hours
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Monday - Friday: 09:00AM - 09:00 PM
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Saturday: 09:00AM - 07:00PM
            </Typography>
            <Typography
              href="#"
              color="inherit"
              display="block"
              sx={{ marginBottom: "8px" }}
            >
              Sunday: Closed
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px", color: "white" }}
            >
              Connect With Us
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                href="https://facebook.com"
                sx={{ marginRight: "10px" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                sx={{ marginRight: "10px" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com"
                sx={{ marginRight: "10px" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Experience;
