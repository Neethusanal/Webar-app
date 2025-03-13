// import React from 'react'
// import "mind-ar/dist/mindar-image-aframe.prod.js";
// import { useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
// const ARView = () => {
//     const [searchParams] = useSearchParams();
//     const marker = searchParams.get("marker");
  
//     useEffect(() => {
//       console.log("Loaded AR for marker:", marker);
//     }, [marker]);
//   return (
//     <div>
//          <a-scene mindar-image="imageTargetSrc: ./images/targets.mind;" embedded arjs>
//       <a-camera position="0 0 0" look-controls></a-camera>
//       <a-marker type="mindar-image" targetIndex="0">
//         <a-video src="/images/znorm.mp4" width="1" height="1" position="0 0 0"></a-video>
//       </a-marker>
//     </a-scene>
//     </div>
//   )
// }

// export default ARView



import { useEffect, useRef } from "react";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

const ARView = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const startAR = async () => {
      const mindarThree = new MindARThree({
        container: containerRef.current,
        imageTargetSrc: "/targets.mind", // Load the tracking file
      });

      const { renderer, scene, camera } = mindarThree;
      await mindarThree.start();

      // Add a video to display when QR is recognized
      const video = document.createElement("video");
      video.src = "/ar-video.mp4"; // Replace with your AR video file
      video.loop = true;
      video.muted = false;
      video.style.position = "absolute";
      video.style.width = "100vw";
      video.style.height = "100vh";

      video.play();
      containerRef.current.appendChild(video);

      // Render loop
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
