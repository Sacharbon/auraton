'use client';

import { useEffect, useRef, useState } from 'react';
import { recognizeFace } from './faceId.tsx';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element
  const [userLabel, setUserLabel] = useState<string | null>(null); // State for the recognized label

  useEffect(() => {
    // Start video stream once the component mounts
    const startVideo = async () => {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();

    // Setup face recognition every second
    const recognizeInterval = setInterval(async () => {
      if (videoRef.current) {
        const label = await recognizeFace(videoRef.current);
        setUserLabel(label); // Update state with the recognized label
      }
    }, 1000); // Adjust interval as needed

    // Cleanup on component unmount
    return () => {
      clearInterval(recognizeInterval);
    };
  }, []);

  return (
    <div>
      <h1>Face Recognition</h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="0"
        height="0"
      />
      <div>
        {userLabel ? (
          <p>Recognized user: {userLabel}</p>
        ) : (
          <p>Waiting for face recognition...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
