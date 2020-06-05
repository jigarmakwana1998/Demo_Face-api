// let selectedFaceDetector = SSD_MOBILENETV1
let minConfidence = 0.5
let flag = 0

let kernelNumber = 0
function getFaceDetectorOptions() {
  return  new faceapi.SsdMobilenetv1Options({ minConfidence })
}

async function auto_update(){
  update = setInterval(onIncreaseMinConfidence,400)
  if (flag > 0){
    flag = 0
    kernelNumber = 0
    $('#kernelNumber').val(kernelNumber)
  }
  
  if(flag < 1 && $('#kernelNumber').val() > 62){
    flag = 1
  }
  console.log(flag)
  updateResults()
}

function onIncreaseMinConfidence() {
  kernelNumber = (kernelNumber + 1)% 64
  // kernelNumber = Math.min(faceapi.utils.round(kernelNumber + 1), 63)
  $('#kernelNumber').val(kernelNumber)
  updateResults()
}

function onDecreaseMinConfidence() {
  kernelNumber = Math.max(faceapi.utils.round(kernelNumber - 1), 0)
  $('#kernelNumber').val(kernelNumber)
  updateResults()
}
function getCurrentFaceDetectionNet() {
    return faceapi.nets.ssdMobilenetv1
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function loadFaceDetector() {
  $('#loader').show()
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('/')
  }
  $('#loader').hide()
}