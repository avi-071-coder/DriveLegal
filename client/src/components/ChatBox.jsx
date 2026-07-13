import { useState, useRef, useEffect } from "react";
import API from "../api/api";
import { Mic, Send, Bot, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I am your AI Legal Assistant. How can I help you understand traffic laws or fines today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? " " : "") + speechResult);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);
    
    recognition.start();
  };

  const sendMessage = async (overrideInput = null) => {
    const currentInput = typeof overrideInput === 'string' ? overrideInput : input;
    if (!currentInput.trim()) return;

    setHasInteracted(true);
    const userMessage = { role: "user", content: currentInput };
    
    // Add user message and an empty bot message placeholder
    setMessages((prev) => [...prev, userMessage, { role: "bot", content: "" }]);
    if (typeof overrideInput !== 'string') setInput("");
    setIsLoading(true);

    try {
      const baseUrl = API.defaults.baseURL;
      const response = await fetch(`${baseUrl}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) throw new Error("Server error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6);
            if (dataStr === "[DONE]") break;
            
            try {
              const data = JSON.parse(dataStr);
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMsgIndex = newMessages.length - 1;
                // Deep copy the last message to prevent React StrictMode mutation bugs
                const lastMsg = { ...newMessages[lastMsgIndex] };
                lastMsg.content += data.text;
                newMessages[lastMsgIndex] = lastMsg;
                return newMessages;
              });
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = "Sorry, I am having trouble connecting to the server. Please try again.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Messages Area */}
      <div className="chat-messages-area" data-lenis-prevent="true">
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              key={index} 
              className={`chat-message-row ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              
              {msg.role === 'bot' && (
                <div className="chat-bot-inner">
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '50%', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <Bot size={24} color="#10B981" />
                  </div>
                  
                  <div className="chat-message-bubble-bot">
                    {msg.content.toLowerCase().includes("section 127") ? (
                      <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '12px', fontWeight: 'bold', color: '#FFFFFF' }}>Section 127 MV Act Explained</h4>
                        <p style={{ fontSize: '0.9rem', color: '#A1A1AA', marginBottom: '16px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                          {msg.content}
                        </p>
                        
                        <div style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeft: '3px solid #10B981', padding: '16px', borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: '#F8FAFC' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                              <CheckCircle2 size={16} color="#10B981" /> <span>Key points and violation impact</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                              <CheckCircle2 size={16} color="#10B981" /> <span>Required documentation proof</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <CheckCircle2 size={16} color="#10B981" /> <span>Options for challenging the fine</span>
                            </li>
                          </ul>
                        </div>
  
                        {/* Embedded Generated Asset */}
                        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                          <img src="/car_towed_asset.png" alt="Towed car" style={{ width: '100%', display: 'block', maxHeight: '160px', objectFit: 'cover' }} />
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#F8FAFC', whiteSpace: 'pre-line' }}>{msg.content}</p>
                    )}
                  </div>
                </div>
              )}
  
              {msg.role === 'user' && (
                <div className="chat-user-bubble">
                  {msg.content}
                </div>
              )}
              
            </motion.div>
          ))}
  
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chat-message-row bot">
              <div className="chat-bot-inner">
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '50%', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <Bot size={24} color="#10B981" />
                </div>
                <div className="chat-message-bubble-bot" style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '44px' }}>
                  <span className="dot-pulse" style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></span>
                  <span className="dot-pulse delay-1" style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></span>
                  <span className="dot-pulse delay-2" style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }}></span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        {/* Quick Prompts */}
        {!hasInteracted && (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '4px', WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="quick-prompts-scroll">
            {[
              "How do I pay my traffic fine online?",
              "What are the standard penalty amounts for common offenses?",
              "What happens if I do not pay my e-challan on time?",
              "How can I contest a wrong or duplicate challan?"
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10B981',
                  padding: '8px 16px',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'; }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about a fine or traffic law..."
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              fontSize: '1rem', 
              background: 'transparent', 
              color: '#FFFFFF',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={startVoiceRecognition}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: isRecording ? '#ef4444' : '#A1A1AA', transition: '0.3s' }}
            >
              <Mic size={20} />
            </button>
            <button onClick={() => sendMessage()} style={{ 
              background: '#10B981', 
              color: '#0A0A0A',
              width: '40px', 
              height: '40px', 
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%', 
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }} onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'} onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
              <Send size={18} style={{ marginLeft: '-2px' }} />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
          position: relative;
        }

        .chat-messages-area {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          padding-bottom: 120px;
        }

        .chat-message-row {
          display: flex;
          width: 100%;
        }
        .chat-message-row.user {
          justify-content: flex-end;
        }
        .chat-message-row.bot {
          justify-content: flex-start;
        }

        .chat-bot-inner {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          max-width: 85%;
        }

        .chat-message-bubble-bot {
          background: transparent;
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 16px 20px;
          border-radius: 16px;
          border-top-left-radius: 4px;
        }

        .chat-user-bubble {
          background: #1A1A1A;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #F8FAFC;
          padding: 16px 20px;
          border-radius: 16px;
          border-bottom-right-radius: 4px;
          font-size: 0.95rem;
          max-width: 75%;
        }

        .chat-input-container {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          z-index: 10;
        }

        .chat-input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(18, 18, 18, 0.85);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 8px 8px 8px 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        .dot-pulse { animation: pulseBounce 1s infinite alternate; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        @keyframes pulseBounce { 0% { transform: translateY(0); opacity: 0.3; } 100% { transform: translateY(-4px); opacity: 1; } }

        @media (max-width: 768px) {
          .chat-bot-inner { max-width: 95%; }
          .chat-user-bubble { max-width: 90%; }
          .chat-input-container { bottom: 90px; } /* Keep above mobile nav */
        }
      `}</style>
    </div>
  );
}

export default ChatBox;