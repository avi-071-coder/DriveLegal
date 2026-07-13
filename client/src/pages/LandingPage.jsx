import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const chapters = [
  {
    title: "Traffic Laws, Simplified.",
    highlight: "Simplified.",
    description: "Scan tickets, check state-specific fines, and chat with AI legal assistance instantly.",
    bg: "/ch1_commute.png"
  },
  {
    title: "Then, The Flash.",
    highlight: "Flash.",
    description: "A single moment changes the commute. Rules differ. Penalties compound. The reality of enforcement activates.",
    bg: "/ch2_flash.png"
  },
  {
    title: "The Chaos.",
    highlight: "Chaos.",
    description: "State-wise regulations, floating documents, missing contexts. Information overload.",
    bg: "/ch3_confusion.png"
  },
  {
    title: "The Clarity.",
    highlight: "Clarity.",
    description: "Chaos becomes precision. DriveLegal aligns every document and law into a perfect, accessible structure.",
    bg: "/ch4_clarity.png"
  },
  {
    title: "The Engine.",
    highlight: "Engine.",
    description: "Architected like a massive control center. Legal data processed through high-speed validation pathways. Unmatched intelligence.",
    bg: "/ch5_engine.png"
  },
  {
    title: "Digital Twin.",
    highlight: "Digital",
    description: "We understand traffic flow at scale. Entire cities rendered as interconnected legal boundaries, updating in real-time.",
    bg: "/ch6_twin.png"
  },
  {
    title: "State By State.",
    highlight: "State",
    description: "Every regulation, every penalty, mapped precisely across the nation's neural network of highways.",
    bg: "/ch7_network.png"
  },
  {
    title: "The Vault.",
    highlight: "Vault.",
    description: "Your personal legal repository. Access state-specific laws, instantly decipher challans, and maintain total driving compliance.",
    bg: "/ch8_vault.png"
  },
  {
    title: "Drive Smarter. Know The Law.",
    highlight: "Smarter.",
    description: "You are in control. Enter the intelligence platform and take command of your legal compliance today.",
    bg: "/hero_interchange.png"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);
  const isAnimating = useRef(false);

  // 1 Scroll 1 Action Logic
  useEffect(() => {
    // Disable native scroll completely
    document.body.style.overflow = 'hidden';

    const handleWheel = (e) => {
      // Ignore tiny movements and trackpad noise
      if (Math.abs(e.deltaY) < 30) return;
      
      if (isAnimating.current) return;
      
      if (e.deltaY > 0) {
        if (currentChapter < chapters.length - 1) {
          isAnimating.current = true;
          setCurrentChapter(prev => prev + 1);
          setTimeout(() => isAnimating.current = false, 1200); // Wait for transition
        }
      } else if (e.deltaY < 0) {
        if (currentChapter > 0) {
          isAnimating.current = true;
          setCurrentChapter(prev => prev - 1);
          setTimeout(() => isAnimating.current = false, 1200);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentChapter < chapters.length - 1) {
          isAnimating.current = true;
          setCurrentChapter(prev => prev + 1);
          setTimeout(() => isAnimating.current = false, 1200);
        } else if (deltaY < 0 && currentChapter > 0) {
          isAnimating.current = true;
          setCurrentChapter(prev => prev - 1);
          setTimeout(() => isAnimating.current = false, 1200);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentChapter]);

  const getDirection = (index) => {
    const dirs = ['up', 'left', 'down', 'right'];
    return dirs[index % dirs.length];
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      filter: "blur(15px)",
      x: direction === 'right' ? 150 : direction === 'left' ? -150 : 0,
      y: direction === 'up' ? 150 : direction === 'down' ? -150 : 0,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
    },
    exit: (direction) => ({
      opacity: 0,
      filter: "blur(15px)",
      x: direction === 'right' ? -150 : direction === 'left' ? 150 : 0,
      y: direction === 'up' ? -150 : direction === 'down' ? 150 : 0,
      scale: 1.05,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const chapter = chapters[currentChapter];

  return (
    <div className="bg-[#020202] text-white font-sans h-screen w-full overflow-hidden relative">
      
      {/* BACKGROUND IMAGES */}
      <div className="fixed inset-0 z-[0] pointer-events-none bg-[#050505]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentChapter}
            src={chapter.bg}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 0.5, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full object-cover mix-blend-screen"
            alt="background"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 pointer-events-none"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-[999] p-8 flex justify-between items-center pointer-events-none mix-blend-difference">
        <div className="pointer-events-auto">
          <img src="/logo-transparent.png" alt="DriveLegal" className="h-8 md:h-10 opacity-90" />
        </div>
        <div className="flex items-center gap-6 pointer-events-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="block text-sm font-bold uppercase tracking-wider text-[#10B981] hover:text-white transition-colors"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* CHAPTER TEXT DISPLAY */}
      <div className="fixed inset-0 z-[20] pointer-events-none flex items-center justify-center">
        <AnimatePresence mode="wait" custom={getDirection(currentChapter)}>
          <motion.div 
            key={currentChapter}
            custom={getDirection(currentChapter)}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h2 className={`font-bold uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl ${currentChapter === chapters.length - 1 ? 'text-[8vw] md:text-[5vw]' : 'text-[12vw] md:text-[8vw]'}`}>
              {chapter.title.split(' ').map((word, i) => (
                <span key={i} className={word === chapter.highlight ? "text-[#10B981]" : "text-white"}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className={`text-[#A1A1AA] font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg ${currentChapter === chapters.length - 1 ? 'text-lg md:text-2xl' : 'text-xl md:text-3xl'}`}>
              {chapter.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* INITIAL CTAS */}
        <AnimatePresence>
          {currentChapter === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-20 left-0 right-0 flex flex-col md:flex-row justify-center gap-4 px-6 pointer-events-auto"
            >
              <button onClick={() => navigate('/ocr')} className="bg-[#10B981] text-black font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">Ticket Scanner</button>
              <button onClick={() => navigate('/calculator')} className="bg-[#121212]/80 backdrop-blur-md border border-[#10B981]/50 text-[#10B981] font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-[#10B981] hover:text-black transition-colors">Fine Checker</button>
              <button onClick={() => navigate('/chatbot')} className="bg-[#121212]/80 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-white hover:text-black transition-colors">AI Chatbot</button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* CODEX CTA FOR CH 8 */}
        <AnimatePresence>
          {currentChapter === 7 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-32 left-0 right-0 flex justify-center px-6 pointer-events-auto"
            >
              <button 
                onClick={() => navigate('/codex')} 
                className="cursor-pointer border border-[#10B981] bg-black/50 backdrop-blur-md text-white px-8 py-3 rounded-full uppercase text-sm font-bold tracking-widest hover:bg-[#10B981] hover:text-black transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Access Codex
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FINAL CTA */}
        <AnimatePresence>
          {currentChapter === chapters.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-32 left-0 right-0 flex justify-center px-6 pointer-events-auto"
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-[#10B981] text-black px-12 py-5 rounded-full text-xl font-bold uppercase tracking-widest hover:scale-105 hover:bg-white transition-all shadow-[0_0_40px_rgba(16,185,129,0.5)]"
              >
                Enter Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {chapters.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${currentChapter === idx ? 'bg-[#10B981] scale-150' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
