import * as faceapi from 'face-api.js';

export const registerUser = async (videoElement: HTMLVideoElement): Promise<string | null> => {
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
      console.log("registration");
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    return null;
  }
};
