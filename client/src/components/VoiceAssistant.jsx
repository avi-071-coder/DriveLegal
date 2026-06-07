import { useState } from "react";
import { Mic, MicOff } from "lucide-react";

function VoiceAssistant() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!window.webkitSpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 className="text-gradient mb-6" style={{ fontSize: '2rem' }}>Voice Assistant</h2>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Speak directly to our AI to get instant traffic law information.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <button
          onClick={startListening}
          className={`btn-primary ${isListening ? 'animate-pulse-glow' : ''}`}
          style={{ 
            borderRadius: '50%', 
            width: '80px', 
            height: '80px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: isListening ? 'rgba(255, 0, 85, 0.2)' : 'var(--gradient-glow)',
            boxShadow: isListening ? '0 0 30px rgba(255, 0, 85, 0.5)' : 'var(--shadow-glow)'
          }}
        >
          {isListening ? <MicOff size={32} color="#ff0055" /> : <Mic size={32} color="white" />}
        </button>
      </div>

      {text && (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', background: 'rgba(0, 240, 255, 0.05)', borderLeft: '4px solid var(--accent-cyan)', textAlign: 'left' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--accent-cyan)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>You said:</h3>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>"{text}"</p>
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;