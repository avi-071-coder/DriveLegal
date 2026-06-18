import { motion } from "framer-motion";
import ChatBox from "../components/ChatBox";

function ChatbotPage() {
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 }
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
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        background: 'var(--bg-primary)'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '30vh',
        background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.05), transparent)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div style={{ padding: '24px 32px', zIndex: 1 }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#F8FAFC' }}>
          DriveLegal <span style={{ color: '#10B981' }}>AI Assistant</span>
        </h2>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, zIndex: 1, paddingBottom: '80px' }}>
        <ChatBox />
      </div>
    </motion.div>
  );
}

export default ChatbotPage;