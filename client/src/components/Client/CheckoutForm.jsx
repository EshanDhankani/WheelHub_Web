import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Box, Typography } from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ totalPrice, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!stripe || !elements) return;
    setPaymentError(null); 
  }, [stripe, elements]);

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
              name: "Test User", // Replace with actual user data
              email: "test@example.com", // Replace with actual user data
            },
          },
        }
      );

      if (error) {
        console.error(error);
        setPaymentError(error.message); // Display the error message
      } else if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        alert("Payment successful!");
      }
    } catch (error) {
      setPaymentError("Payment confirmation failed");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Complete Your Payment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ padding: 2 }}>
          <CardElement />
        </Box>

        {paymentError && (
          <div style={{ color: "red" }}>
            <Typography variant="body2" color="error">
              {paymentError}
            </Typography>
          </div>
        )}

        {paymentSuccess && (
          <div style={{ color: "green" }}>
            <Typography variant="body2" color="success">
              Payment successful!
            </Typography>
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !stripe || !clientSecret}
        >
          {loading ? <CircularProgress size={24} /> : "Pay Now"}
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
