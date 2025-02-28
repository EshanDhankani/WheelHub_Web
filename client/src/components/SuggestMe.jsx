import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { api } from './Client/apiUrl';
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
const SuggestMe = () => {
    const [priceRange, setPriceRange] = useState("");
    const [city, setCity] = useState("");
    const [color, setColor] = useState("");
    const [mileage, setMileage] = useState("");

    const navigate = useNavigate();
    const handleSubmit = (event) => {

        event.preventDefault();
        navigate(`/Suggested-Car/price=${priceRange}&City=${city}&color=${color}&mileage=${mileage}`)

    };

    return (
        <div>
            <ToastContainer />
            <Grid
                container
                component="main"
                sx={{ height: "109vh", fontFamily: "Poppins, sans-serif" }}
            >
                <Grid item xs={12} sx={{
                    paddingTop: '7rem',

                }} sm={8} md={6} component={Paper} elevation={6} square>
                    <Typography
                        component="h1"
                        sx={{
                            paddingLeft: '1rem',
                            fontWeight: "bold",
                            fontSize: 64,
                            position: "relative",
                            alignSelf: "flex-start",
                            color: "#333"
                        }}
                        variant="h5"
                    >
                        Suggest Me
                        <Box
                            component="span"
                            sx={{
                                position: "absolute",
                                left: 0,
                                bottom: -4,
                                height: 6,
                                width: "100%",
                                background: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
                                borderRadius: "5px",
                            }}
                        />
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 5, paddingLeft: '1rem',
                            paddingRight: '2rem'
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel id="price-range-label">Price Range</InputLabel>
    <Select
        labelId="price-range-label"
        id="priceRange"
        value={priceRange}
        label="Price Range"
        onChange={(e) => setPriceRange(e.target.value)}
    >
        <MenuItem value={"500000-1000000"}>Between 5 Lacs to 10 Lacs</MenuItem>
        <MenuItem value={"1500000-2000000"}>Between 15 Lacs to 20 Lacs</MenuItem>
        <MenuItem value={"2000000-2500000"}>Between 20 Lacs to 25 Lacs</MenuItem>
        <MenuItem value={"2500000-3000000"}>Between 25 Lacs to 30 Lacs</MenuItem>
        <MenuItem value={"4000000-5000000"}>Between 40 Lacs to 50 Lacs</MenuItem>
        <MenuItem value={"7500000-10000000"}>Between 75 Lacs to 1 Crore</MenuItem>
        <MenuItem value={"15000000-20000000"}>Between 1.5 Crore to 2 Crore</MenuItem>
    </Select>
</FormControl>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="city-label">City</InputLabel>
                                    <Select
                                        labelId="city-label"
                                        id="city"
                                        value={city}
                                        label="City"
                                        onChange={(e) => setCity(e.target.value)}
                                    >
                                        <MenuItem value="Lahore">Lahore</MenuItem>
                                        <MenuItem value="Karachi">Karachi</MenuItem>
                                        <MenuItem value="Islamabad">Islamabad</MenuItem>
                                        <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                                        <MenuItem value="Badin">Badin</MenuItem>
                                        <MenuItem value="Larkana">Larkana</MenuItem>
                                        <MenuItem value="Sukkur">Sukkur</MenuItem>
                                        <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                                        <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                                        <MenuItem value="Swat">Swat</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Second Row */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="color-label">Color</InputLabel>
                                    <Select
                                        labelId="color-label"
                                        id="color"
                                        value={color}
                                        label="Color"
                                        onChange={(e) => setColor(e.target.value)}
                                    >
                                        <MenuItem value="White">White</MenuItem>
                                        <MenuItem value="Black">Black</MenuItem>
                                        <MenuItem value="Silver">Silver</MenuItem>
                                        <MenuItem value="Red">Red</MenuItem>
                                        <MenuItem value="Blue">Blue</MenuItem>
                                        <MenuItem value="Strong Blue Metelic">
                                            Strong Blue Metelic
                                        </MenuItem>
                                        <MenuItem value="Burgundy">Burgundy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="mileage"
                                    label="Mileage"
                                    type="number"
                                    value={mileage}
                                    onChange={(e) => setMileage(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            endIcon={<KeyboardDoubleArrowRightIcon />}
                            sx={{
                                mt: 3,
                                mb: 2,
                                background: "#030947",
                                borderRadius: 5,
                                fontWeight: "bold",
                                textTransform: "none",
                            }}
                        >
                            Submit
                        </Button>

                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link
                                    href="/login"
                                    variant="body2"
                                    sx={{
                                        textTransform: "none",
                                        color: "#000000",
                                        textDecoration: "none",
                                    }}
                                >

                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        background: "linear-gradient(90deg, #1F1F1F, #12152E, #030947)",
                        backgroundSize: "cover",
                        paddingTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src="/logo2.png" alt="Logo" height={540} />
                </Grid>
            </Grid>
        </div>
    );
};

export default SuggestMe;
