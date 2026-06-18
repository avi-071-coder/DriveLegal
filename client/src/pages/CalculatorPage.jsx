import { motion } from "framer-motion";
import Calculator from "../components/Calculator";

function CalculatorPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 }
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
        background: 'radial-gradient(ellipse at top right, rgba(16, 185, 129, 0.1), transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }}></div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
          Fine <span style={{ color: '#10B981' }}>Calculator</span>
        </h2>
        <p style={{ color: '#A1A1AA', marginTop: '8px' }}>Instantly estimate traffic liabilities based on regional laws.</p>
      </div>

      <Calculator />
    </motion.div>
  );
}

export default CalculatorPage;