import { Link } from "react-router-dom";
import { ArrowRight, CarFront } from "lucide-react";

function Hero() {
  return (
    <div className="container text-center flex-col items-center justify-center relative" style={{ padding: '140px 0', minHeight: '80vh', display: 'flex' }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div className="glass-panel animate-fade-in-up stagger-1 flex-center" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '32px', background: 'rgba(13, 148, 136, 0.1)', border: '1px solid rgba(0, 245, 212, 0.3)', boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)' }}>
        <CarFront size={40} color="var(--accent-neon)" />
      </div>

      <h1 className="text-gradient animate-fade-in-up stagger-2 mb-6" style={{ fontSize: '4.5rem', lineHeight: 1.1, zIndex: 1, position: 'relative' }}>
        Navigate Traffic Laws <br /> <span style={{ color: 'var(--text-primary)', textShadow: 'none', background: 'none', WebkitTextFillColor: 'initial' }}>With AI Precision</span>
      </h1>

      <p className="animate-fade-in-up stagger-3" style={{ color: 'var(--text-secondary)', fontSize: '1.35rem', maxWidth: '650px', margin: '0 auto 48px auto', lineHeight: 1.6, zIndex: 1, position: 'relative' }}>
        Know your rights, instantly calculate challans, and decode complex legal documents with our advanced, hyper-realistic AI legal assistant.
      </p>

      <div className="flex gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s', zIndex: 1, position: 'relative' }}>
        <Link to="/calculator" className="btn-primary animate-pulse-glow flex-center gap-2">
          Calculate Fine <ArrowRight size={20} />
        </Link>
        <Link to="/chatbot" className="btn-secondary flex-center gap-2">
          Ask Legal AI
        </Link>
      </div>
    </div>
  );
}

export default Hero;