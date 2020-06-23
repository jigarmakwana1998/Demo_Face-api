const video = document.getElementById("inputVideo")

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models')
]).then(startVideo)

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.srcObject = stream
}

const width1 = 111, height1 = 111;
const width2 = 14, height2 = 14;
const canvas2 = document.getElementById('canvas2'), ctx2 = canvas2.getContext('2d');
const idata2 = ctx2.createImageData(width1, height1);

const canvas8 = document.getElementById('canvas8'), ctx8 = canvas8.getContext('2d');
const idata8 = ctx8.createImageData(width1, height1);

const canvas11 = document.getElementById('canvas11'), ctx11 = canvas11.getContext('2d');
const idata11 = ctx11.createImageData(width1, height1);

const canvas85 = document.getElementById('canvas85'), ctx85 = canvas85.getContext('2d');
const idata85 = ctx85.createImageData(width2, height2);

const canvas90 = document.getElementById('canvas90'), ctx90 = canvas90.getContext('2d');
const idata90 = ctx90.createImageData(width2, height2);

const canvas333 = document.getElementById('canvas333'), ctx333 = canvas333.getContext('2d');
const idata333 = ctx333.createImageData(width2, height2);

const canvas463 = document.getElementById('canvas463'), ctx463 = canvas463.getContext('2d');
const idata463 = ctx463.createImageData(width2, height2);

const canvas = document.getElementById('overlay');
canvas.width = 640, canvas.height = 480;
const displaySize = { width: video.width, height: video.height }

let inputSize = 224
let scoreThreshold = 0.2

video.addEventListener('play', () => {
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold }));

    grayScale = await faceapi.nets.tinyFaceDetector.getGrayScale()
    grayScale2 = await faceapi.nets.tinyFaceDetector.getGrayScale_conv11();
    idata2.data.set(grayScale[0]);
    ctx2.putImageData(idata2, 0, 0);

    idata8.data.set(grayScale[1]);
    ctx8.putImageData(idata8, 0, 0);

    idata11.data.set(grayScale[2]);
    ctx11.putImageData(idata11, 0, 0);
    
    idata85.data.set(grayScale2[0]);
    ctx85.putImageData(idata85, 0, 0);

    idata90.data.set(grayScale2[1]);
    ctx90.putImageData(idata90, 0, 0);

    idata333.data.set(grayScale2[2]);
    ctx333.putImageData(idata333, 0, 0);

    idata463.data.set(grayScale2[3]);
    ctx463.putImageData(idata463, 0, 0);
    
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);

  }, 100)
})