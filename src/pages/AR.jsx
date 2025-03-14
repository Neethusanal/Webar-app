// import React from 'react'

// const AR = () => {
//     const navigate = useNavigate();
//   return (
//     <div>
//         <div className="flex flex-col items-center">
//       <h1>Start AR Experience</h1>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/scan-ar")}>
//         Start AR
//       </button>
//     </div>
//     </div>
//   )
// }

// export default AR

// import { useNavigate } from "react-router-dom";
// const AR = () => {
//     const navigate = useNavigate();
  
//     const handleStartAR = () => {
//       navigate("/ar-view"); // Redirect to AR scanning page
//     };
  
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <h1 className="text-xl mb-4">Start WebAR</h1>
//         <p className="mb-4">Click the button below to start AR.</p>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleStartAR}
//         >
//           Start AR
//         </button>
//       </div>
//     );
//   };
  
//   export default AR;
import React from "react";
import { useNavigate } from "react-router-dom";

const AR = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl mb-4">Start AR Experience</h1>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/scan-ar")} // Go back to scan again
      >
        Start AR
      </button>
    </div>
  );
};

export default AR;
