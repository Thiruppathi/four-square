# Four Square

Web application that uses the Foursquare API to get venues based on location, preferences.

## Features Implemented

- Get the user location and show a list of available venues.
- Decide which venues and details are relevant to the user.
- Give the user the ability to adjust some search parameters (e.g. location, radius, venue types)
- Locating User Location based on GeoLocation API, which can be used for receommnding places based on current location.

* Location AutoComplete(Maps API) Feature enabled on Location field, for better UX.
* In the Venue Details Page, the following venue details are dispalyed
  - Places similiar to venue
  - Photo of the venue
  - Google Map Location (Static Image)
  - Address of the Venue
  - Description or Website of the Venue, based on API Response
  - Stats such as Tips Count, Likes Count etc

Priority was given to code quality & architecture in general, so that implementing a new API Call or adding a new UI Component shouldn't require much additional work. After all the idea was to develop an application using FourSquare API within 5 hours. The core functional work was completed in 5 hours. As I had the freedom to develop UI/UX, I spent extra hours to shape up the UX/UI.

Here are the features I initially intended to do, but didn't do due to time constraint.

- User Login/Registration
- PWA - I started with manifest.json & App Icons, but dint proceed further. Reason: Priority! 🙂
- UI Testing - using [Cypress.io](https://www.cypress.io/).
- API Testing - I've made use of **Try it now** option in [FourSquare API](https://developer.foursquare.com/docs/api/getting-started) which was helping in testing the JSON Response, so I've not written any API Test cases for API Testing.

## Demo Videos

- [Demo 1: Show Venues For Given Location](https://youtu.be/mfRo2okyzTw)
- [Demo 2: Show Locations Based on User Choice on Category & Location](https://youtu.be/vePZcJFRV2U)

## Light House Reports

To check the quality, performance, a11y, best practices of the application, I've used Light House.
My Target was 80+ score in each area; I've achieved 90+ in all areas except PWA.

[Landing Page Report](https://bit.ly/fs-landing-report)

![Lighthouse score: 93/100](https://lighthouse-badge.appspot.com/?score=93&compact&category=Performance)
![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=A11y)
![Lighthouse score: 94/100](https://lighthouse-badge.appspot.com/?score=94&compact&category=BestPractices)
![Lighthouse score: 89/100](https://lighthouse-badge.appspot.com/?score=89&compact&category=SEO)
![Lighthouse score: 73/100](https://lighthouse-badge.appspot.com/?score=73&compact&category=PWA)

[Search-Venues Report](https://bit.ly/fs-search-report)

![Lighthouse score: 96/100](https://lighthouse-badge.appspot.com/?score=96&compact&category=Performance)
![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=A11y)
![Lighthouse score: 94/100](https://lighthouse-badge.appspot.com/?score=94&compact&category=BestPractices)
![Lighthouse score: 89/100](https://lighthouse-badge.appspot.com/?score=89&compact&category=SEO)
![Lighthouse score: 73/100](https://lighthouse-badge.appspot.com/?score=73&compact&category=PWA)

[Search Results Reprot](https://bit.ly/fs-search-results-report)

![Lighthouse score: 98/100](https://lighthouse-badge.appspot.com/?score=98&compact&category=Performance)
![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=A11y)
![Lighthouse score: 94/100](https://lighthouse-badge.appspot.com/?score=94&compact&category=BestPractices)
![Lighthouse score: 89/100](https://lighthouse-badge.appspot.com/?score=89&compact&category=SEO)
![Lighthouse score: 73/100](https://lighthouse-badge.appspot.com/?score=73&compact&category=PWA)

[Venue Details Report](https://bit.ly/fs-venue-report)

![Lighthouse score: 99/100](https://lighthouse-badge.appspot.com/?score=99&compact&category=Performance)
![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&compact&category=A11y)
![Lighthouse score: 94/100](https://lighthouse-badge.appspot.com/?score=94&compact&category=BestPractices)
![Lighthouse score: 89/100](https://lighthouse-badge.appspot.com/?score=89&compact&category=SEO)
![Lighthouse score: 73/100](https://lighthouse-badge.appspot.com/?score=73&compact&category=PWA)

Overall for the time spent, I think I've produced a decent MVP to start with. 🙂

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

## FourSquare Endpoints Used

I've used Regular(Free Developer Version) Endpoints instead of Premium due to the cost involved.

- [Search for Venues](https://developer.foursquare.com/docs/api/venues/search)
- [Get Details of a Venue](https://developer.foursquare.com/docs/api/venues/details)
- [Get Similar Venues](https://developer.foursquare.com/docs/api/venues/similar)

## Other APIs Used

- [Google Map API](https://console.cloud.google.com/google/maps-apis)

## Technology Stack

- **Front-End**
  - ES6+, Sass(CSS Preprocessor), Pug Templates,
- **Back-End**
  - Node, ExpressJS
- **Task Runners, Build Process & Development Workflow**
  - Webpack, Prettier
- **Source Control**
  - GitHub
- **IDE & Dev Tools**
  - VS Code
  - LightHouse
  - Chrome Dev Tools
- **Deployment & Hosting**
  - [Zeit-Now](https://zeit.co/now)
- **Icons Credits**
  - [Flaticon](https://www.flaticon.com/)

## FAQ

### The Google Maps API key isn't working

You might have hit a limit with the API key — if this is the case you need to sign up for your own API key over at <https://developers.google.com/maps/documentation/javascript/usage>.
You will need to enable static maps for your API key.

Once you have the API key, simply place it in your `variables.env` file and restart.

### Four Square API Quota Exceeded!

This application runs using basic version of FourSquare API for developers, which restricts the number of premium calls.
If you encounter this error, Create a new set of CLIENT_ID & CLIENT_SECRET keys from Foursquare and try again.

### Why not a fancy framework (React/Vue/Angular)?

Introducing React, Redux, ReduxThunk, MiddleWare would be a overkill. So Proceeded with simple ES6 using pug templates.
