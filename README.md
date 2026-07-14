# Auth0 On-Behalf-Of (OBO) Token Exchange

On-Behalf-Of (OBO) token exchange to enable middle-tier services to preserve user identity and permissions when calling downstream APIs.

The client sends a POST request to `http://localhost:3000/obo-flow` with accessToken for the first API in the body. The server uses this accessToken to get a new accessToken for the second API (downstream API).

Access Token:

```
{
  "myAccessTokenClaim": "myValue",
  "iss": "https://dev-5gm1mr1z8nbmuhv7.us.auth0.com/",
  "sub": "auth0|6985132071f9fb6d9bce29b8",
  "aud": "https://obo-flow-api-2/",
  "iat": 1783996193,
  "exp": 1784082593,
  "act": {
    "sub": "Xk51p6Gr0QJGx8TS3fbfWaPjG2Aja4pD",
    "act": {
      "sub": "7QJm25lYoRzYk55gQzkrAHeDi4OH6Oup"
    }
  },
  "azp": "Xk51p6Gr0QJGx8TS3fbfWaPjG2Aja4pD"
}
```
