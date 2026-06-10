import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ScanLine, Bot, Shield, ChevronRight, BookOpen, Play, X } from "lucide-react";

function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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

            <div className="delay-3" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <Link to="/calculator" className="btn-primary">
                Get Started <ChevronRight size={20} />
              </Link>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '12px 24px', 
                  background: 'rgba(168, 85, 247, 0.1)', 
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '12px',
                  color: '#c084fc',
                  fontWeight: '600',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.05)'
                }}
                onMouseOver={e => { e.currentTarget.style.background='rgba(168, 85, 247, 0.2)'; e.currentTarget.style.boxShadow='0 0 15px rgba(168, 85, 247, 0.25)' }}
                onMouseOut={e => { e.currentTarget.style.background='rgba(168, 85, 247, 0.1)'; e.currentTarget.style.boxShadow='0 0 10px rgba(168, 85, 247, 0.05)' }}
              >
                <Play size={16} fill="#c084fc" /> Watch Officer PSA
              </button>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="animate-fade-in-up delay-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '420px', background: 'rgba(8, 33, 42, 0.6)' }}>
              <h3 className="title-md mb-4" style={{ textAlign: 'center' }}>Quick Tools</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
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

                <Link to="/codex" style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s' }} onMouseOver={e => { e.currentTarget.style.background='rgba(59,130,246,0.15)'; e.currentTarget.style.transform='translateY(-4px)' }} onMouseOut={e => { e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)' }}>
                  <BookOpen size={32} color="#a855f7" style={{ margin: '0 auto 12px' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Driver's Codex</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(2, 4, 8, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px',
          animation: 'fadeIn 0.25s ease-out'
        }} onClick={() => setIsVideoModalOpen(false)}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '780px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 50px rgba(168, 85, 247, 0.25)',
            overflow: 'hidden',
            animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '16px 24px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(2, 4, 8, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', boxShadow: '0 0 10px #ec4899' }}></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9', letterSpacing: '0.5px' }}>OFFICER SAFETY BROADCAST</span>
              </div>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                onMouseOver={e => e.currentTarget.style.color = '#f8fafc'}
                onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Content */}
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
              <video 
                src="/traffic_police.mp4" 
                autoPlay 
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            
            {/* Modal Footer */}
            <div style={{ padding: '16px 24px', background: 'rgba(2, 4, 8, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                "Abide by the rules. Drive safe, protect lives." — <span style={{ color: '#c084fc', fontWeight: 600 }}>DriveLegal AI Officer</span>
              </p>
            </div>
          </div>
        </div>
      )}

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Home;