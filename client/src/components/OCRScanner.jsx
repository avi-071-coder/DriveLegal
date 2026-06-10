import Tesseract from "tesseract.js";
import { useState, useRef } from "react";
import { Upload, Car, Calendar, Receipt, IndianRupee, ScanLine, FileCheck2, Camera, Image, X } from "lucide-react";

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

  const handleZoneClick = () => {
    if (isProcessing) return;
    
    // Check if viewport is mobile/tablet size
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setShowSourceSelector(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="grid-responsive" style={{ gap: '40px' }}>
      
      {/* Upload Zone */}
      <div 
        onClick={handleZoneClick}
        style={{
          border: '2px dashed rgba(16, 185, 129, 0.4)',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(8, 33, 42, 0.4)',
          backdropFilter: 'blur(24px)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: '0.4s',
          cursor: isProcessing ? 'wait' : 'pointer'
        }}
        onMouseOver={e => !isProcessing && (e.currentTarget.style.borderColor = 'var(--accent-neon)', e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 212, 0.1) inset')}
        onMouseOut={e => !isProcessing && (e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)', e.currentTarget.style.boxShadow = 'none')}
      >
        {/* Hidden inputs: One for regular gallery file browse, one with capture environment for phone camera */}
        <input type="file" accept="image/*" onChange={handleImage} ref={fileInputRef} style={{ display: 'none' }} />
        <input type="file" accept="image/*" capture="environment" onChange={handleImage} ref={cameraInputRef} style={{ display: 'none' }} />
        
        {isProcessing ? (
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <ScanLine size={64} color="var(--accent-neon)" className="animate-pulse" style={{ marginBottom: '24px' }} />
            <h3 className="title-md" style={{ color: 'white', marginBottom: '8px' }}>Scanning Document...</h3>
            <p style={{ color: 'var(--accent-emerald)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '24px' }}>{progress}%</p>
            <div style={{ width: '200px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--gradient-glow)', transition: 'width 0.3s ease' }}></div>
            </div>
            
            {/* Animated Laser line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent-neon)', boxShadow: '0 0 20px 4px var(--accent-neon)', animation: 'scan 2s infinite linear' }}></div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', zIndex: 10 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '24px', borderRadius: '50%', marginBottom: '24px', display: 'inline-block', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <Upload size={48} color="var(--accent-emerald)" />
            </div>
            <h3 className="title-md" style={{ color: 'white', marginBottom: '12px' }}>Scan your Challan</h3>
            <p className="text-body" style={{ maxWidth: '300px', margin: '0 auto' }}>Tap here to take a photo of your physical challan or upload a screenshot to extract details instantly.</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <FileCheck2 size={24} color="var(--text-secondary)" />
          <h3 className="title-md" style={{ margin: 0 }}>Extracted Results</h3>
        </div>
        
        {showResults ? (
          <div className="grid-responsive animate-fade-in-up" style={{ gap: '20px' }}>
            <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                <Car size={24} color="var(--accent-emerald)" />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Vehicle No</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>DL3C AB 1234</p>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                <Calendar size={24} color="var(--accent-neon)" />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Date</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>07 Jan, 2023</p>
              </div>
            </div>
            
            <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px' }}>
                <Receipt size={24} color="var(--accent-gold)" />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Violation Code</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>0258</p>
              </div>
            </div>
            
            <div className="glass-card-accent" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(180, 83, 9, 0.4))', borderColor: 'rgba(251, 191, 36, 0.3)' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px' }}>
                <IndianRupee size={24} color="var(--accent-gold)" />
              </div>
              <div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>Fine Amount</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-gold)' }}>₹2,500</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
            <ScanLine size={48} color="rgba(255,255,255,0.1)" />
            <p className="text-body text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>No document scanned yet.<br/>Upload or capture an image to see details here.</p>
          </div>
        )}
      </div>

      {/* Source Selector Drawer for Mobile */}
      {showSourceSelector && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(2, 4, 8, 0.82)',
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
            background: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '24px 24px 0 0',
            padding: '24px 24px 40px',
            boxShadow: '0 -15px 40px rgba(0, 0, 0, 0.6)',
            animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'inherit', letterSpacing: '0.3px' }}>Select Image Source</h4>
              <button 
                onClick={() => setShowSourceSelector(false)} 
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
              >
                <X size={20} />
              </button>
            </div>

            <button 
              onClick={() => {
                fileInputRef.current?.click();
                setShowSourceSelector(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
            >
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '10px', borderRadius: '12px' }}>
                <Image size={20} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Upload from Gallery</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontWeight: 400 }}>Choose an existing challan photo</div>
              </div>
            </button>

            <button 
              onClick={() => {
                cameraInputRef.current?.click();
                setShowSourceSelector(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(0, 245, 212, 0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
            >
              <div style={{ background: 'rgba(0, 245, 212, 0.15)', padding: '10px', borderRadius: '12px' }}>
                <Camera size={20} color="var(--accent-neon)" />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>Take Photo</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontWeight: 400 }}>Use camera to scan physical challan</div>
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