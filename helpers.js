/*
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require("fs");

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${
    process.env.MAP_KEY
  }&markers=${lat},${lng}&scale=2`;

// inserting an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.categoryIcon = venue => {
  if (
    venue.categories[0] &&
    venue.categories[0].icon.prefix &&
    venue.categories[0].icon.suffix
  ) {
    return `${venue.categories[0].icon.prefix}64${
      venue.categories[0].icon.suffix
    }`;
  } else {
    return "/images/icons/map.svg";
  }
};

exports.getAddress = venue => {
  return (
    venue.location.crossStreet ||
    venue.location.address ||
    venue.location.city ||
    venue.location.country
  );
};

// Some details about the site
exports.siteName = `Foure Square`;

// This is how the nav menu is built.
exports.menu = [
  { slug: "/search-venues", title: "Search", icon: "search" },
  { slug: "/explore", title: "Explore", icon: "near-me", id: "explore" }
];
