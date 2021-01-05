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

const context = canvas.getContext('2d');

// Access Webcam
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

video.addEventListener('canplay', (e) => {
  if (!streaming) {
    // set video canvas height
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

photosButton.addEventListener('click', (e) => {
  e.preventDefault();

  takePicture();
}, false);

photoFilter.addEventListener('change', (e) => {
  e.preventDefault();
  
  filter = e.target.value;
  video.style.filter = filter;
});

clearButton.addEventListener('click', (e) => {
  photos.innerHTML = '';
  filter = 'none';
  video.style.filter = filter;
  photoFilter.selectedIndex = 0;
});

function takePicture() {
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
  }

  context.filter = filter;
  context.drawImage(video, 0, 0, width, height);
  
  const imgUrl = canvas.toDataURL('image/png');
  const img = document.createElement('img');
  img.setAttribute('src', imgUrl);
  // img.style.filter = filter;

  photos.appendChild(img);
}