// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { api } from "./apiUrl";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
// import Navbar from "../Navbar";

// const ImageSlider = styled(Box)(({ theme }) => ({
//   position: "relative",
//   width: "100%",
//   overflow: "hidden",
//   borderRadius: "16px",
//   boxShadow: theme.shadows[10],
// }));

// const SliderButton = styled(Button)(({ theme }) => ({
//   position: "absolute",
//   top: "50%",
//   transform: "translateY(-50%)",
//   backgroundColor: "rgba(34, 34, 34, 0.6)",
//   color: "rgba(255, 255, 255, 0.9)",
//   minWidth: "35px",
//   height: "35px",
//   padding: "10px",
//   borderRadius: "50%",
//   boxShadow: theme.shadows[6],
//   "&:hover": {
//     backgroundColor: "rgba(34, 34, 34, 0.8)",
//   },
// }));

// const QuantityBox = styled(Box)({
//   display: "flex",
//   gap: "15px",
//   justifyContent: "center",
//   alignItems: "center",
//   marginBottom: "20px",
// });

// const QuantityButton = styled(Button)({
//   borderRadius: "12px",
//   minWidth: "40px",
//   height: "40px",
//   backgroundColor: "rgb(0, 123, 255)",
//   color: "#ffffff",
//   fontWeight: "bold",
//   "&:hover": {
//     backgroundColor: "rgb(0, 100, 200)",
//   },
// });

// const StyledCard = styled(Card)(({ theme }) => ({
//   border: "1px solid rgba(0, 123, 255, 0.2)",
//   borderRadius: "16px",
//   boxShadow: theme.shadows[3],
//   backgroundColor: theme.palette.background.paper,
// }));

// const AutopartsDetail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const {
//     images,
//     accessoryInfo,
//     city,
//     category,
//     condition,
//     price,
//     mobileNumber,
//     accessoryDescription,
//   } = location.state;

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(price);

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   const handleIncrease = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//     setTotalPrice((prevPrice) => prevPrice + price);
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity((prevQuantity) => prevQuantity - 1);
//       setTotalPrice((prevPrice) => prevPrice - price);
//     }
//   };

//   const handleBuyNow = () => {
//     navigate("/payment", {
//       state: {
//         totalPrice,
//         quantity,
//         accessoryInfo,
//         images: images,
//         category,
//         condition,
//         accessoryDescription,
//       },
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           background: "linear-gradient(142deg, #030950, #12175F, #2F1F2F)",
//           minHeight: "100vh",
//           pt: 2,
//         }}
//       >
//         <Container maxWidth="lg" sx={{ mb: 9 }}></Container>

//         <Container
//           maxWidth="lg"
//           sx={{
//             background: "#fff",
//             borderRadius: 4,
//             boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//             p: 4,
//           }}
//         >
//           <Box
//             sx={{
//               background: "linear-gradient(45deg, #6DD5FA, #2980B9, #6DD5FA)",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//               p: 3,
//               textAlign: "center",
//               color: "#fff",
//               mb: 5,
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="h2"
//               sx={{ fontWeight: "bold", letterSpacing: 1.5, color: "white" }}
//             >
//               {accessoryInfo}
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 mt: 2,
//               }}
//             >
//               <MapPin size={32} style={{ marginRight: 8 }} />
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", color: "white" }}
//               >
//                 {city}
//               </Typography>
//             </Box>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={8}>
//               <Box
//                 sx={{
//                   mb: 6,
//                   overflow: "hidden",
//                   borderRadius: 4,
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <ImageSlider>
//                   <img
//                     src={`${api}/${images[currentImageIndex]}`}
//                     alt={accessoryInfo}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "16px",
//                       boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//                     }}
//                   />
//                   {images.length > 1 && (
//                     <>
//                       <SliderButton onClick={prevImage} sx={{ left: 12 }}>
//                         <ChevronLeft size={26} />
//                       </SliderButton>
//                       <SliderButton onClick={nextImage} sx={{ right: 12 }}>
//                         <ChevronRight size={26} />
//                       </SliderButton>
//                     </>
//                   )}
//                 </ImageSlider>
//               </Box>

//               <Box sx={{ mb: 4 }}>
//                 <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
//                   Product Details
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={6} md={3}>
//                     <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
//                       Category
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{ color: "black", fontWeight: "bold" }}
//                     >
//                       {category}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={6} md={3}>
//                     <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
//                       Condition
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       sx={{ color: "black", fontWeight: "bold" }}
//                     >
//                       {condition}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={4}>
//               <StyledCard sx={{ mb: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                     Price: PKR {totalPrice}
//                   </Typography>
//                   <QuantityBox>
//                     <QuantityButton onClick={handleDecrease}>-</QuantityButton>
//                     <Typography variant="h6">{quantity}</Typography>
//                     <QuantityButton onClick={handleIncrease}>+</QuantityButton>
//                   </QuantityBox>

//                   <Button
//                     variant="contained"
//                     fullWidth
//                     onClick={handleBuyNow}
//                     sx={{
//                       mb: 3,
//                       textTransform: "none",
//                       backgroundColor: "rgb(33, 150, 243)",
//                     }}
//                   >
//                     Buy Now
//                   </Button>

//                   <Typography variant="h6" sx={{ mt: 1 }}>
//                     <Phone style={{ marginRight: 3 }} /> Contact: 0
//                     {parseInt(mobileNumber).toString()}
//                   </Typography>
//                 </CardContent>
//               </StyledCard>

