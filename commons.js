const video = document.getElementById("inputVideo")

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('models')
]).then(startVideo)

async function startVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.srcObject = stream
}

kernel = 0
layer = null
function displayGrayScale() {
  return new Promise(function (resolve, reject) { 
    setInterval(async function () { 
      layer_kernel = layer.slice(kernel, kernel + 1)[0];
      document.getElementById("kernel").innerHTML = kernel;
  
      grayScale = await faceapi.nets.ssdMobilenetv1.getGrayScale(layer_kernel);
      idata.data.set(grayScale);
      ctx.putImageData(idata, 0, 0);
      kernel = (kernel + 1) % 64;
    resolve(); 
    }, 500); 
  }) 
}

const width = 256, height = 256;
const canvas1 = document.getElementById('canvas'), ctx = canvas1.getContext('2d');
canvas1.width = width, canvas1.height = height;
const idata = ctx.createImageData(width, height);
const container = document.createElement('div')
container.style.position = 'relative'
document.body.append(container)
container.append(video)

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  container.append(canvas);

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options());

    layer = await faceapi.nets.ssdMobilenetv1.getConvLayer();

    await displayGrayScale();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);

  }, 1000)
})