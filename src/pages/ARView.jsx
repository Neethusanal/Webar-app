import React, { useEffect, useRef, useState } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null); // Reference to the container where AR will be rendered
  const [video, setVideo] = useState(null); // State to store video element

  useEffect(() => {
    const startAR = async () => {
      try {
        console.log("Starting AR...");

        // Initialize MindAR with container and target image
        const mindarThree = new MindARThree({
          container: containerRef.current,
          imageTargetSrc: "/images/targets.mind", // Path to your AR target file
        });

        const { renderer, scene, camera, anchorManager } = mindarThree;
        await mindarThree.start(); // Start the AR experience

        console.log("AR started successfully.");

        // Create and configure the video element
        const videoElement = document.createElement("video");
        videoElement.src = "/images/znorm.mp4"; // Path to the AR video
        videoElement.loop = true; // Loop video
        videoElement.muted = false; // Set video to not muted
        videoElement.setAttribute("playsinline", "true"); // Ensures the video plays inline (on mobile)
        videoElement.style.display = "none"; // Initially hide the video

        // Set video element to state (optional for state management)
        setVideo(videoElement);

        // Attach video to AR anchor (marker) when target is found
        const anchor = anchorManager.anchors[0]; // Select the first anchor (target)
        
        anchor.onTargetFound = () => {
          console.log("Target found, displaying video.");
          videoElement.style.display = "block"; // Show the video when target is found
          videoElement.play(); // Start playing the video
        };

        anchor.onTargetLost = () => {
          console.log("Target lost, pausing video.");
          videoElement.pause(); // Pause the video when target is lost
          videoElement.style.display = "none"; // Hide the video
        };

        // Add the video element to the AR container
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
