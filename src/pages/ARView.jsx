import React, { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const startAR = async () => {
      try {
        console.log("Starting AR...");

        // Initialize MindAR instance
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/images/targets.mind", // Path to the AR target file
        });

        // Access the AR setup components
        const { renderer, scene, camera, anchorManager } = mindarThree;
        await mindarThree.start();

        // Check if AR was started
        console.log("AR started successfully");

        // Ensure that the camera feed is visible
        const videoElement = document.createElement("video");
        videoElement.src = "/images/znorm.mp4";
        videoElement.loop = true;
        videoElement.muted = false;
        videoElement.setAttribute("playsinline", "true");
        videoElement.style.display = "none"; // Hide video initially

        // Add video to the state for React rendering
        setVideo(videoElement);

        // Attach video to the anchor (marker)
        const anchor = anchorManager.anchors[0]; // First target
        anchor.onTargetFound = () => {
          console.log("Target found, displaying video.");
          videoElement.style.display = "block"; // Show the video
          videoElement.play(); // Start playing the video
        };

        anchor.onTargetLost = () => {
          console.log("Target lost, pausing video.");
          videoElement.pause(); // Pause the video
          videoElement.style.display = "none"; // Hide the video
        };

        containerRef.current.appendChild(videoElement);

        // Animation loop to render the AR scene
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      } catch (error) {
        console.error("Error starting AR:", error);
      }
    };

    startAR(); // Start AR when the component mounts

  }, []); // Empty dependency array means this effect runs once after the component mounts

  return <div ref={containerRef} className="h-screen w-screen bg-black"></div>;
};

export default ARView;
