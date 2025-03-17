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
        await mindarThree.start();

        // Check if AR is starting
        console.log("AR started successfully.");

        // Create and configure video
        const videoElement = document.createElement("video");
        videoElement.src = "/images/znorm.mp4";
        videoElement.loop = true;
        videoElement.muted = false;
        videoElement.setAttribute("playsinline", "true"); // Ensure it plays on mobile
        videoElement.style.display = "none"; // Hide video initially

        // Set video to state
        setVideo(videoElement);

        // Attach video to the anchor (marker)
        const anchor = anchorManager.anchors[0]; // First target
        anchor.onTargetFound = () => {
          videoElement.style.display = "block"; // Show the video when target is found
          videoElement.play(); // Start playing the video when target is found
        };
        anchor.onTargetLost = () => {
          videoElement.pause(); // Pause the video when target is lost
          videoElement.style.display = "none"; // Hide the video when target is lost
        };

        containerRef.current.appendChild(videoElement);

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      } catch (error) {
        console.error("Error starting AR:", error);
      }
    };

    startAR();
  }, []);

  return <div ref={containerRef} className="h-screen w-screen bg-black"></div>;
};

export default ARView;
