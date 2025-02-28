const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51QT2UiLNc1e6h3y0cc5bF0LeTxmiT6o7QZ9zk3v4FQrrDoEtYIGxyLR62dKV7InoGSKosEjArw5y6KF4zYXn5hN500w5HHv9D1"); // Your Stripe Secret Key


router.post('/create-payment-intent', async (req, res) => {
  try {
      const amount = req.body.amount;
      if (!amount || amount <= 0) {
          return res.status(400).json({ error: 'Invalid amount' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
      });

      res.json({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message || 'Failed to create payment intent' });
  }
});


module.exports = router;