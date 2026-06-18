import { motion } from "framer-motion";
import OCRScanner from "../components/OCRScanner";

function OCRPage() {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.98 }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20
  };

  return (
    <motion.div 
      initial="initial" 
      animate="in" 
      exit="out" 
      variants={pageVariants} 
      transition={pageTransition}
      className="app-container"
      style={{ paddingBottom: '80px', paddingTop: '40px', minHeight: '100vh', position: 'relative' }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '40vh',
        background: 'radial-gradient(ellipse at top center, rgba(16, 185, 129, 0.08), transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }}></div>

      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
          Challan <span style={{ color: '#10B981' }}>Scanner</span>
        </h2>
        <p style={{ color: '#A1A1AA', marginTop: '8px' }}>Instantly extract details from your traffic citations using AI.</p>
      </div>

      <OCRScanner />
    </motion.div>
  );
}

export default OCRPage;