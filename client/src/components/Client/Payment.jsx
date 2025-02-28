import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import axios from "axios";
import { api } from "./apiUrl";
import Navbar from "../Navbar";

const stripePromise = loadStripe(
  "pk_test_51QT2UiLNc1e6h3y0TYotCyldbxQtkTNFL5iwwcCVHpruiiM0M8T4MlYGkmrfgcXCclKA03K1p0ZyHbj9igyIg5dN00XbzRXVoT"
);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#2c3e50",
      fontFamily: '"Inter", "Roboto", sans-serif',
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e74c3c",
    },
  },
};

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, quantity, accessoryInfo, images } = location.state || {};

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/payment/create-payment-intent",
          {
            amount: Math.round(totalPrice * 100),
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setPaymentError("Failed to create payment intent");
      }
    };

    if (totalPrice) {
      createPaymentIntent();
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setPaymentError(null);

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "Test User",
              email: "test@example.com",
            },
          },
        }
      );

      if (error) {
        setPaymentStatus({ success: false, message: error.message });
      } else if (paymentIntent.status === "succeeded") {
        setPaymentStatus({ success: true, message: "Payment successful!" });
      }
    } catch (error) {
      setPaymentStatus({ success: false, message: "Payment confirmation failed" });
    }

    setLoading(false);
    setOpenPopup(true);
  };

  if (!totalPrice) {
    navigate(-1);
    return null;
  }

  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
        minHeight: '100vh', 
        py: 4 
      }}
    >
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={12} 
              sx={{ 
                p: 4, 
                borderRadius: '20px', 
                background: 'white', 
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                }
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1a365d', 
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Order Summary
              </Typography>

              <Card 
                sx={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 20px rgba(0,0,0,0.08)' 
                }}
              >
                {images && images.length > 0 && (
                  <CardMedia
                    component="img"
                    height="350"
                    image={`${api}/${images[0]}`}
                    alt={accessoryInfo}
                    sx={{ 
                      objectFit: 'cover', 
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                )}
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#2d3748',
                      mb: 2
                    }}
                  >
                    {accessoryInfo}
                  </Typography>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      py: 1,
                      px: 2,
                      bgcolor: '#f7fafc',
                      borderRadius: '10px'
                    }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      Quantity
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {quantity}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      py: 1,
                      px: 2,
                      bgcolor: '#e6f2ff',
                      borderRadius: '10px'
                    }}
                  >
                    <Typography variant="h6" color="primary">
                      Total Amount
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="primary">
                      PKR {totalPrice}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Payment Form */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={12} 
              sx={{ 
                p: 4, 
                borderRadius: '20px', 
                background: 'white', 
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                }
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700, 
                  color: '#1a365d', 
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                Payment Details
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mb: 4 
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<CreditCardIcon />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: '12px',
                      borderColor: '#2c3e50',
                      color: '#2c3e50',
                      '&:hover': {
                        bgcolor: '#f0f4f8',
                        borderColor: '#1a365d'
                      }
                    }}
                  >
                    Credit Card
                  </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom 
                    sx={{ 
                      color: '#2d3748', 
                      fontWeight: 600, 
                      mb: 1 
                    }}
                  >
                    Enter Card Details
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      borderRadius: '12px', 
                      border: '2px solid #e2e8f0' 
                    }}
                  >
                    <CardElement options={cardElementOptions} />
                  </Paper>
                </Box>

                {paymentError && (
                  <Typography 
                    color="error" 
                    textAlign="center" 
                    sx={{ mb: 2, fontWeight: 500 }}
                  >
                    {paymentError}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || !stripe}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    bgcolor: '#1a365d',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    '&:hover': {
                      bgcolor: '#2c3e50',
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#a0aec0',
                      color: 'white'
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    `Pay PKR ${totalPrice}`
                  )}
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Payment Status Dialog */}
      <Dialog 
        open={openPopup} 
        onClose={() => setOpenPopup(false)} 
        PaperProps={{
          sx: {
            borderRadius: '20px',
            p: 2
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 2 
          }}
        >
          {paymentStatus?.success ? (
            <CheckCircleIcon color="success" fontSize="large" />
          ) : (
            <ErrorIcon color="error" fontSize="large" />
          )}
          <Typography variant="h6" fontWeight={600}>
            {paymentStatus?.success ? "Payment Success" : "Payment Failed"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography 
            variant="body1" 
            textAlign="center" 
            sx={{ color: '#4a5568' }}
          >
            {paymentStatus?.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button 
            onClick={() => setOpenPopup(false)} 
            variant="contained"
            sx={{
              borderRadius: '10px',
              bgcolor: '#1a365d',
              '&:hover': {
                bgcolor: '#2c3e50'
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;