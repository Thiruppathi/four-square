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
  let { near = "", category, lat, lng } = req.query;
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
    noResults
  });
};

exports.getVenueById = async (req, res, next) => {
  let venueId = req.params.venueId;
  const result = await axios(getVenueByIdUrl(venueId));
  let venue = result.data.response.venue;
  res.render("venue", {
    venue,
    title: venue.name,
    photoUrl: getPhoto(venue)
  });
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
