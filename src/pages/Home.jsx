// import React from "react";
// import QRCodeGenerator from "../components/QRcodeGenerator";
// import { Link } from "react-router-dom"

// const Home = () => {
//   const isLocalhost = window.location.hostname === "localhost";
//   const arUrl = isLocalhost 
//     ? "http://192.168.1.100:5173/start-ar"  // Replace with your local network IP
//     : "https://webar-app.vercel.app/start-ar"; // Corrected Vercel URL
  


//     console.log("i am working")
//     return (
//         <div className="flex flex-col items-center justify-center h-screen bg-[#87CEEB] ">
//           <QRCodeGenerator url={arUrl} />
//           <p className="mt-4">Scan the QR code with another device to start AR.</p>
//         </div>
//       );
// };

// export default Home;
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Home = () => {
  // Define the URL or data to encode in the QR code
  const qrValue = `${window.location.origin}/scan-ar`;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#87CEEB]">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1>Znorm Homes</h1>
        <h3 className="text-xl mb-6">Where Comfort Meets Innovation</h3>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="p-4 border rounded shadow-md flex flex-col items-center">
            {/* Render the QR code */}
            <QRCodeCanvas
              value={qrValue}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
            />
            <p className="mt-2 text-sm text-gray-600">Scan to start AR</p>
          </div>
        </div>
      </div>
      <p className="mt-4">Scan the QR code with another device to start AR.</p>
    </div>
  );
};

export default Home;
