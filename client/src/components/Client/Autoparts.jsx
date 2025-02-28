import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "./apiUrl";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  TextField,
  styled,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const theme = createTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#f90" },
    background: { default: "#f4f4f4" },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiChip: { styleOverrides: { root: { borderRadius: 4 } } },
    MuiButton: {
      styleOverrides: { root: { borderRadius: 4, textTransform: "none" } },
    },
  },
});

// Fixed Height and Style for Cards
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  position: "relative",
  backgroundColor: "#212121",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  border: "none",
  height: "400px", // Fixed height for card
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  },
}));

const CardImage = styled(CardMedia)(({ theme }) => ({
  height: "220px",
  objectFit: "cover",
  width: "100%",
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
}));

const RatingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: "#C7253E",
  color: "#fff",
  textTransform: "none",
  borderRadius: "25px",
  padding: "6px 16px",
  fontWeight: "bold",
  fontSize: "14px",
  alignSelf: "flex-end",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const FullScreenContainer = styled(Box)(() => ({
  marginTop: "100px",
  minHeight: "90vh",
  width: "100%",
  background: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
  display: "flex",
  padding: "0 20px",
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: "260px",
  minHeight: "90vh",
  marginTop: "115px",
  backgroundColor: "#ffffff",
  border: "1px solid #4A4947",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  position: "fixed",
  marginLeft: "9px",
  left: 0,
  top: 0,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
}));

const PageContent = styled(Box)(({ theme }) => ({
  marginLeft: "250px",
  padding: theme.spacing(3),
  width: "calc(100% - 250px)",
  display: "flex",
  flexDirection: "column",
}));

const FilterSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
  fontSize: "14px",
}));

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  marginLeft: 0,
  marginRight: 0,
  "& .MuiTypography-root": { fontSize: "14px" },
}));

const Autoparts = () => {
  const [accessories, setAccessories] = useState([]);
  const [brandFilter, setBrandFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredAccessories, setFilteredAccessories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const priceOptions = [
    100, 500, 1000, 5000, 10000, 20000, 30000, 50000, 100000,
  ];

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(`${api}/api/accessories`);
        setAccessories(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  useEffect(() => {
    let filtered = accessories;

    if (brandFilter) {
      filtered = filtered.filter((item) => item.category === brandFilter);
    }

    if (capacityFilter.length > 0) {
      filtered = filtered.filter((item) =>
        capacityFilter.includes(item.condition)
      );
    }

    if (
      minPrice !== "" &&
      maxPrice !== "" &&
      Number(maxPrice) > Number(minPrice)
    ) {
      filtered = filtered.filter(
        (item) =>
          item.price >= Number(minPrice) && item.price <= Number(maxPrice)
      );
    }

    setFilteredAccessories(filtered);
  }, [brandFilter, capacityFilter, minPrice, maxPrice, accessories]);

  const handleSearch = () => {
    const filtered = accessories.filter((item) =>
      item.accessoryInfo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAccessories(filtered);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleCapacityFilterChange = (event) => {
    const value = event.target.value;
    setCapacityFilter((prev) =>
      prev.includes(value)
        ? prev.filter((cap) => cap !== value)
        : [...prev, value]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <FullScreenContainer sx={{ marginTop: "0rem" }}>
        <Sidebar>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            SHOW RESULTS BY:
          </Typography>

          <SearchContainer>
            <SearchInput
              variant="outlined"
              size="small"
              label="Search Products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{
                textTransform: "none",
                color: "fff",
                backgroundColor: "#C7253E",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
                padding: "8px 16px",
              }}
            >
              Go
            </Button>
          </SearchContainer>

          <Divider />

          <Box mt={2}>
            <FilterSectionTitle variant="subtitle1">
              CATEGORY
            </FilterSectionTitle>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="brand-select-label">Select Category</InputLabel>
              <Select
                labelId="brand-select-label"
                value={brandFilter}
                onChange={handleBrandFilterChange}
                label="Select Category"
              >
                <MenuItem value="Interior">Interior</MenuItem>
                <MenuItem value="Exterior">Exterior</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          <Box mb={2}>
            <FilterSectionTitle variant="subtitle1">
              CONDITION
            </FilterSectionTitle>
            <FormGroup>
              <StyledFormControlLabel
                control={<Checkbox />}
                label="Used"
                value="Used"
                checked={capacityFilter.includes("Used")}
                onChange={handleCapacityFilterChange}
              />
              <StyledFormControlLabel
                control={<Checkbox />}
                label="New"
                value="New"
                checked={capacityFilter.includes("New")}
                onChange={handleCapacityFilterChange}
              />
            </FormGroup>
          </Box>

          <Divider />

          <Box mt={2}>
            <FilterSectionTitle variant="subtitle1">
              PRICE RANGE
            </FilterSectionTitle>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="price-min-label">Min Price</InputLabel>
              <Select
                labelId="price-min-label"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              >
                {priceOptions.map((price) => (
                  <MenuItem key={price} value={price}>
                    {price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            >
              <InputLabel id="price-max-label">Max Price</InputLabel>
              <Select
                labelId="price-max-label"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                {priceOptions.map((price) => (
                  <MenuItem key={price} value={price}>
                    {price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Sidebar>

        <PageContent>
          <Grid container spacing={3}>
            {filteredAccessories.map((accessory) => (
              <Grid item xs={12} sm={6} md={3} key={accessory._id}>
                <Link
                  to={`/details/${accessory._id}`}
                  state={{
                    images: accessory.images,
                    accessoryInfo: accessory.accessoryInfo,
                    city: accessory.city,
                    category: accessory.category,
                    condition: accessory.condition,
                    price: accessory.price,
                    mobileNumber: accessory.mobileNumber,
                    accessoryDescription: accessory.accessoryDescription,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <StyledCard>
                    <CardImage
                      component="img"
                      image={`http://localhost:3001/${accessory.images[0]}`}
                      alt={accessory.accessoryInfo}
                    />

                    <CardContentStyled>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "white" }}
                      >
                        {accessory.accessoryInfo}
                      </Typography>
                      <RatingBox>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              color: theme.palette.secondary.main,
                              fontSize: 20,
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </RatingBox>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold", color: "white" }}
                        >
                          {accessory.condition}
                        </Typography>
                        <Typography
                          variant="h7"
                          sx={{ fontWeight: "bold", color: "white" }}
                        >
                          {`PKR ${accessory.price.toLocaleString()}`}
                        </Typography>

                        <ButtonStyled>View Details</ButtonStyled>
                      </Box>
                    </CardContentStyled>
                  </StyledCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </PageContent>
      </FullScreenContainer>
    </ThemeProvider>
  );
};

export default Autoparts;
