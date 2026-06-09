import { useState, useRef, useEffect } from "react";
import API from "../api/api";
import { Mic, Send, Bot, CheckCircle2 } from "lucide-react";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I am your AI Legal Assistant. How can I help you understand traffic laws or fines today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await API.post("/api/chat", { message: input });
      const botMessage = { role: "bot", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Sorry, I am having trouble connecting to the server.";
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: errorMessage },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', overflow: 'hidden' }}>
      
      {/* Messages Area */}
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {messages.map((msg, index) => (
          <div key={index} className="animate-fade-in-up" style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            
            {msg.role === 'bot' && (
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ position: 'relative' }}>
                  <img src="/traffic_police_ai.png" alt="AI Avatar" className="animate-breathe" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0, 245, 212, 0.4)', background: 'rgba(0,0,0,0.5)' }} />
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: 'var(--accent-neon)', borderRadius: '50%', border: '2px solid var(--bg-tertiary)', boxShadow: '0 0 10px var(--accent-neon)' }}></div>
                </div>
                
                {/* Complex Bot Card */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', borderTopLeftRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  {msg.content.toLowerCase().includes("section 127") ? (
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Section 127 MV Act Explained</h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {msg.content}
                      </p>
                      
                      <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeft: '3px solid var(--accent-emerald)', padding: '16px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <CheckCircle2 size={18} color="var(--accent-emerald)" /> <span>Key points and violation impact</span>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <CheckCircle2 size={18} color="var(--accent-emerald)" /> <span>Required documentation proof</span>
                          </li>
                          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={18} color="var(--accent-emerald)" /> <span>Options for challenging the fine</span>
                          </li>
                        </ul>
                      </div>

                      {/* Embedded Generated Asset */}
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 'bold', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>REFERENCE IMAGE</div>
                        <img src="/car_towed_asset.png" alt="Towed car" style={{ width: '100%', display: 'block', maxHeight: '200px', objectFit: 'cover' }} />
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>{msg.content}</p>
                  )}
                </div>
              </div>
            )}

            {msg.role === 'user' && (
              <div style={{ background: 'var(--gradient-glow)', color: '#000', padding: '16px 20px', borderRadius: '20px', borderBottomRightRadius: '4px', fontSize: '1rem', fontWeight: '500', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
                {msg.content}
              </div>
            )}
            
          </div>
        ))}

        {isLoading && (
          <div className="animate-fade-in-up" style={{ alignSelf: 'flex-start', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <img src="/traffic_police_ai.png" alt="AI Avatar" className="animate-breathe" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0, 245, 212, 0.4)' }} />
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', borderTopLeftRadius: '4px', display: 'flex', gap: '6px', alignItems: 'center', height: '64px' }}>
              <span className="dot-pulse" style={{ width: '8px', height: '8px', background: 'var(--accent-neon)', borderRadius: '50%' }}></span>
              <span className="dot-pulse delay-1" style={{ width: '8px', height: '8px', background: 'var(--accent-neon)', borderRadius: '50%' }}></span>
              <span className="dot-pulse delay-2" style={{ width: '8px', height: '8px', background: 'var(--accent-neon)', borderRadius: '50%' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '24px 32px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px', padding: '8px 8px 8px 24px', transition: 'all 0.3s' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a legal question or describe your issue..."
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent', color: 'white' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '12px', color: 'var(--text-muted)', borderRadius: '50%', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.color='white'} onMouseOut={e => e.currentTarget.style.color='var(--text-muted)'}>
              <Mic size={22} />
            </button>
            <button onClick={sendMessage} className="btn-primary" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%', cursor: 'pointer' }}>
              <Send size={20} style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .dot-pulse { animation: pulseBounce 1s infinite alternate; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        @keyframes pulseBounce { 0% { transform: translateY(0); opacity: 0.3; } 100% { transform: translateY(-6px); opacity: 1; } }
        
        .animate-breathe { animation: breathe 3s ease-in-out infinite; }
        @keyframes breathe {
          0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 5px rgba(0,245,212,0.3)); }
          50% { transform: translateY(-4px) scale(1.05); filter: drop-shadow(0 0 15px rgba(0,245,212,0.6)); }
        }
      `}</style>
    </div>
  );
}

export default ChatBox;