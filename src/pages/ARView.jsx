import React, { useEffect, useRef } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const startAR = async () => {
      const mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/images/targets.mind",
      });

      const { renderer, scene, camera, anchorManager } = mindarThree;
      await mindarThree.start();

      // Create and configure video
      const video = document.createElement("video");
      video.src = "/images/znorm.mp4";
      video.loop = true;
      video.muted = false;
      video.setAttribute("playsinline", "true"); // Ensure it plays on mobile
      video.style.display = "none"; // Hide video initially

      // Attach video to the anchor (marker)
      const anchor = anchorManager.anchors[0]; // First target
      anchor.onTargetFound = () => {
        video.style.display = "block";
        video.play();
      };
      anchor.onTargetLost = () => {
        video.pause();
        video.style.display = "none";
      };

      containerRef.current.appendChild(video);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    };

    startAR();
  }, []);

  return <div ref={containerRef} className="h-screen w-screen bg-black"></div>;
};

export default ARView;
