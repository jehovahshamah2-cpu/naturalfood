const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/auth');

const PI_API_BASE = 'https://api.minepi.com/v2';
const PI_API_KEY = process.env.PI_NETWORK_API_KEY;

// POST /api/payments/complete – called by onIncompletePaymentFound (client)
router.post('/complete', authMiddleware, async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) return res.status(400).json({ error: 'Missing paymentId' });

    // Verify the payment
    const { data: payment } = await axios.get(`${PI_API_BASE}/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${req.piUser.accessToken}` }
    });
    if (payment.user_uid !== req.piUser.uid) {
      return res.status(403).json({ error: 'Payment does not belong to this user' });
    }

    // Approve then complete via server-to-server
    await axios.post(`${PI_API_BASE}/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    });
    const { data: completed } = await axios.post(`${PI_API_BASE}/payments/${paymentId}/complete`, {
      txid: payment.transaction?.txid
    }, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    });

    // Delivery of product (simplified – in production update DB)
    res.json({ status: 'completed', payment: completed });
  } catch (err) {
    console.error('Payment completion error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment completion failed' });
  }
});

// Server-side approval
router.post('/approve', async (req, res) => {
  try {
    const { paymentId } = req.body;
    await axios.post(`${PI_API_BASE}/payments/${paymentId}/approve`, {}, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    });
    res.json({ status: 'approved' });
  } catch (err) {
    console.error('Approve error:', err.message);
    res.status(500).json({ error: 'Approval failed' });
  }
});

// Server-side completion
router.post('/complete-server', async (req, res) => {
  try {
    const { paymentId, txid } = req.body;
    await axios.post(`${PI_API_BASE}/payments/${paymentId}/complete`, { txid }, {
      headers: { Authorization: `Key ${PI_API_KEY}` }
    });
    res.json({ status: 'completed' });
  } catch (err) {
    console.error('Complete error:', err.message);
    res.status(500).json({ error: 'Completion failed' });
  }
});

module.exports = router;