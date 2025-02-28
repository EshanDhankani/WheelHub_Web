import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";
import { TextField, Button, Typography, Box, Grid, Paper, MenuItem, InputAdornment } from "@mui/material";
import { Person, Email, Phone, Lock, Home, Male } from "@mui/icons-material"; 

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Profile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/user/getuser/${userId}`);
      setFormDetails({
        ...temp,
        password: "",
        confpassword: "",
        mobile: temp.mobile || "",
        age: temp.age || "",
      });
      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {
      toast.error("Error fetching user data");
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, age, mobile, address, gender, password, confpassword } = formDetails;

    if (!email) return toast.error("Email should not be empty");
    if (firstname.length < 3) return toast.error("First name must be at least 3 characters long");
    if (lastname.length < 3) return toast.error("Last name must be at least 3 characters long");
    if (password.length < 5) return toast.error("Password must be at least 5 characters long");
    if (password !== confpassword) return toast.error("Passwords do not match");

    try {
      await toast.promise(
        axios.put(
          "/user/updateprofile",
          { firstname, lastname, age, mobile, address, gender, email, password },
          { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        ),
        {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Unable to update profile",
        }
      );
      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box component="section" className="profile-section">
          <Paper elevation={3} className="profile-container">
            <Typography variant="h4" className="form-heading" style={{marginBottom: 30}}>Profile</Typography>
            {/* <img src={file} alt="profile" className="profile-pic" /> */}
            <form onSubmit={formSubmit} className="profile-form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstname"
                    value={formDetails.firstname}
                    onChange={inputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={formDetails.lastname}
                    onChange={inputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formDetails.email}
                    onChange={inputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={formDetails.gender}
                    onChange={inputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Male />
                        </InputAdornment>
                      ),
                    }}
                  >
                    <MenuItem value="neither">Prefer not to say</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    name="age"
                    value={formDetails.age}
                    onChange={inputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile"
                    value={formDetails.mobile}
                    onChange={inputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formDetails.address}
                    onChange={inputChange}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Home />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formDetails.password}
                    onChange={inputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confpassword"
                    value={formDetails.confpassword}
                    onChange={inputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      )}
    </>
  );
}

export default Profile;
