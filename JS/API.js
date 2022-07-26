import { userLatitude, userLongitude } from "./location.js";
import { displayPhoto, renderInitialImages } from "./view.js";
const apiKey = '?api_key=ac2a04c96db44bc20c8097976fa459cf';
const proxURL = 'https://shrouded-mountain-15003.herokuapp.com/'
const baseURL = 'https://flickr.com/services/rest/';
const searchInput = document.getElementById('search');
const endPoint = '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5'
let arrayOfPhotos
let photoIndex


export function constructSearchURL (input) {
    if (!input.value || input.value.length < 2) {
        alert('Please enter valid search term');
        return
    } else  {
    let searchTerm = input.value.toLocaleLowerCase();
    return new URL(`${proxURL}${baseURL}${apiKey}${endPoint}&${userLatitude}&${userLongitude}&text=${searchTerm}`, baseURL).toString();
    }
}

export function incrementPhotoIndex (increment) {
    if (increment === 1) {
    photoIndex += increment
    }   else if (increment === 0) {
        photoIndex = increment
    }   else {
        photoIndex = increment
    }
}
export function decrementPhotoIndex (increment) {
    if (increment === 1) {
    photoIndex -= increment
    }   else if (increment === 0) {
        photoIndex = increment
    }
}

// const flickrURL = constructSearchURL()
//console.log(flickrURL);
// https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=ac2a04c96db44bc20c8097976fa459cf&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=sky




export function getPhotoArray (url) {
let photoArr = [];
fetch(url)
    .then(results => results.json())
    .then((payload) => {
        photoIndex = 0;
        displayPhoto(payload.photos.photo[photoIndex]);
        arrayOfPhotos = payload.photos.photo})
   
};


export { arrayOfPhotos, photoIndex }
     