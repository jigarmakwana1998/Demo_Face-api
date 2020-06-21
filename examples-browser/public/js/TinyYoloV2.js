const inputSize = 512
const scoreThreshold = 0.2

function getFaceDetectorOptions() {
  return  new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function getCurrentFaceDetectionNet() {
    return faceapi.nets.tinyFaceDetector
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

async function loadFaceDetector() {
  $('#loader').show()
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().load('../weights')
  }
  $('#loader').hide()
}