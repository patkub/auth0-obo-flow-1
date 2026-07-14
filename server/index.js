
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

/**
 * POST /obo-flow
 *
 * Exchanges a user's access token for a downstream access token using the
 * OAuth 2.0 Token Exchange ("On-Behalf-Of") flow via Auth0. This allows the
 * server to call a separate downstream API on behalf of the authenticated
 * user, without the user needing to re-authenticate.
 *
 * @route POST /obo-flow
 *
 * @param {Object} req.body
 * @param {string} req.body.accessToken - The user's original access token
 *   (e.g. issued for this API's audience). Required.
 *
 * @returns {200} JSON
 *   {
 *     success: true,
 *     accessToken: string,           // the original access token passed in
 *     downstreamAccessToken: string  // new token scoped to AUTH0_DOWNSTREAM_API_AUDIENCE,
 *                                    // usable to call the downstream API on the user's behalf
 *   }
 *
 * @returns {400} JSON { error: 'accessToken is required' }
 *   Returned when accessToken is missing from the request body.
 *
 * @returns {502} JSON { error: 'Failed to exchange token' }
 *   Returned when the Auth0 token exchange fails (e.g. invalid/expired
 *   accessToken, misconfigured client credentials, or the downstream
 *   audience not being authorized for this exchange).
 *
 * @requires process.env.AUTH0_DOMAIN
 * @requires process.env.AUTH0_CLIENT_ID
 * @requires process.env.AUTH0_CLIENT_SECRET
 * @requires process.env.AUTH0_API_AUDIENCE
 * @requires process.env.AUTH0_DOWNSTREAM_API_AUDIENCE
 */
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

  try {
    const downstreamAccessToken = await apiClient.getTokenOnBehalfOf(accessToken, {
      audience: process.env.AUTH0_DOWNSTREAM_API_AUDIENCE,
      // scope: 'read:private',  // Optional
    });

    res.json({
      success: true,
      accessToken: accessToken,
      downstreamAccessToken: downstreamAccessToken,
    });
  } catch (err) {
    console.error('Token exchange failed:', err);
    res.status(502).json({ error: 'Failed to exchange token' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