//               <StyledCard sx={{ marginTop: 8 }}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontWeight: "bold",
//                       color: "#D32F2F",
//                       marginLeft: "29px",
//                     }}
//                   >
//                     Buy From WheelHub
//                   </Typography>

//                   <Typography variant="body1" sx={{ mt: 1 }}>
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontWeight: "500",
//                         marginLeft: "29px",
//                       }}
//                     >
//                       100% Genuine Auto Parts
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontWeight: "500",
//                         marginLeft: "29px",
//                       }}
//                     >
//                       Free Shipping
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: "black",
//                         fontWeight: "500",
//                         marginLeft: "29px",
//                       }}
//                     >
//                       30-Day Returns
//                     </Typography>
//                   </Typography>
//                 </CardContent>
//               </StyledCard>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default AutopartsDetail;


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "./apiUrl";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import Navbar from "../Navbar";

const ImageSlider = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  overflow: "hidden",
  borderRadius: "16px",
  boxShadow: theme.shadows[10],
}));

const SliderButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(34, 34, 34, 0.6)",
  color: "rgba(255, 255, 255, 0.9)",
  minWidth: "35px",
  height: "35px",
  padding: "10px",
  borderRadius: "50%",
  boxShadow: theme.shadows[6],
  "&:hover": {
    backgroundColor: "rgba(34, 34, 34, 0.8)",
  },
}));

const QuantityBox = styled(Box)({
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});

const QuantityButton = styled(Button)({
  borderRadius: "12px",
  minWidth: "40px",
  height: "40px",
  backgroundColor: "rgb(0, 123, 255)",
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "rgb(0, 100, 200)",
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid rgba(0, 123, 255, 0.2)",
  borderRadius: "16px",
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
}));

const AutopartsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Add state for handling potential missing data
  const [productData, setProductData] = useState({
    images: [],
    accessoryInfo: "Product Not Found",
    city: "Unknown",
    category: "N/A",
    condition: "N/A",
    price: 0,
    mobileNumber: "N/A",
    accessoryDescription: "No description available"
  });

  const [isValidData, setIsValidData] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Check if location state exists and has required properties
    if (location.state && location.state.images && location.state.images.length > 0) {
      setProductData(location.state);
      setIsValidData(true);
      setTotalPrice(location.state.price || 0);
    } else {
      // Optionally, you could redirect to a previous page or show an error
      console.error("No product data found");
      // Example: navigate back to the previous page
      navigate(-1);
    }
  }, [location.state, navigate]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + productData.images.length) % productData.images.length
    );
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    setTotalPrice((prevPrice) => prevPrice + productData.price);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setTotalPrice((prevPrice) => prevPrice - productData.price);
    }
  };

  const handleBuyNow = () => {
    if (!isValidData) {
      alert("Cannot proceed with purchase. Product data is missing.");
      return;
    }

    navigate("/payment", {
      state: {
        totalPrice,
        quantity,
        accessoryInfo: productData.accessoryInfo,
        images: productData.images,
        category: productData.category,
        condition: productData.condition,
        accessoryDescription: productData.accessoryDescription,
      },
    });
  };

  // If data is not valid, you might want to show a loading or error state
  if (!isValidData) {
    return (
      <>
        <Navbar />
        <Container>
          <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
            Loading product details or product not found
          </Typography>
        </Container>
      </>
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
              {productData.accessoryInfo}
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
                {productData.city}
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
                <ImageSlider>
                  {productData.images.length > 0 && (
                    <img
                      src={`${api}/${productData.images[currentImageIndex]}`}
                      alt={productData.accessoryInfo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  )}
                  {productData.images.length > 1 && (
                    <>
                      <SliderButton onClick={prevImage} sx={{ left: 12 }}>
                        <ChevronLeft size={26} />
                      </SliderButton>
                      <SliderButton onClick={nextImage} sx={{ right: 12 }}>
                        <ChevronRight size={26} />
                      </SliderButton>
                    </>
                  )}
                </ImageSlider>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                  Product Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Category
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {productData.category}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                      Condition
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {productData.condition}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Price: PKR {totalPrice}
                  </Typography>
                  <QuantityBox>
                    <QuantityButton onClick={handleDecrease}>-</QuantityButton>
                    <Typography variant="h6">{quantity}</Typography>
                    <QuantityButton onClick={handleIncrease}>+</QuantityButton>
                  </QuantityBox>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleBuyNow}
                    sx={{
                      mb: 3,
                      textTransform: "none",
                      backgroundColor: "rgb(33, 150, 243)",
                    }}
                  >
                    Buy Now
                  </Button>

                  <Typography variant="h6" sx={{ mt: 1 }}>
                    <Phone style={{ marginRight: 3 }} /> Contact: 0
                    {parseInt(productData.mobileNumber).toString()}
                  </Typography>
                </CardContent>
              </StyledCard>

              <StyledCard sx={{ marginTop: 8 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#D32F2F",
                      marginLeft: "29px",
                    }}
                  >
                    Buy From WheelHub
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "500",
                        marginLeft: "29px",
                      }}
                    >
                      100% Genuine Auto Parts
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "500",
                        marginLeft: "29px",
                      }}
                    >
                      Free Shipping
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: "500",
                        marginLeft: "29px",
                      }}
                    >
                      30-Day Returns
                    </Typography>
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AutopartsDetail;