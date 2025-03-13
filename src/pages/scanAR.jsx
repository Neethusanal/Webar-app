import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";

const scanAR = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text); // Extract text from the scanned QR code
      navigate("/ar-view?marker=" + encodeURIComponent(data.text)); // Redirect to AR view
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Scan AR Marker</h1>
      <QrScanner
        delay={300}
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
      {scanResult && <p className="mt-2 text-green-600">QR Code Detected: {scanResult}</p>}
    </div>
  );
};

export default scanAR;
