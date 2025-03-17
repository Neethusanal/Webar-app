import React, { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const startAR = async () => {
      try {
        console.log("Starting AR...");
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/images/targets.mind", // Make sure this file is correctly referenced
        });

        const { renderer, scene, camera, anchorManager } = mindarThree;

        // Add a check to ensure MindAR is starting correctly
        if (!renderer || !scene || !camera) {
          console.error("MindAR setup failed: Missing renderer, scene, or camera.");
        }

        await mindarThree.start();

        console.log("AR started successfully.");

        // Create and configure video
        const videoElement = document.createElement("video");
        videoElement.src = "/images/znorm.mp4"; // Path to the AR video
        videoElement.loop = true;
        videoElement.muted = false;
        videoElement.setAttribute("playsinline", "true");
        videoElement.style.display = "none"; // Hide video initially

        setVideo(videoElement);

        // Ensure that video is playing when target is found
        const anchor = anchorManager.anchors[0]; // Select the first anchor (target)
        anchor.onTargetFound = () => {
          console.log("Target found, displaying video.");
          videoElement.style.display = "block"; // Show the video when target is found
          videoElement.play(); // Start playing the video when target is found
        };

        anchor.onTargetLost = () => {
          console.log("Target lost, pausing video.");
          videoElement.pause(); // Pause the video when target is lost
          videoElement.style.display = "none"; // Hide the video when target is lost
        };

        containerRef.current.appendChild(videoElement);

        // Animation loop for AR rendering
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera); // Continually render the AR scene
        };
        animate();
      } catch (error) {
        console.error("Error starting AR:", error); // Catch any errors during AR startup
      }
    };

    startAR(); // Start AR when the component mounts

  }, []); // Empty dependency array means this effect runs once after the component mounts

  return <div ref={containerRef} className="h-screen w-screen bg-black"></div>; // Render AR container
};

export default ARView;
