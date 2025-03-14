import React from "react";
import QRCodeGenerator from "../components/QRcodeGenerator";
import { Link } from "react-router-dom"

const Home = () => {
    const arUrl = `${window.location.origin}/start-ar`; // AR page URL
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-xl mb-4">Znorm Homes</h1>
          <QRCodeGenerator url={arUrl} />
          <p className="mt-4">Scan the QR code with another device to start AR.</p>
        </div>
      );
};

export default Home;
