// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import StartAR from "./pages/AR";
// // import ScanAR from "./pages/scanAR";
// // import ARView from "./pages/ARView";
// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
       
// //        <Router>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/start-ar" element={<StartAR />} />
// //         <Route path="/scan-ar" element={<ScanAR />} />
// //         <Route path="/ar-view" element={<ARView />} />
// //       </Routes>
// //     </Router>
    
// //     </>
// //   )
// // }

// // export default App


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import StartAR from "./pages/StartAR";
// import ARView from "./pages/ARView";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/start-ar" element={<StartAR />} />
//       <Route path="/ar-view" element={<ARView />} />
//     </Routes>
//   </BrowserRouter>
// );


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";      // QR Code Page
import AR from "./pages/AR"; 
import ARView from "./pages/ARView";    // AR Scanner Page

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
