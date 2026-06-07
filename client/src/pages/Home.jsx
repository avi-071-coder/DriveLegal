import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main className="page-wrapper">
        <Hero />
      </main>
      <Footer />
    </>
  );
}

export default Home;