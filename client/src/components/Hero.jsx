import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container text-center flex-col items-center justify-center animate-fade-in" style={{ padding: '120px 0' }}>
      <h1 className="text-gradient mb-6" style={{ fontSize: '4rem', lineHeight: 1.1 }}>
        AI-Powered <br /> Traffic Law Assistant
      </h1>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 40px auto' }}>
        Know your rights, challans, and traffic laws instantly with our advanced legal AI.
      </p>

      <div className="flex gap-4 justify-center">
        <Link to="/chatbot" className="btn-primary animate-pulse-glow">
          Chat with AI
        </Link>
        <Link to="/calculator" className="btn-secondary">
          Calculate Fine
        </Link>
      </div>
    </div>
  );
}

export default Hero;