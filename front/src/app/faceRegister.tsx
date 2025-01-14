import * as faceapi from 'face-api.js';

export const registerUser = async (videoElement: HTMLVideoElement, firstName: string, lastName: string, role: string | null, pictureUrl: string | null): Promise<object | null> => {
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
      const data = {
        firstName: firstName,
        lastName: lastName,
        faceDescriptor: [Object.values(detection.descriptor)],
        roles: [role],
        pictureUrl: pictureUrl,
      };
      const response = await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const new_user = await response.json();
      console.log(new_user);
      return new_user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    return null;
  }
};
