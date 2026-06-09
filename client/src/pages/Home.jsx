import { Link } from "react-router-dom";
import { Calculator, ScanLine, Bot, Shield, ChevronRight } from "lucide-react";

function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <div style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '80px 0',
        overflow: 'hidden'
      }}>
        {/* Background Image Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("/hero_highway_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px) brightness(0.6)',
          transform: 'scale(1.05)',
          zIndex: -1
        }}></div>
        
        {/* Gradient Overlay for blending */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(2, 8, 10, 0.95) 0%, rgba(2, 8, 10, 0.6) 100%)',
          zIndex: -1
        }}></div>

        <div className="app-container grid-responsive" style={{ alignItems: 'center' }}>
          
          {/* Left: Text Content */}
          <div className="animate-fade-in-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '100px', marginBottom: '24px' }}>
              <Shield size={18} color="var(--accent-emerald)" />
              <span style={{ fontWeight: '600', color: 'var(--accent-emerald)', fontSize: '0.9rem', letterSpacing: '1px' }}>DRIVELEGAL AI</span>
            </div>

            <h1 className="title-xl delay-1">
              Navigate Traffic Laws with Precision.
            </h1>
            
            <p className="text-body delay-2" style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '500px', color: '#94a3b8' }}>
              Empower your legal journey with AI-driven insights, instant OCR scanning, and accurate fine estimations.
            </p>

            <div className="delay-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/calculator" className="btn-primary">
                Get Started <ChevronRight size={20} />
              </Link>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="animate-fade-in-up delay-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '420px', background: 'rgba(8, 33, 42, 0.6)' }}>
              <h3 className="title-md mb-4" style={{ textAlign: 'center' }}>Quick Tools</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <Link to="/calculator" style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background='rgba(59,130,246,0.15)'; e.currentTarget.style.transform='translateY(-4px)' }} onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}>
                  <Calculator size={32} color="var(--accent-neon)" style={{ margin: '0 auto 12px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Calculator</span>
                </Link>
                
                <Link to="/ocr" style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background='rgba(59,130,246,0.15)'; e.currentTarget.style.transform='translateY(-4px)' }} onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}>
                  <ScanLine size={32} color="var(--accent-emerald)" style={{ margin: '0 auto 12px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>OCR Scan</span>
                </Link>
                
                <Link to="/chatbot" style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background='rgba(59,130,246,0.15)'; e.currentTarget.style.transform='translateY(-4px)' }} onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}>
                  <Bot size={32} color="var(--accent-gold)" style={{ margin: '0 auto 12px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>AI Chat</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes floatImage {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes zoomCar {
          0% { left: -60px; }
          100% { left: 420px; }
        }
      `}</style>
    </div>
  );
}

export default Home;