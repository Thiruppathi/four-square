const axios = require("axios");
require("dotenv").config({ path: "../variables.env" });
const client_id = process.env.FOUR_SQUARE_CLIENT_ID;
const client_secret = process.env.FOUR_SQUARE_CLIENT_SECRET;
const v = "20180526";

exports.landing = (req, res) => {
  res.render("landing", { title: "Find places nearby" });
};

exports.renderSearchVenues = (req, res) => {
  res.render("search-venues", { title: "Search Venues" });
};

exports.getVenues = async (req, res) => {
  let { near = "", category, lat, lng, radius } = req.query;
  console.log(req.query);
  let ll = lat && lng ? `${lat},${lng}` : "";
  let url = getUrl(ll, category, near);
  let result = await axios(url);
  let venues = result.data.response.venues;
  let noResults = venues.length === 0;
  res.render("search-venues", {
    title: "Results",
    venues,
    near,
    category,
    lat,
    lng,
    radius,
    noResults
  });
};

exports.getVenueById = async (req, res, next) => {
  let venueId = req.params.venueId;
  const result = await axios(getVenueByIdUrl(venueId));
  let venue = result.data.response.venue;
  let similarVenues = await this.getSimilarVenuesList(venue.id);
  console.log("----- ", similarVenues, similarVenues.length);
  res.render("venue", {
    venue,
    title: venue.name,
    photoUrl: getPhoto(venue),
    similarVenues
  });
};

exports.getSimilarVenues = async (req, res) => {
  let venueId = req.params.venueId;
  const result = await axios(getSimilarVenueUrl(venueId));
  let venues = result.data.response.similarVenues.items;
  console.log("similar length: ", venues.length);
  res.json({ venues });
};

exports.getSimilarVenuesList = async venueId => {
  const result = await axios(getSimilarVenueUrl(venueId));
  let venues = result.data.response.similarVenues.items;
  console.log("similar length: ", venues.length);
  return venues;
};

exports.explore = async (req, res) => {
  res.json({ success: "Explore" });
};

function getUrl(ll, query, near) {
  const url = "https://api.foursquare.com/v2/venues/search?";
  const params = { v, query, near, client_id, client_secret };
  if (ll) {
    params["ll"] = ll;
  }
  return { url, params };
}

function getVenueByIdUrl(venueId) {
  const url = `https://api.foursquare.com/v2/venues/${venueId}?`;
  const params = { v, client_id, client_secret };
  return { url, params };
}

function getSimilarVenueUrl(venueId) {
  const url = `https://api.foursquare.com/v2/venues/${venueId}/similar?`;
  const params = { v, client_id, client_secret };
  return { url, params };
}

function getPhoto(venue) {
  if (
    venue.photos.count &&
    venue.photos.groups[0] &&
    venue.photos.groups[0].items[0]
  ) {
    let photo = venue.photos.groups[0].items[0];
    let { prefix, suffix, width, height } = photo;
    return `${prefix}${width}x${height}${suffix}`;
  } else {
    return "/images/broken-image.png";
  }
}
