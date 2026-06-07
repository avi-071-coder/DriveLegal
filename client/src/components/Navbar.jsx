import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="glass-nav flex-between px-6 py-4">
      <Link to="/" className="text-gradient font-bold text-2xl" style={{fontFamily: 'Outfit'}}>
        DriveLegal AI
      </Link>

      <div className="flex gap-6" style={{alignItems: 'center'}}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/chatbot" className="nav-link">Chatbot</Link>
        <Link to="/calculator" className="nav-link">Calculator</Link>
        <Link to="/ocr" className="nav-link">OCR</Link>
        <Link to="/voice" className="nav-link">Voice</Link>
      </div>
    </nav>
  );
}

export default Navbar;