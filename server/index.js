
import { ApiClient } from '@auth0/auth0-api-js';
import express from 'express';
import cors from 'cors';

const app = express();

// This enables CORS for all routes and all origins
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/obo-flow', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'accessToken is required' });
  }
  
  const apiClient = new ApiClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUTH0_API_AUDIENCE,
  });

  const downstreamAccessToken = await apiClient.getTokenOnBehalfOf(accessToken, {
    audience: process.env.AUTH0_DOWNSTREAM_API_AUDIENCE,
    // scope: 'read:private',  // Optional
  });

  res.json({
    success: true,
    accessToken: accessToken,
    downstreamAccessToken: downstreamAccessToken
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
