import { Link, useLocation } from "react-router-dom";
import { Calculator, ScanLine, Bot, Home, BookOpen } from "lucide-react";

function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(8, 33, 42, 0.6)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.05)',
      padding: '8px 12px',
      borderRadius: '100px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{ padding: '8px', borderRadius: '50%', transition: '0.3s', background: currentPath === '/' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: currentPath === '/' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
        <Home size={20} />
      </Link>
      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }}></div>
      <Link to="/calculator" title="Calculator" style={{ padding: '8px', borderRadius: '50%', transition: '0.3s', background: currentPath === '/calculator' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: currentPath === '/calculator' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
        <Calculator size={20} />
      </Link>
      <Link to="/ocr" title="OCR Scanner" style={{ padding: '8px', borderRadius: '50%', transition: '0.3s', background: currentPath === '/ocr' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: currentPath === '/ocr' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
        <ScanLine size={20} />
      </Link>
      <Link to="/chatbot" title="AI Chat" style={{ padding: '8px', borderRadius: '50%', transition: '0.3s', background: currentPath === '/chatbot' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: currentPath === '/chatbot' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
        <Bot size={20} />
      </Link>
      <Link to="/codex" title="Codex" style={{ padding: '8px', borderRadius: '50%', transition: '0.3s', background: currentPath === '/codex' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: currentPath === '/codex' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
        <BookOpen size={20} />
      </Link>
    </div>
  );
}

export default TopNav;
