import Navbar from "../components/Navbar";
import OCRScanner from "../components/OCRScanner";
import Footer from "../components/Footer";

function OCRPage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper container">
        <OCRScanner />
      </main>
      <Footer />
    </>
  );
}

export default OCRPage;