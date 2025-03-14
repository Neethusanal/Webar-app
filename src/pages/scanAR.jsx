import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

const ScanAR = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ScanAR component loaded");
  }, []);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
      
      // Check if this is the first or second scan
      const hasScannedBefore = sessionStorage.getItem("hasScanned");

      if (!hasScannedBefore) {
        // First scan - Navigate to Start AR page
        sessionStorage.setItem("hasScanned", "true");
        navigate("/start-ar");
      } else {
        // Second scan - Navigate to AR View
        navigate("/ar-view");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>
      <QrScanner delay={300} onScan={handleScan} onError={handleError} style={{ width: "100%" }} />
      {scanResult && <p className="mt-2 text-green-600">QR Code Detected: {scanResult}</p>}
    </div>
  );
};

export default ScanAR;
