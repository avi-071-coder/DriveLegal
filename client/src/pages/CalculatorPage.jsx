import Navbar from "../components/Navbar";
import Calculator from "../components/Calculator";
import Footer from "../components/Footer";

function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper container">
        <Calculator />
      </main>
      <Footer />
    </>
  );
}

export default CalculatorPage;