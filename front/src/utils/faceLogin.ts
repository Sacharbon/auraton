import * as faceapi from 'face-api.js';

export const loginUser = async (videoElement: HTMLVideoElement): Promise<[Float32Array|null, object|null]> => {
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
    //console.log(JSON.stringify(users));
    if (users.length > 0) {
      labeledDescriptors = users.map((profile: any) => {
        return new faceapi.LabeledFaceDescriptors(
            profile.id.toString(),
            profile.faceDescriptor.map((d: number[]) => new Float32Array(d))
        );
      });
      faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    }
  } catch (e) {
    console.error("error fetching users", e);
  }

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

    faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
    if (detection) {
      //console.log(detection.descriptor);
      const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
      console.log(bestMatch.label);
      return bestMatch.label === 'unknown' ? [detection.descriptor, null] : [null, (users.find((user: any) => user.id.toString() == bestMatch.label))];
    } else {
      return [null, null];
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    return [null, null];
  }
};
