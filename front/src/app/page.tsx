'use client';

import { useEffect, useRef, useState } from 'react';
import { loginUser } from './faceLogin.tsx';

const Home = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [userLabel, setUserLabel] = useState<string | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();

    const recognizeInterval = setInterval(async () => {
      if (videoRef.current) {
        const label = await loginUser(videoRef.current);
        setUserLabel(label);
      }
    }, 1000);

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
