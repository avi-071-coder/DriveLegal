import { Link, useLocation } from "react-router-dom";
import { Calculator, ScanLine, Bot, Home, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

function GlobalNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/calculator', icon: <Calculator size={20} />, label: 'Calculator' },
    { path: '/ocr', icon: <ScanLine size={20} />, label: 'OCR Scanner' },
    { path: '/chatbot', icon: <Bot size={20} />, label: 'AI Chat' },
    { path: '/codex', icon: <BookOpen size={20} />, label: 'Codex' }
  ];

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '90%',
        maxWidth: '400px',
        background: 'rgba(18, 18, 18, 0.75)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '12px',
        borderRadius: '100px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        zIndex: 50
      }}>
        {navItems.map(item => {
          const isActive = currentPath === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isActive ? '#10B981' : '#A1A1AA',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                padding: '8px',
                borderRadius: '50%',
                background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              }}>
                {item.icon}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '32px',
      right: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(18, 18, 18, 0.75)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.05)',
      padding: '8px 12px',
      borderRadius: '100px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      zIndex: 50
    }}>
      {navItems.map((item, index) => {
        const isActive = currentPath === item.path;
        return (
          <div key={item.path} style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              to={item.path} 
              title={item.label} 
              style={{ 
                padding: '10px', 
                borderRadius: '50%', 
                transition: 'all 0.3s ease', 
                background: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent', 
                color: isActive ? '#10B981' : '#A1A1AA' 
              }}
            >
              {item.icon}
            </Link>
            {index < navItems.length - 1 && (
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.05)', margin: '0 4px' }}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default GlobalNav;
