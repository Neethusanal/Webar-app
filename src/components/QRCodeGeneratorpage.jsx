import React from 'react'
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
const QRCodeGeneratorpage = () => {
  const qrValue = `${window.location.origin}/scan-ar`; // Fixed URL for scanning twice
 
   return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-[#87CEEB] p-4">
       <h1 className="text-xl mb-6">Where Comfort Meets Innovation</h1>
 
       <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
         <div className="p-4 border rounded shadow-md flex flex-col items-center">
           <QRCodeCanvas value={qrValue} size={200} bgColor="#ffffff" fgColor="#000000" />
           <p className="mt-2 text-sm text-gray-600">Scan to start AR</p>
         </div>
       </div>
     </div>
   );
 };
 


export default QRCodeGeneratorpage