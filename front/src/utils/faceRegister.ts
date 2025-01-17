import * as faceapi from 'face-api.js';

export const registerUser = async (videoElement: HTMLVideoElement|null, firstName: string, lastName: string, role: string | null, picture: File | null): Promise<object | null> => {
  if (!videoElement)
    return null;

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
      console.log([Object.values(detection.descriptor)])
      const data = {
        firstName: firstName,
        lastName: lastName,
        faceDescriptor: [Object.values(detection.descriptor)],
      };
      const response = await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    return null;
  }
};
