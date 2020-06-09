const video = document.getElementById("inputVideo")

// const container = document.createElement('div')
// container.style.position = 'relative'
// document.body.append(container)
// container.append(video)

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('models')
]).then(startVideo)

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.srcObject = stream
}

const width = 256, height = 256;
const canvas2 = document.getElementById('canvas2'), ctx2 = canvas2.getContext('2d');
canvas2.width = width, canvas2.height = height;
const idata2 = ctx2.createImageData(width, height);

const canvas26 = document.getElementById('canvas26'), ctx26 = canvas26.getContext('2d');
canvas26.width = width, canvas26.height = height;
const idata26 = ctx26.createImageData(width, height);

const canvas42 = document.getElementById('canvas42'), ctx42 = canvas42.getContext('2d');
canvas42.width = width, canvas42.height = height;
const idata42 = ctx42.createImageData(width, height);

const canvas55 = document.getElementById('canvas55'), ctx55 = canvas55.getContext('2d');
canvas55.width = width, canvas55.height = height;
const idata55 = ctx55.createImageData(width, height);

const canvas60 = document.getElementById('canvas60'), ctx60 = canvas60.getContext('2d');
canvas60.width = width, canvas60.height = height;
const idata60 = ctx60.createImageData(width, height);

const canvas = document.getElementById('overlay');
canvas.width = 640, canvas.height = 480;
const displaySize = { width: video.width, height: video.height }

video.addEventListener('play', () => {
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());

    grayScale = await faceapi.nets.ssdMobilenetv1.getGrayScale();
    idata2.data.set(grayScale[0]);
    ctx2.putImageData(idata2, 0, 0);

    idata26.data.set(grayScale[1]);
    ctx26.putImageData(idata26, 0, 0);

    idata42.data.set(grayScale[2]);
    ctx42.putImageData(idata42, 0, 0);
    
    idata55.data.set(grayScale[3]);
    ctx55.putImageData(idata55, 0, 0);
    
    idata60.data.set(grayScale[4]);
    ctx60.putImageData(idata60, 0, 0);
    
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);

  }, 100)
})