import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import Footer from "../components/Footer";

function ChatbotPage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper container">
        <ChatBox />
      </main>
      <Footer />
    </>
  );
}

export default ChatbotPage;