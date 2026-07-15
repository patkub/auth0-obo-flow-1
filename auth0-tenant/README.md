# auth0-tenant

Auth0 tenant configuration.

## Dev Setup

Prerequisites: [Node.js v22 LTS](https://nodejs.org/en/download)

Install dependencies

```bash
npm install
```

Lint
- `npm lint` - Lint with biome and apply changes
- `npm lint:check` - Check linting with biome
- `npm format` - Format with biome and apply changes
- `npm format:check` - Check formatting with biome

Run tests
- `npm test` - Run unit tests
- `npm test:watch` - Automatically re-run tests when files change

## Deploy

Copy auth0 config from `auth0-config.json.example` to `auth0-config.json` and fill out details using Machine to Machine client.

Deploy Auth0 configuration.
```bash
npm run deploy
```
