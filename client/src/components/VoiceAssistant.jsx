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
    <div className="glass-panel animate-fade-in-up" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2 className="text-gradient mb-6" style={{ fontSize: '2.5rem' }}>Voice Legal AI</h2>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '1.1rem' }}>
        Speak directly to our AI to get instant traffic law information.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '48px' }}>
        <button
          onClick={startListening}
          className={`btn-primary ${isListening ? 'animate-pulse-glow' : ''}`}
          style={{ 
            borderRadius: '50%', 
            width: '100px', 
            height: '100px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: isListening ? 'rgba(0, 245, 212, 0.2)' : 'var(--gradient-glow)',
            boxShadow: isListening ? '0 0 40px rgba(0, 245, 212, 0.6)' : 'var(--shadow-glow)',
            border: isListening ? '2px solid var(--accent-neon)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {isListening ? <MicOff size={40} color="var(--accent-neon)" /> : <Mic size={40} color="#02080a" />}
        </button>
      </div>

      {text && (
        <div className="glass-panel animate-fade-in-up" style={{ padding: '24px', background: 'rgba(5, 20, 25, 0.6)', borderLeft: '4px solid var(--accent-emerald)', textAlign: 'left', borderRadius: '0 var(--radius-lg) var(--radius-lg) 0' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--accent-emerald)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Transcription:</h3>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>"{text}"</p>
        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;