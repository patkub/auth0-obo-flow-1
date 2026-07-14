# auth0-sample-vanilla-js-id-access-tokens

Auth0 sample vanilla JavaScript app which displays ID and Access tokens

# Setup

Create `.env.local` with:
```bash
# Auth0 tenant domain
VITE_AUTH0_DOMAIN=
# My App SPA CLIENT_ID
VITE_AUTH0_CLIENT_ID=
# Resource server API audience for OBO Flow API 1
VITE_API_IDENTIFIER_URI=
# Endpoint for OAuth 2.0 Token Exchange ("On-Behalf-Of") flow.
VITE_OBO_FLOW_ENDPOINT=http://localhost:3000/obo-flow
```

Run
```
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)
