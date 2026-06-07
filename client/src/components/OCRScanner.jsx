import Tesseract from "tesseract.js";
import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

function OCRScanner() {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setText("");
    setIsProcessing(true);

    try {
      const result = await Tesseract.recognize(file, "eng");
      setText(result.data.text);
    } catch (error) {
      console.error("OCR Error:", error);
      setText("Error scanning document. Please try again with a clearer image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <FileText color="var(--accent-purple)" size={32} />
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Challan Scanner</h2>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Upload a photo of your traffic challan or legal document to instantly extract text.
      </p>

      <div 
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: '2px dashed var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          cursor: 'pointer',
          background: 'rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          e.currentTarget.style.background = 'rgba(0, 240, 255, 0.05)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
        }}
      >
        <Upload size={48} color="var(--accent-cyan)" />
        <div>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '8px' }}>Click to Upload Document</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>PNG, JPG, or JPEG up to 10MB</p>
        </div>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImage} 
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>

      {preview && (
        <div style={{ marginTop: '32px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Scan Results</h3>
            {isProcessing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)' }}>
                <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Processing Image...</span>
              </div>
            )}
          </div>
          
          <div className="grid-cols-2" style={{ gap: '24px' }}>
            <div>
              <img 
                src={preview} 
                alt="Document Preview" 
                style={{ width: '100%', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', objectFit: 'contain', maxHeight: '400px', background: '#000' }} 
              />
            </div>
            
            <div className="glass-panel" style={{ padding: '24px', background: 'rgba(0,0,0,0.3)', minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
              {isProcessing ? (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  <p className="animate-pulse-glow" style={{ padding: '10px' }}>Extracting text...</p>
                </div>
              ) : (
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'monospace', fontSize: '0.9rem' }}>
                  {text || "No text could be extracted."}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OCRScanner;