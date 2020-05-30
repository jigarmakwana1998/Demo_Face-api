const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

const viewsDir = path.join(__dirname, 'views')
app.use(express.static(viewsDir))
app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './weights')))
app.use(express.static(path.join(__dirname, './dist')))

app.get('/', (req, res) => res.redirect('/webcam_face_detection'))
app.get('/webcam_face_detection', (req, res) => res.sendFile(path.join(viewsDir, 'webcamFaceDetection.html')))
app.listen(3000, () => console.log('Listening on port 3000!'))