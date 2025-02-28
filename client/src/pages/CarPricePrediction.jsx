import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Calendar, DollarSign, GitFork, Users, Droplet, User, Settings } from "lucide-react";
import "../styles/carpriceprediction.css";

const CarPricePrediction = () => {
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Owner: "",
    Fuel_Type_Petrol: "Petrol",
    Seller_Type_Individual: "Dealer",
    Transmission_Mannual: "Manual",
  });

  const [prediction, setPrediction] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setPrediction(response.data.prediction);
      setSnackbar({ open: true, message: "Prediction successful!", severity: "success" });
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Error in prediction. Please try again.", severity: "error" });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Card className="styled-card">
      <CardContent>
        <Typography variant="h4" component="h1" className="form-title">
          Car Price Predictor
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="Year"
                label="Purchase Year"
                type="number"
                value={formData.Year}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <Calendar size={22} style={{ marginRight: 8, color: "#6a11cb" }} />,
                }}
                className="styled-text-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="Present_Price"
                label="Current Showroom Price (In lakhs)"
                type="number"
                value={formData.Present_Price}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <DollarSign size={22} style={{ marginRight: 8, color: "#6a11cb" }} />,
                }}
                className="styled-text-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="Kms_Driven"
                label="Kilometers Driven"
                type="number"
                value={formData.Kms_Driven}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <GitFork size={22} style={{ marginRight: 8, color: "#6a11cb" }} />,
                }}
                className="styled-text-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="Owner"
                label="Number of Previous Owners"
                type="number"
                value={formData.Owner}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <Users size={22} style={{ marginRight: 8, color: "#6a11cb" }} />,
                }}
                className="styled-text-field"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth className="styled-form-control">
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  name="Fuel_Type_Petrol"
                  value={formData.Fuel_Type_Petrol}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Petrol">Petrol</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                  <MenuItem value="CNG">CNG</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth className="styled-form-control">
                <InputLabel>Seller Type</InputLabel>
                <Select
                  name="Seller_Type_Individual"
                  value={formData.Seller_Type_Individual}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Dealer">Dealer</MenuItem>
                  <MenuItem value="Individual">Individual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth className="styled-form-control">
                <InputLabel>Transmission Type</InputLabel>
                <Select
                  name="Transmission_Mannual"
                  value={formData.Transmission_Mannual}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Manual">Manual Car</MenuItem>
                  <MenuItem value="Automatic">Automatic Car</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth className="styled-button">
                Calculate Price
              </Button>
            </Grid>
          </Grid>
        </form>
        {prediction && (
          <Typography variant="h6" className="result-text">
            Predicted Price: ${prediction}
          </Typography>
        )}
      </CardContent>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Card>
  );
};

export default CarPricePrediction;
