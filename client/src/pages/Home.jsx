import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calculator, ScanLine, Bot, BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    navigate("/chatbot");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden'
      }}
    >
      {/* Background Animation Video Layer - USER TO UPLOAD HERE */}
      {/* Replace 'hero_animation.mp4' with the actual file uploaded in public/ folder */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
        src="/hero_animation.mp4" 
      />

      {/* Dark Overlay / Glassmorphic Blur */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.5), rgba(10,10,10,0.8))',
        backdropFilter: 'blur(2px)',
        zIndex: -1
      }}></div>

      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', zIndex: 1 }}>
        {/* Greeting Hero */}
        <motion.div variants={itemVariants} style={{ marginBottom: '48px' }}>
          <h1 
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              lineHeight: 1.1,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              marginBottom: '16px'
            }}
          >
            Welcome to <span style={{ color: '#10B981' }}>DriveLegal.</span>
          </h1>
          <p style={{ color: '#A1A1AA', fontSize: '1.1rem', fontWeight: 300, maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
            Your intelligent traffic law assistant. Ask a question, estimate a fine, or scan a challan below.
          </p>
        </motion.div>

        {/* AI Input Field */}
        <motion.div variants={itemVariants} style={{ marginBottom: '64px', position: 'relative', width: '100%', maxWidth: '700px', margin: '0 auto 64px auto' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '8px 8px 8px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            transition: 'border-color 0.3s ease'
          }}>
            <Search size={22} color="#10B981" />
            <input 
              ref={inputRef}
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              type="text" 
              placeholder="How can we help you today?" 
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '1.05rem',
                padding: '16px',
                fontFamily: 'inherit'
              }}
            />
            <button 
              onClick={handleInputFocus}
              style={{
                background: '#10B981',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 24px',
                color: '#050505',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.2s ease, opacity 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Ask AI <Bot size={18} />
            </button>
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div variants={itemVariants} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '24px',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          
          {[
            { to: '/calculator', icon: Calculator, label: 'Calculator', desc: 'Estimate state-wise fines' },
            { to: '/ocr', icon: ScanLine, label: 'OCR Scanner', desc: 'Scan paper citations' },
            { to: '/codex', icon: BookOpen, label: 'The Codex', desc: 'Browse traffic laws' }
          ].map((item, i) => (
            <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '32px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  height: '100%',
                  background: 'rgba(10, 10, 10, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(20, 20, 20, 0.9)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(10, 10, 10, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', marginBottom: '20px' }}>
                  <item.icon size={28} color="#10B981" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>{item.label}</h3>
                <p style={{ fontSize: '0.95rem', color: '#A1A1AA', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            </Link>
          ))}

        </motion.div>
      </div>

    </motion.div>
  );
}

export default Home;