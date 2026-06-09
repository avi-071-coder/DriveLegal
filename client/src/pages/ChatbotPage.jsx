import ChatBox from "../components/ChatBox";
import TopNav from "../components/TopNav";

function ChatbotPage() {
  return (
    <div className="app-container animate-fade-in-up" style={{ paddingBottom: '20px', height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Blended Background Watermark */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/chatbot_bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: -1,
        maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)'
      }}></div>

      <div className="page-header" style={{ padding: '20px 0', marginBottom: '20px', border: 'none' }}>
        <h2 className="title-md" style={{ margin: 0 }}>AI Legal Assistant</h2>
        <TopNav />
      </div>

      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <ChatBox />
      </div>
    </div>
  );
}

export default ChatbotPage;