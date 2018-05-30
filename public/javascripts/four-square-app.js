// All Front-End logic modules goes here.
import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";
import { getLngLat, getAddressFromLatLng } from "./modules/reverseGeoCode";

autocomplete($("#near"), $("#lat"), $("#lng"));
autocomplete($("#headerSearch"), $("#lat"), $("#lng"));

function getMyCurrentLocation() {
  var startPos;
  var nudge = $("#nudge");
  var nudgeInfo = $("#nudgeInfo");

  var nudgeSuccess = $("#nudgeSuccess");
  var nudgeSuccessInfo = $("#nudgeSuccessInfo");

  nudge.style.display = "block";
  nudgeInfo.innerHTML = "Locating you... Please enable location access! ";

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
    nudgeSuccess.style.display = "block";
  };

  var hideSuccessBanner = function() {
    nudgeSuccess.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);
    setTimeout(hideSuccessBanner, 5000);
    // Do magic with location
    startPos = position;
    if ($("#lat") && $("#lng")) {
      // set to hidden fields if required
      $("#lat").value = startPos.coords.latitude;
      $("#lng").value = startPos.coords.longitude;
    }

    localStorage.setItem(
      "fourSquareLatLng",
      JSON.stringify({
        lat: startPos.coords.latitude,
        lng: startPos.coords.longitude
      })
    );

    getAddressFromLatLng(getLngLat());
  };
  var geoError = function(error) {
    switch (error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        console.log(error);
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

var slider = $("#radius");
if (slider) {
  var output = $("#radiusLabel");
  output.innerHTML = slider.value; // Display the default slider value

  // Update the current slider value (each time you drag the slider handle)
  slider.oninput = function() {
    output.innerHTML = this.value;
    event.target.value = this.value;
  };
}

window.onload = function() {
  if (!localStorage.getItem("fourSquareLatLng")) {
    getMyCurrentLocation();
  }
};
