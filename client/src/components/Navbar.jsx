import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Navbar() {
  return (
    <nav className="glass-nav flex-between px-6 py-4 animate-fade-in-up">
      <Link 
        to="/" 
        className="flex items-center gap-2 text-gradient font-bold" 
        style={{ fontFamily: 'Outfit', fontSize: '1.75rem', letterSpacing: '0.5px' }}
      >
        <ShieldCheck size={32} color="var(--accent-emerald)" strokeWidth={2.5} />
        DriveLegal <span style={{ color: 'var(--text-primary)', fontWeight: 300 }}>AI</span>
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/chatbot" className="nav-link">Chatbot</Link>
        <Link to="/calculator" className="nav-link">Calculator</Link>
        <Link to="/ocr" className="nav-link">OCR Scan</Link>
        <Link to="/voice" className="nav-link">Voice AI</Link>
      </div>
    </nav>
  );
}

export default Navbar;