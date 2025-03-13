import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/images/targets.mind"); // ✅ Set default value

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#C8A2C8] p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Znorm Homes</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 mb-4 w-full max-w-md rounded"
        />
        
        {imageUrl && (
          <div className="p-4 border rounded shadow-md flex flex-col items-center">
            <QRCodeCanvas value={imageUrl} size={200} bgColor="#ffffff" fgColor="#000000" />
            <p className="mt-2 text-sm text-gray-600">Scan to access: {imageUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
