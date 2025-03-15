




import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";      // QR Code Page
import AR from "./pages/AR"; 
import ARView from "./pages/ARView";    // AR Scanner Page
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />        {/* Home page with QR Code */}
        <Route path="/start-ar" element={<AR />} />  {/* Start AR Button Page */}
        <Route path="/ar-view" element={<ARView />} />   {/* AR Scanner Page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
