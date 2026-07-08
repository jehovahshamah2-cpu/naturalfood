const axios = require('axios');

const PI_API_BASE = 'https://api.minepi.com/v2';

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }
    const accessToken = authHeader.split(' ')[1];

    const { data } = await axios.get(`${PI_API_BASE}/me`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    req.piUser = {
      uid: data.uid,
      username: data.username,
      roles: data.roles,
      accessToken
    };
    next();
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return res.status(401).json({ error: 'Invalid or expired Pi token' });
    }
    console.error('Auth middleware error:', err.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
};