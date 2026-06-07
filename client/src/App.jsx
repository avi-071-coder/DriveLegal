// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import ChatbotPage from "./pages/ChatbotPage";
// import CalculatorPage from "./pages/CalculatorPage";
// import OCRPage from "./pages/OCRPage";
// import LawsPage from "./pages/LawsPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/chatbot" element={<ChatbotPage />} />
//         <Route path="/calculator" element={<CalculatorPage />} />
//         <Route path="/ocr" element={<OCRPage />} />
//         <Route path="/laws" element={<LawsPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import ChatbotPage from "./pages/ChatbotPage";

import CalculatorPage from "./pages/CalculatorPage";

import OCRPage from "./pages/OCRPage";

import LawsPage from "./pages/LawsPage";

import VoicePage from "./pages/VoicePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/chatbot"
          element={<ChatbotPage />}
        />

        <Route
          path="/calculator"
          element={<CalculatorPage />}
        />

        <Route
          path="/ocr"
          element={<OCRPage />}
        />

        <Route
          path="/laws"
          element={<LawsPage />}
        />

        <Route
          path="/voice"
          element={<VoicePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;