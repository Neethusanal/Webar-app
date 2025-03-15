import React from "react";
import QRCodeGenerator from "../components/QRcodeGenerator";
import { Link } from "react-router-dom"

const Home = () => {
  const isLocalhost = window.location.hostname === "localhost";
  const arUrl = isLocalhost 
    ? "http://192.168.1.100:5173/start-ar"  // Replace with your local network IP
    : "https://webar-app.vercel.app/start-ar"; // Corrected Vercel URL
  


    console.log("i am working")
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#87CEEB] ">
          <QRCodeGenerator url={arUrl} />
          <p className="mt-4">Scan the QR code with another device to start AR.</p>
        </div>
      );
};

export default Home;
