import Geocode from "react-geocode"

function locationName(loca) {
Geocode.setApiKey("AIzaSyAHQuKM8CJILEMZStXdXMO1RtJebhhoIJ8");
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");
  Geocode.enableDebug();

  let name;

const lat = loca.split(",")[0]
const long = loca.split(",")[1]

  Geocode.fromLatLng(lat, long).then(
    (response) => {
      name = response.plus_code.compound_code
        .split(" ")
        .slice(1)
        .join(" ");
    },
    (error) => {
      console.error(error);
    }
  );
  return name
}

// const input = "13.1345,54.2343"

exports.locationName = locationName