let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photosButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then((stream) => {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
