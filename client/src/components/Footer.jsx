function Footer() {
  return (
    <footer className="glass-panel" style={{ textAlign: 'center', padding: '24px', marginTop: '60px', borderRadius: '0' }}>
      <h2 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
        DriveLegal AI
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}>
        AI Powered Traffic Law Assistant
      </p>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', opacity: 0.7 }}>
        IIT Madras Hackathon Project
      </p>
    </footer>
  );
}

export default Footer;