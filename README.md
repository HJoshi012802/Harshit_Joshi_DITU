### Check Current Location

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

### Check Permissions

  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      console.log("Location")
    } else if (result.state === "prompt") {
      console.log("Location Not")
    }
    // Don't do anything if the permission was denied.
  });

  ### Watch geoLocation
  
let id;
let target;
let options;

function success(pos) {
  const crd = pos.coords;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log("Congratulations, you reached the target");
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

target = {
  latitude: 30.288436,
  longitude: 78.06891,
};

### Time Zone

  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

id = navigator.geolocation.watchPosition(success, error, options);
