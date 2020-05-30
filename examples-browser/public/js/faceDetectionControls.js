// let selectedFaceDetector = SSD_MOBILENETV1
let minConfidence = 0.5

let kernelNumber = 0
function getFaceDetectorOptions() {
  return  new faceapi.SsdMobilenetv1Options({ minConfidence })
}

function onIncreaseMinConfidence() {
  kernelNumber = Math.min(faceapi.utils.round(kernelNumber + 1), 63)
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