import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Lenis from 'lenis';
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff, Download, X } from "lucide-react";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ChatbotPage from "./pages/ChatbotPage";
import CalculatorPage from "./pages/CalculatorPage";
import OCRPage from "./pages/OCRPage";
import CodexPage from "./pages/CodexPage";
import GlobalNav from "./components/GlobalNav";

function AppContent() {
  const location = useLocation();
  const showNav = location.pathname !== "/";
  const showLogo = showNav;
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  // Smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
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
  }, [location.pathname]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {/* Global Logo */}
      {showLogo && (
        <div className="global-logo-container">
          <Link to="/">
            <img src="/logo-transparent.png" alt="DriveLegal Logo" className="global-logo-img" />
          </Link>
        </div>
      )}

      {showNav && <GlobalNav />}

      {/* Custom Toasts for Offline & Install */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999, display: 'flex', flexDirection: 'column', gap: '16px', pointerEvents: 'none' }}>
        <AnimatePresence>
          {isOffline && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              style={{ background: '#ef4444', color: '#fff', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto', boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)' }}
            >
              <WifiOff size={24} />
              <div>
                <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>You are Offline</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.9 }}>AI features require an active connection. Please check your network.</p>
              </div>
            </motion.div>
          )}

          {showInstallPrompt && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              style={{ background: '#121212', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#fff', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', gap: '16px', pointerEvents: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
            >
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '10px' }}>
                <Download size={24} color="#10B981" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#F8FAFC' }}>Install DriveLegal App</h4>
                <p style={{ margin: '4px 0 12px', fontSize: '0.85rem', color: '#A1A1AA' }}>Install DriveLegal Web App to your home screen for offline access.</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={handleInstallClick} style={{ background: '#10B981', color: '#000', border: 'none', padding: '6px 16px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Install</button>
                  <button onClick={() => setShowInstallPrompt(false)} style={{ background: 'transparent', color: '#A1A1AA', border: 'none', padding: '6px 0', fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer' }}>Maybe Later</button>
                </div>
              </div>
              <button onClick={() => setShowInstallPrompt(false)} style={{ background: 'transparent', border: 'none', color: '#52525B', cursor: 'pointer' }}><X size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Home />} />
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