import OCRScanner from "../components/OCRScanner";
import TopNav from "../components/TopNav";

function OCRPage() {
  return (
    <div className="app-container animate-fade-in-up" style={{ paddingBottom: '60px', position: 'relative' }}>
      {/* Blended Background Watermark */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/ocr_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: -1,
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
      }}></div>

      <div className="page-header" style={{ padding: '20px 0', border: 'none' }}>
        <h2 className="title-md" style={{ margin: 0 }}>Challan OCR Scanner</h2>
        <TopNav />
      </div>

      <OCRScanner />
    </div>
  );
}

export default OCRPage;