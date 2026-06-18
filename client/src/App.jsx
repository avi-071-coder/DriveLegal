import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Lenis from 'lenis';
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import ChatbotPage from "./pages/ChatbotPage";
import CalculatorPage from "./pages/CalculatorPage";
import OCRPage from "./pages/OCRPage";
import CodexPage from "./pages/CodexPage";
import GlobalNav from "./components/GlobalNav";

function AppContent() {
  const location = useLocation();
  const showNav = location.pathname !== "/";

  // Smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {showNav && <GlobalNav />}
      
      {/* Global Background Animation for all pages except Home */}
      {showNav && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100vw', height: '100vh',
              objectFit: 'cover',
              zIndex: -9999,
            }}
            src="/background.mp4" 
          />
          {/* Blend Overlay to keep text readable */}
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.6), rgba(10,10,10,0.9))',
            pointerEvents: 'none',
            zIndex: -9998
          }}></div>
        </>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/ocr" element={<OCRPage />} />
          <Route path="/codex" element={<CodexPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;