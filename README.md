# Four Square

## Installation & Pre-requisites

### 1. Installation

```bash
npm install
```

### 2. Setup API Keys

Rename `variables.env.sample` to `variables.env` and update the following keys.

```
MAP_KEY=<Insert API Key from Google Maps>
FOUR_SQUARE_CLIENT_ID=<Insert Client Id from FourSquare>
FOUR_SQUARE_CLIENT_SECRET=<Insert Client Secret from FourSquare>
```

Skipping this step would cause a `Type Error` while rendering the `pug` templates.

### How to run the application

```bash
npm run dev
```

## FAQ

### The Google Maps API key isn't working

You might have hit a limit with the API key — if this is the case you need to sign up for your own API key over at <https://developers.google.com/maps/documentation/javascript/usage>.
You will need to enable static maps for your API key.

Once you have the API key, simply place it in your `variables.env` file and restart.

### Four Square API Quota Exceeded!

This application runs using basic version of FourSquare API for developers, which restricts the number of premium calls.
If you encounter this error, Create a new set of CLIENT_ID & CLIENT_SECRET keys from Foursquare and try again.
