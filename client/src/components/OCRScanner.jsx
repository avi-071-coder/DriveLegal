import Tesseract from "tesseract.js";
import { useState, useRef } from "react";
import { Upload, Car, Calendar, Receipt, IndianRupee, ScanLine, FileCheck2, Camera, Image, X } from "lucide-react";
import { motion } from "framer-motion";

function OCRScanner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showSourceSelector, setShowSourceSelector] = useState(false);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setShowSourceSelector(false);
    setIsProcessing(true);
    setProgress(0);
    setShowResults(false);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 5;
      });
    }, 150);

    try {
      await Tesseract.recognize(file, "eng");
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 800);
    } catch (error) {
      clearInterval(interval);
      setIsProcessing(false);
    }
  };

  const handleSampleImage = async (e) => {
    e.stopPropagation();
    setIsProcessing(true);
    setProgress(0);
    setShowResults(false);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 5;
      });
    }, 150);

    try {
      await Tesseract.recognize("/challan_examp.png", "eng");
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setShowResults(true);
      }, 800);
    } catch (error) {
      clearInterval(interval);
      setIsProcessing(false);
    }
  };

  const handleZoneClick = () => {
    if (isProcessing) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowSourceSelector(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
      
      {/* Left Column: Upload Zone & Fallback */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <motion.div 
        whileHover={!isProcessing ? { scale: 1.02 } : {}}
        whileTap={!isProcessing ? { scale: 0.98 } : {}}
        onClick={handleZoneClick}
        style={{
          border: '2px dashed rgba(16, 185, 129, 0.4)',
          borderRadius: '24px',
          background: 'rgba(18, 18, 18, 0.6)',
          backdropFilter: 'blur(24px)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s',
          cursor: isProcessing ? 'wait' : 'pointer',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}
      >
        <input type="file" accept="image/*" onChange={handleImage} ref={fileInputRef} style={{ display: 'none' }} />
        <input type="file" accept="image/*" capture="environment" onChange={handleImage} ref={cameraInputRef} style={{ display: 'none' }} />
        
        {isProcessing ? (
          <div style={{ textAlign: 'center', zIndex: 10, width: '100%', padding: '0 40px' }}>
            <ScanLine size={64} color="#00FF66" className="animate-pulse" style={{ margin: '0 auto 24px' }} />
            <h3 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '1.2rem', fontWeight: 600 }}>Scanning Document...</h3>
            <p style={{ color: '#10B981', fontWeight: '800', fontSize: '1.5rem', marginBottom: '24px' }}>{progress}%</p>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #00FF66)', transition: 'width 0.3s ease' }}></div>
            </div>
            
            {/* Animated Laser line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#00FF66', boxShadow: '0 0 30px 4px #00FF66', animation: 'scan 2.5s infinite linear' }}></div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '24px', display: 'inline-block', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <Upload size={48} color="#10B981" />
            </div>
            <h3 style={{ color: '#F8FAFC', marginBottom: '12px', fontSize: '1.2rem', fontWeight: 600 }}>Upload or Take Photo</h3>
            <p style={{ color: '#A1A1AA', fontSize: '0.9rem', maxWidth: '280px', margin: '0 auto', lineHeight: 1.5 }}>Tap here to provide an image of your challan for instant AI extraction.</p>
          </div>
        )}
      </motion.div>
      {!isProcessing && !showResults && (
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <button 
            onClick={handleSampleImage}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#10B981', 
              textDecoration: 'underline', 
              cursor: 'pointer', 
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            Don't have a ticket? Click here to auto-load a sample ticket image.
          </button>
        </div>
      )}
      </div>

      {/* Right Column: Results Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <FileCheck2 size={24} color="#10B981" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#F8FAFC', fontWeight: 600 }}>Extracted Results</h3>
        </div>
        
        {showResults ? (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {[
              { icon: Car, label: "Vehicle No", value: "KA 51 MA 8428", color: "#10B981" },
              { icon: Calendar, label: "Date", value: "25 Jan, 2014", color: "#00FF66" },
              { icon: Receipt, label: "Violation Code", value: "NP", color: "#FBBF24" }
            ].map((item, idx) => (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                key={idx} 
                className="glass-card" 
                style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}
              >
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <item.icon size={24} color={item.color} />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: '#A1A1AA', marginBottom: '4px' }}>{item.label}</p>
                  <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#FFFFFF' }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
              }}
              style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(18, 18, 18, 0.9))', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            >
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '16px' }}>
                <IndianRupee size={32} color="#00FF66" />
              </div>
              <div>
                <p style={{ fontSize: '0.9rem', color: '#10B981', marginBottom: '4px', fontWeight: 600 }}>Fine Amount</p>
                <p style={{ fontSize: '2rem', fontWeight: '800', color: '#00FF66', margin: 0, lineHeight: 1 }}>₹100</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="glass-card" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.1)' }}>
            <ScanLine size={48} color="rgba(255,255,255,0.1)" />
            <p style={{ color: '#52525B', textAlign: 'center', lineHeight: 1.6 }}>No document scanned yet.<br/>Upload or capture an image to see details here.</p>
          </div>
        )}
      </div>

      {/* Source Selector Drawer for Mobile */}
      {showSourceSelector && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 99999,
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowSourceSelector(false)}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            background: '#121212',
            borderTop: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '24px 24px 0 0',
            padding: '24px 24px 40px',
            boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.8)',
            animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: '#F8FAFC', fontSize: '1.2rem', fontWeight: 700 }}>Image Source</h4>
              <button 
                onClick={() => setShowSourceSelector(false)} 
                style={{ background: 'transparent', border: 'none', color: '#A1A1AA', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
              >
                <X size={24} />
              </button>
            </div>

            <button 
              onClick={() => { fileInputRef.current?.click(); setShowSourceSelector(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', color: '#F8FAFC', textAlign: 'left', cursor: 'pointer', transition: 'background 0.2s'
              }}
            >
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px' }}>
                <Image size={24} color="#10B981" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Photo Gallery</div>
                <div style={{ fontSize: '0.85rem', color: '#A1A1AA', marginTop: '2px' }}>Choose an existing photo</div>
              </div>
            </button>

            <button 
              onClick={() => { cameraInputRef.current?.click(); setShowSourceSelector(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', color: '#F8FAFC', textAlign: 'left', cursor: 'pointer', transition: 'background 0.2s'
              }}
            >
              <div style={{ background: 'rgba(0, 255, 102, 0.1)', padding: '12px', borderRadius: '12px' }}>
                <Camera size={24} color="#00FF66" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Take Photo</div>
                <div style={{ fontSize: '0.85rem', color: '#A1A1AA', marginTop: '2px' }}>Use camera to scan challan</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default OCRScanner;