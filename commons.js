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

const width1 = 256, height1 = 256;
const width2 = 32, height2 = 32;
const canvas2 = document.getElementById('canvas2'), ctx2 = canvas2.getContext('2d');
const idata2 = ctx2.createImageData(width1, height1);

// const canvas26 = document.getElementById('canvas26'), ctx26 = canvas26.getContext('2d');
// const idata26 = ctx26.createImageData(width1, height1);

const canvas42 = document.getElementById('canvas42'), ctx42 = canvas42.getContext('2d');
const idata42 = ctx42.createImageData(width1, height1);

// const canvas55 = document.getElementById('canvas55'), ctx55 = canvas55.getContext('2d');
// const idata55 = ctx55.createImageData(width1, height1);

const canvas60 = document.getElementById('canvas60'), ctx60 = canvas60.getContext('2d');
const idata60 = ctx60.createImageData(width1, height1);

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

video.addEventListener('play', () => {
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());

    grayScale = await faceapi.nets.ssdMobilenetv1.getGrayScale();
    grayScale2 = await faceapi.nets.ssdMobilenetv1.getGrayScale_conv11();
    idata2.data.set(grayScale[0]);
    ctx2.putImageData(idata2, 0, 0);

    // idata26.data.set(grayScale[1]);
    // ctx26.putImageData(idata26, 0, 0);

    idata42.data.set(grayScale[2]);
    ctx42.putImageData(idata42, 0, 0);
    
    // idata55.data.set(grayScale[3]);
    // ctx55.putImageData(idata55, 0, 0);
    
    idata60.data.set(grayScale[4]);
    ctx60.putImageData(idata60, 0, 0);

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