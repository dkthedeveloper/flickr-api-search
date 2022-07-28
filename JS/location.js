let userLatitude;
let userLongitude;
const defaultLattitude = 40.7648;   // New York City coordinates
const defaultLongitude = -73.9808;


// https://www.javascripttutorial.net/web-apis/javascript-geolocation/
function getUserLocation () {
    if (!navigator.geolocation) {
        console.error(`Your browser doesn't support Geolocation`);
        onError()
    }  else {
       console.log('your browser supports Geo!')
       navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }   
};


// handle success case
function onSuccess(position) {
    console.log(position.coords)
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    return position.coords;
};

// handle error case
function onError() {
    console.log(`Failed to get your location!`);
    userLatitude = defaultLattitude;
    userLongitude = defaultLongitude;
};

export { userLatitude, userLongitude, getUserLocation }