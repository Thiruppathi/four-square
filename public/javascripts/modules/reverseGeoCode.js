let getLngLat = function() {
  return JSON.parse(localStorage.getItem("fourSquareLatLng"));
};

let getAddressFromLatLng = function(latlng) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: latlng }, function(results, status) {
    if (status === "OK") {
      if (results[0]) {
        console.info(
          "Successfully fetched current address!",
          results[0].formatted_address
        );
        let currentAddress = results[0].formatted_address;
        localStorage.setItem(
          "fourSquareAddress",
          JSON.stringify({ currentAddress })
        );
      } else {
        console.info("No results found");
      }
    } else {
      console.info("Geocoder failed due to: " + status);
    }
  });
};

export { getLngLat, getAddressFromLatLng };
