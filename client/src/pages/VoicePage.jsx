import Navbar from "../components/Navbar";
import VoiceAssistant from "../components/VoiceAssistant";
import Footer from "../components/Footer";

function VoicePage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper container">
        <VoiceAssistant />
      </main>
      <Footer />
    </>
  );
}

export default VoicePage;