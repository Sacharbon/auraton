import * as faceapi from 'face-api.js';

let users = [];
let labeledDescriptors = null;
let faceMatcher = null;

try {
  const response = await fetch("http://localhost:3000/users", {
    headers: {
      "Content-Type": "application/json"
    }
  })
  users = await response.json();
  console.log(JSON.stringify(users));
  if (users.length > 0) {
    labeledDescriptors = users.map(profile => {
      return new faceapi.LabeledFaceDescriptors(
          profile.firstName + " " + profile.lastName,
          profile.faceDescriptor.map((d: number[]) => new Float32Array(d))
      );
    });
    faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
  }
} catch (e) {
  console.error("error fetching users", e);
}



export const loginUser = async (videoElement: HTMLVideoElement): Promise<string | null> => {
  try {
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);

    const detection = await faceapi
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (detection) {
      const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
      return bestMatch.label === 'unknown' ? null : bestMatch.label;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    return null;
  }
};
