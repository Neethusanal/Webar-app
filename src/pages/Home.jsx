import React from "react";
import QRCodeGenerator from "../components/QRcodeGenerator";
import { Link } from "react-router-dom"

const Home = () => {
    //const arUrl = `${window.location.origin}/start-ar`; // AR page URL
    const arUrl = "https://webar-app.vercel.app.com/start-ar"; 
  // const arUrl = "http://192.168.1.100:5173/start-ar";  // Use your Network URL


    console.log("i am working")
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#87CEEB] ">
          <QRCodeGenerator url={arUrl} />
          <p className="mt-4">Scan the QR code with another device to start AR.</p>
        </div>
      );
};

export default Home;
