function getCurrentLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve(pos.coords.latitude + "," + pos.coords.longtitude);
    });
  });
}

exports.getCurrentLocation = getCurrentLocation;
