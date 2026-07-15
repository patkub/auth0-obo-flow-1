# server

Exposes an endpoint `http://localhost:3000/obo-flow` which takes an accessToken in the body. The server uses this accessToken to get a new accessToken for the second API (downstream API).

# Setup

Reference `.env.example` and create `.env` with:
```bash
# Allow requests from the specified origins
ALLOWED_ORIGINS=http://localhost:5173

# Auth0 tenant domain
AUTH0_DOMAIN=
# obo-flow-api-1 Custom API Client CLIENT_ID
AUTH0_CLIENT_ID=
# obo-flow-api-1 Custom API Client CLIENT_SECRET
AUTH0_CLIENT_SECRET=

# Resource server API audience for OBO Flow API 1
AUTH0_API_AUDIENCE=https://obo-flow-api-1/
# Resource server API audience for downstream API, OBO Flow API 2
AUTH0_DOWNSTREAM_API_AUDIENCE=https://obo-flow-api-2/
# Optional scopes for downstream API, OBO Flow API 2
#AUTH0_DOWNSTREAM_API_SCOPES="read:books"
```

Run
```
npm install
npm run start
```
