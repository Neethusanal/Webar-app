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
        video.style.top = "0"; // Make sure it covers the entire screen
        video.style.left = "0"; // Align to top-left corner
        video.style.width = "100vw"; // Full viewport width
        video.style.height = "100vh"; // Full viewport height
        video.style.zIndex = "-1"; // Ensure the video is behind AR content

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

        // Check if target is detected by logging the events
        anchor.onTargetFound = () => {
          console.log("Target found, showing AR video");
          video.style.display = "block"; // Show the AR video
          video.play(); // Start playing the video
        };

        anchor.onTargetLost = () => {
          console.log("Target lost, pausing AR video");
          video.style.display = "none"; // Hide the AR video
          video.pause(); // Pause the video
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
  }, [videoElement]); // Only restart the AR when videoElement changes

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-black"
      style={{ position: "relative", overflow: "hidden" }}
    ></div>
  );
};

export default ARView;
