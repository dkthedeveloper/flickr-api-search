import { constructSearchURL, getPhotoArray, incrementPhotoIndex, decrementPhotoIndex, arrayOfPhotos, photoIndex } from "./API.js";
const mainElement = document.querySelector('main');
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const photoDiv = document.getElementById('photos');
const refreshBtn = document.getElementById('refresh');
searchInput.focus();

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
};

export function renderInitialImages (e) {
    e.preventDefault();
    photoDiv.innerHTML = '';
    getPhotoArray(constructSearchURL(searchInput));
}

searchForm.addEventListener('submit', renderInitialImages);
refreshBtn.addEventListener('click', () => window.location.reload());
document.addEventListener('keypress', function(e) {
    if (e.key === 'ArrowLeft') {
        displayPreviousPhoto()
    }
    else if (e.key == 'ArrowRight') {
        displayNextPhoto()
    }
});

function displayNextPhoto () {
    photoDiv.innerHTML = '';
    if (photoIndex < (arrayOfPhotos.length - 1)) {
    incrementPhotoIndex(1);
    displayPhoto(arrayOfPhotos[photoIndex])
    } else {
        incrementPhotoIndex(0);
        displayPhoto(arrayOfPhotos[photoIndex]) 
    }
};

function displayPreviousPhoto () {
    photoDiv.innerHTML = '';
    if (photoIndex > 0) {
    decrementPhotoIndex(1);
    displayPhoto(arrayOfPhotos[photoIndex])
    } else if (photoIndex === 0) {
        incrementPhotoIndex((arrayOfPhotos.length - 1));
        displayPhoto(arrayOfPhotos[photoIndex]) 
    }
};

export function displayPhoto (photoObj) {
    let containerElement = document.createElement('div');
        containerElement.classList.add('containerDiv');
    let photoElement = document.createElement('img');
        photoElement.src = constructImageURL(photoObj);
    let arrowLeft = document.createElement('div');
        arrowLeft.classList.add('arrow');
        arrowLeft.classList.add('left')
    let arrowLeftTop = document.createElement('div');
        arrowLeftTop.classList.add('arrow-top');
    let arrowLeftBottom = document.createElement('div');
        arrowLeftBottom.classList.add('arrow-bottom');
        arrowLeft.append(arrowLeftTop, arrowLeftBottom);
    let arrowRight = document.createElement('div');
        arrowRight.classList.add('arrow');
        arrowRight.classList.add('right')
    let arrowRightTop = document.createElement('div');
        arrowRightTop.classList.add('arrow-top');
    let arrowRightBottom = document.createElement('div');
        arrowRightBottom.classList.add('arrow-bottom');
        arrowRight.append(arrowRightTop, arrowRightBottom);
    let link = document.createElement('a');
        link.innerText = 'Go to photo';
        link.href = photoElement.src;
        link.target = '_blank';
        containerElement.append(photoElement, link);
        photoDiv.append(arrowLeft);
        photoDiv.append(containerElement);
        photoDiv.append(arrowRight);
        arrowRight.addEventListener('click', displayNextPhoto);
        arrowLeft.addEventListener('click', displayPreviousPhoto);   
    };
    

    document.addEventListener('keydown', function(e) {
         // https://stackoverflow.com/a/41303865
        if (e.key === 'ArrowLeft') {
            displayPreviousPhoto()
        }
        else if (e.key == 'ArrowRight') {
            displayNextPhoto()
        }
    });
