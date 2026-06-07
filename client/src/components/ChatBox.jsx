import { useState } from "react";
import API from "../api/api";
import { Loader2 } from "lucide-react"; // Wait, I see lucide-react in package.json, let's use it for a premium feel

function ChatBox() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await API.post("/api/chat", {
        message,
      });
      setResponse(res.data.response);
    } catch (error) {
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="text-gradient mb-6" style={{ fontSize: '2rem' }}>Legal Assistant AI</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <textarea
          className="input-glass"
          rows="5"
          placeholder="Describe your traffic law situation here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'vertical', minHeight: '120px' }}
        />

        <button
          onClick={sendMessage}
          className="btn-primary"
          disabled={isLoading}
          style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
              Thinking...
            </>
          ) : (
            "Ask AI"
          )}
        </button>

        {response && (
          <div className="glass-panel mt-8 animate-fade-in" style={{ padding: '24px', background: 'rgba(138, 43, 226, 0.05)', borderLeft: '4px solid var(--accent-cyan)' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--accent-cyan)' }}>AI Response:</h3>
            <p style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;