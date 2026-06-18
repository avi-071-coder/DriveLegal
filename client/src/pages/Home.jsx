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
        <motion.h1 
          variants={itemVariants}
          style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            color: '#F8FAFC',
            marginBottom: '32px'
          }}
        >
          Good to see you <br/>
          <span style={{ color: '#10B981' }}>driving safely.</span>
        </motion.h1>

        {/* AI Input Field */}
        <motion.div variants={itemVariants} style={{ marginBottom: '64px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--gradient-glow)',
            borderRadius: '24px',
            filter: 'blur(12px)',
            opacity: 0.15,
            transition: 'opacity 0.3s ease'
          }} className="glow-bg"></div>
          
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(18, 18, 18, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '24px',
            padding: '8px 8px 8px 24px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            transition: 'all 0.3s ease'
          }}>
            <Search size={24} color="#A1A1AA" />
            <input 
              ref={inputRef}
              onFocus={handleInputFocus}
              onClick={handleInputFocus}
              type="text" 
              placeholder="How can DriveLegal help you today?" 
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                padding: '16px',
                fontFamily: 'Plus Jakarta Sans, sans-serif'
              }}
            />
            <button 
              onClick={handleInputFocus}
              style={{
                background: '#10B981',
                border: 'none',
                borderRadius: '16px',
                padding: '16px 24px',
                color: '#0A0A0A',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Ask AI <Bot size={18} />
            </button>
          </div>
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div variants={itemVariants} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          
          {[
            { to: '/calculator', icon: Calculator, label: 'Calculator', desc: 'Estimate fines' },
            { to: '/ocr', icon: ScanLine, label: 'OCR Scanner', desc: 'Scan citations' },
            { to: '/codex', icon: BookOpen, label: 'Codex', desc: 'Browse traffic laws' }
          ].map((item, i) => (
            <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
              <div 
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '32px 24px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  height: '100%',
                  background: 'rgba(255,255,255,0.02)'
                }}
              >
                <item.icon size={40} color="#10B981" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', color: '#F8FAFC' }}>{item.label}</h3>
                <p style={{ fontSize: '0.9rem', color: '#A1A1AA' }}>{item.desc}</p>
              </div>
            </Link>
          ))}

        </motion.div>
      </div>

    </motion.div>
  );
}

export default Home;