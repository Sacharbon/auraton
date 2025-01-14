import * as faceapi from 'face-api.js';
import mockDB from './mock_user_data.json';

const labeledDescriptors = mockDB.map(profile => {
  return new faceapi.LabeledFaceDescriptors(
    profile.label,
    profile.descriptors.map((d: number[]) => new Float32Array(d))
  );
});

const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

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
