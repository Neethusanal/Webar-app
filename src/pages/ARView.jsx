import React, { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null);
  const [videoElement, setVideoElement] = useState(null);

  useEffect(() => {
    const startAR = async () => {
      try {
        console.log("Starting AR...");

        // Get the device camera stream using getUserMedia
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use the back camera
        });

        // Create a video element to show the camera feed
        const video = document.createElement("video");
        video.srcObject = stream; // Set the stream to the video element
        video.play();
        video.setAttribute("playsinline", "true"); // Ensure it works on mobile
        video.style.position = "absolute"; // Position the video as background

        // Append the video to the container
        containerRef.current.appendChild(video);
        setVideoElement(video);

        // Initialize MindAR to use the video feed for AR
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/images/targets.mind", // Path to the AR target file
        });

        const { renderer, scene, camera, anchorManager } = mindarThree;

        // Start the AR renderer
        await mindarThree.start();

        // Attach the video to the AR camera stream for rendering
        camera.video = video; // Use the manually controlled camera for AR rendering

        // Add an anchor and configure video playback when target is found
        const anchor = anchorManager.anchors[0]; // Assuming the first target
        anchor.onTargetFound = () => {
          console.log("Target found, showing AR video");
          // Play the AR video or any AR content here
        };

        anchor.onTargetLost = () => {
          console.log("Target lost, pausing AR video");
          // Pause or stop the AR content here
        };

        // Animation loop to keep the AR scene updated
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      } catch (error) {
        console.error("Error starting AR:", error);
      }
    };

    startAR(); // Start the AR setup when component mounts

    // Cleanup the stream when the component unmounts
    return () => {
      if (videoElement) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-black"
      style={{ position: "relative" }}
    ></div>
  );
};

export default ARView;