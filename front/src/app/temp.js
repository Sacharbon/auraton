<template>
  <div class="face-recognition-container">
    <div class="loading-status" v-if="isLoading">
      Loading models... Please wait.
    </div>
    <div v-else>
      <div class="video-container">
        <video ref="videoElement" width="640" height="480" autoplay></video>
        <canvas ref="canvasElement" width="640" height="480"></canvas>
      </div>
      <div class="controls">
        <button @click="startVideo" :disabled="isVideoStarted">Start Camera</button>
        <button @click="stopVideo" :disabled="!isVideoStarted">Stop Camera</button>
        <input v-model="personName" placeholder="Enter person's name" />
        <button @click="addPerson" :disabled="!isVideoStarted || !personName">Add Person</button>
      </div>
      <div class="recognized-faces">
        <h3>Registered People:</h3>
        <ul>
          <li v-for="person in labeledDescriptors" :key="person.label">
            {{ person.label }}
            <button @click="removePerson(person.label)" class="remove-btn">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'
import mockDB from './mock_user_data.json'

const data = mockDB.map(profile => { 
  return new faceapi.LabeledFaceDescriptors(
    profile.label,
    profile.descriptors.map(d => new Float32Array(d))
  )
})

export default {
  name: 'FaceRecognition',
  data() {
    return {
      isLoading: true,
      isVideoStarted: false,
      videoStream: null,
      detectionInterval: null,
      personName: '',
      labeledDescriptors: data,
      faceMatcher: new faceapi.FaceMatcher(data, 0.6)
    }
  },
  async mounted() {
    try {
      console.log(mockDB)
      const MODEL_URL = '/models'
      
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
      console.log('Tiny Face Detector model loaded')
      
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL)
      console.log('Face Landmark model loaded')
      
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
      console.log('Face Recognition model loaded')
      
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      console.log('Face Expression model loaded')

      this.isLoading = false
      console.log('All models loaded successfully')
    } catch (error) {
      console.error('Error loading models:', error)
      alert('Error loading face recognition models. Please check console for details.')
    }
  },
  methods: {
    async startVideo() {
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            width: 640,
            height: 480,
            facingMode: 'user'
          }
        })
        this.$refs.videoElement.srcObject = this.videoStream
        this.isVideoStarted = true
        this.startDetection()
      } catch (error) {
        console.error('Error accessing camera:', error)
        alert('Could not access the camera. Please ensure you have granted camera permissions.')
      }
    },
    stopVideo() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop())
        this.videoStream = null
        this.isVideoStarted = false
        clearInterval(this.detectionInterval)
      }
    },
    async addPerson() {
      try {
        const video = this.$refs.videoElement
        
        // Use tiny face detector for better performance
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks(true)
          .withFaceDescriptor()

        if (detection) {
          const existingIndex = this.labeledDescriptors
            .findIndex(desc => desc.label === this.personName)

          if (existingIndex >= 0) {
            this.labeledDescriptors[existingIndex].descriptors.push(detection.descriptor)
          } else {
            this.labeledDescriptors.push(
              new faceapi.LabeledFaceDescriptors(
                this.personName,
                [detection.descriptor]
              )
            )
            console.log(this.labeledDescriptors)
          }

          this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors, 0.6)
          this.personName = ''
        } else {
          alert('No face detected! Please make sure your face is clearly visible.')
        }
      } catch (error) {
        console.error('Error adding person:', error)
        alert('Error adding person. Please try again.')
      }
    },
    removePerson(label) {
      this.labeledDescriptors = this.labeledDescriptors
        .filter(desc => desc.label !== label)
      if (this.labeledDescriptors.length > 0) {
        this.faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors, 0.6)
      } else {
        this.faceMatcher = null
      }
    },
    async startDetection() {
      const video = this.$refs.videoElement
      const canvas = this.$refs.canvasElement
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)

      this.detectionInterval = setInterval(async () => {
        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks(true)
            .withFaceDescriptors()
            .withFaceExpressions()

          const resizedDetections = faceapi.resizeResults(detections, displaySize)
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
          
          // Draw detections and landmarks
          faceapi.draw.drawDetections(canvas, resizedDetections)
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

          // Perform face recognition if we have registered faces
          if (this.faceMatcher) {
            resizedDetections.forEach(detection => {
              const bestMatch = this.faceMatcher.findBestMatch(detection.descriptor)
              const box = detection.detection.box
              const drawBox = new faceapi.draw.DrawBox(box, { 
                label: `${bestMatch.toString()}`,
                boxColor: bestMatch.distance < 0.6 ? 'green' : 'red'
              })
              drawBox.draw(canvas)
            })
          }
        } catch (error) {
          console.error('Detection error:', error)
        }
      }, 100)
    }
  },
  beforeDestroy() {
    this.stopVideo()
  }
}
</script>

<style scoped>
.face-recognition-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.loading-status {
  font-size: 1.2em;
  color: #666;
  margin: 20px 0;
}

.video-container {
  position: relative;
  width: 640px;
  height: 480px;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

video, canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 15px 0;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.recognized-faces {
  margin-top: 20px;
  text-align: left;
  width: 100%;
  max-width: 640px;
}

.recognized-faces ul {
  list-style: none;
  padding: 0;
}

.recognized-faces li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.remove-btn {
  background-color: #ff4444;
  padding: 4px 8px;
  font-size: 12px;
}

.remove-btn:hover {
  background-color: #ff0000;
}
</style>
