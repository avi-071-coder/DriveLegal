import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatbotPage from "./pages/ChatbotPage";
import CalculatorPage from "./pages/CalculatorPage";
import OCRPage from "./pages/OCRPage";

function App() {
  return (
    <>
      {/* Moving Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      {/* Moving Traffic Animation */}
      <div className="traffic-container">
        <div className="car car-fast" style={{ top: '10%' }}></div>
        <div className="car car-slow" style={{ top: '30%', animationDelay: '2s' }}></div>
        <div className="car car-medium" style={{ top: '60%', animationDelay: '1s' }}></div>
        <div className="car car-fast" style={{ top: '80%', animationDelay: '3s' }}></div>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/ocr" element={<OCRPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;