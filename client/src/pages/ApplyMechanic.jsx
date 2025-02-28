import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button, Typography, Box, Grid, Paper, InputAdornment } from "@mui/material";
import { Work } from "@mui/icons-material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/mechanicapply.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const ApplyMechanic = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [formDetails, setFormDetails] = useState({
    location: "",
    phoneNumber: "",
    timingFrom: "",
    timingTo: "",
    experience: "",
    ismechanic:true
  });



  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

 

  const btnClick = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/mechanic/applyformechanic",
          { formDetails },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ),
        {
          pending: "Sending application...",
          success: "Application sent successfully!",
          error: "Failed to send application.",
        }
      );
      navigate("/mechanic");
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mech">
        <div className="container">
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
                <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", fontSize: 48, position: "relative" }}>
                  Apply as Mechanic
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

                <Box component="form" noValidate onSubmit={btnClick} sx={{ mt: 5, width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {/* <input type="file" onChange={e => setFile(e.target.files[0])} />
                  <button onClick={handleUpload}>Upload</button> */}
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
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          required
                          name="phoneNumber"
                          label="Phone Number"
                          placeholder="03343818945"
                          onChange={inputChange}
                          value={formDetails.phoneNumber}
                          InputProps={{
                            startAdornment: <PhoneIphoneIcon sx={{ mr: 1 }} />,
                          }}
                          sx={{ my: 2 }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
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
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                  </Grid>

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
                    Apply
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
      <footer />
    </div>
  );
};

export default ApplyMechanic;
