import Tesseract from "tesseract.js";
import { useState, useRef } from "react";
import { Upload, Car, Calendar, Receipt, IndianRupee, ScanLine, FileCheck2 } from "lucide-react";

function OCRScanner() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  return (
    <div className="grid-responsive" style={{ gap: '40px' }}>
      
      {/* Upload Zone */}
      <div 
        onClick={() => !isProcessing && fileInputRef.current?.click()}
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
        <input type="file" accept="image/*" onChange={handleImage} ref={fileInputRef} style={{ display: 'none' }} />
        
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
            <h3 className="title-md" style={{ color: 'white', marginBottom: '12px' }}>Upload your Challan Photo</h3>
            <p className="text-body" style={{ maxWidth: '300px', margin: '0 auto' }}>Drop your physical challan or digital screenshot here to extract structured data instantly.</p>
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
            <p className="text-body text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>No document scanned yet.<br/>Upload an image to see details here.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
}

export default OCRScanner;