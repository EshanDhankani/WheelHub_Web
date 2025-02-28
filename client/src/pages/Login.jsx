import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";
import { TextField, Button, Typography, Box, Grid, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formDetails;

    if (!email || !password) {
      return toast.error("Input fields should not be empty");
    } else if (!validateEmail(email)) {
      return toast.error("Email must be a valid Gmail address.");
    } else if (password.length < 5) {
      return toast.error("Password must be at least 5 characters long.");
    }

    try {
      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        },
      {
        withCredentials:true
      }),
        {
          pending: "Logging in...",
          success: "Login successful",
          error: "Unable to login user",
        }
      );

      localStorage.setItem("token", data.token);
      const decodedToken = jwt_decode(data.token);
      dispatch(setUserInfo(decodedToken.userId));
      getUser(decodedToken.userId);
    } catch (error) {
      toast.error("Error logging in. Please try again.");
    }
  };

  const getUser = async (id) => {
    try {
      const temp = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(temp));
      navigate("/");
    } catch (error) {
      toast.error("Failed to fetch user data.");
    }
  };

  return (
    <div  className="login">
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", fontSize: 64, position: "relative" }}>
              Sign In
              <Box
                component="span"
                sx={{
                  position: "absolute",
                  left: 0,
                  bottom: -5,
                  height: 6,
                  width: "80%",
                  background: "linear-gradient(120deg, #D52728, #33C0FF, #5733FF, #030947)",
                  borderRadius: "5px",
                }}
              />
            </Typography>

            <Box component="form" noValidate onSubmit={formSubmit} sx={{ mt: 5, width: '100%' }}>
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
                Sign In
              </Button>

              <Grid container justifyContent="center" sx={{ mb: 2 }}>
                <Grid item>
                  <NavLink to="/mechanic-register" className="register-link">
                    Not a user? <span style={{ color: "#D52728" }}>Register</span>
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

export default Login;
