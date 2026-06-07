import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LawsPage() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper container">
        <div className="glass-panel animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 className="text-gradient mb-6" style={{ fontSize: '2.5rem' }}>Traffic Laws Directory</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            A comprehensive database of traffic laws is coming soon...
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LawsPage;