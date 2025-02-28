import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/register.css";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { Work } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import ScheduleIcon from "@mui/icons-material/Schedule";

import LocationOnIcon from "@mui/icons-material/LocationOn";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Register() {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    location: "",
    phone: "",
    experience: "",
    timingFrom: "",
    timingTo: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password, confpassword } = formDetails;

    if (!firstname || !lastname || !email || !password || !confpassword) {
      return toast.error("All fields are required.");
    } else if (firstname.length < 3) {
      return toast.error("First name must be at least 3 characters long");
    } else if (lastname.length < 3) {
      return toast.error("Last name must be at least 3 characters long");
    } else if (password.length < 5) {
      return toast.error("Password must be at least 5 characters long");
    } else if (password !== confpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/user/register`,
          formDetails
        ),
        {
          pending: "Registering...",
          success: "Registration successful!",
          error: "Registration failed.",
        }
      );
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register">
      <ToastContainer />
      <Grid
        container
        component="main"
        sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: 64, position: "relative" }}
            >
              Register
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -5,
                  height: 6,
                  width: "80%",
                  background:
                    "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
                  borderRadius: "5px",
                }}
              />
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={formSubmit}
              sx={{ mt: 5, width: "100%" }}
            >
              <TextField
                fullWidth
                required
                name="firstname"
                label="First Name"
                onChange={inputChange}
                value={formDetails.firstname}
                sx={{ my: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                name="lastname"
                label="Last Name"
                onChange={inputChange}
                value={formDetails.lastname}
                sx={{ my: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                name="location"
                label="Location"
                onChange={inputChange}
                value={formDetails.location}
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1 }} />,
                }}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                required
                name="phone"
                label="Phone Number"
                placeholder="03343818945"
                onChange={inputChange}
                value={formDetails.phone}
                InputProps={{
                  startAdornment: <PhoneIphoneIcon sx={{ mr: 1 }} />,
                }}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                required
                name="experience"
                label="Experience (in years)"
                type="number"
                onChange={inputChange}
                value={formDetails.experience}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  ),
                }}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                required
                name="timingFrom"
                label="Timing From"
                placeholder="08:00"
                onChange={inputChange}
                value={formDetails.timingFrom}
                InputProps={{
                  startAdornment: <ScheduleIcon sx={{ mr: 1 }} />,
                }}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                required
                name="timingTo"
                label="Timing To"
                placeholder="17:00"
                onChange={inputChange}
                value={formDetails.timingTo}
                InputProps={{
                  startAdornment: <ScheduleIcon sx={{ mr: 1 }} />,
                }}
                sx={{ my: 2 }}
              />
              <TextField
                fullWidth
                required
                name="email"
                label="Email Address"
                onChange={inputChange}
                value={formDetails.email}
                sx={{ my: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={inputChange}
                value={formDetails.password}
                sx={{ my: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                name="confpassword"
                label="Confirm Password"
                type={showConfPassword ? "text" : "password"}
                onChange={inputChange}
                value={formDetails.confpassword}
                sx={{ my: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfPassword(!showConfPassword)}
                        edge="end"
                      >
                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#030947",
                  borderRadius: 5,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="center" sx={{ mb: 2 }}>
                <Grid item>
                  <NavLink to="/login" className="login-link">
                    Already a user?{" "}
                    <span style={{ color: "#D52728" }}>Log In</span>
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
