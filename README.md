# DriveLegal AI

An ultra-premium, AI-powered traffic law assistant providing localized challan calculations, document OCR scanning, and interactive legal guidance.

---

## Overview
**DriveLegal AI** simplifies traffic law lookup by combining local regulations with state of the art AI. The app offers a geo-fenced fine calculator, intelligent OCR scanner, and a highly responsive AI Legal Assistant with an automatic fast fallback system.

---

## Key Features
- **Smart Fine Calculator:** Dynamically computes traffic fines based on State, Violation type, and Vehicle Type.
- **Auto-Location Detection:** Leverages browser geolocation to automatically detect your state and pre-filter local regulations.
- **AI Legal Assistant:** Ask traffic law questions in plain text and get instant, structured, concise answers (with automatic post-processed plain-text rendering and a 3.5s fast-timeout fallback to OpenRouter).
- **Challan OCR Scanner:** Instantly extract text from digital uploads or photos of physical challan papers using on-device OCR.
  - **Take Photo (Mobile Integration):** Viewports on phones and tablets feature a bottom drawer option letting users capture physical papers instantly using the native device camera (`capture="environment"` integration) or upload from the library.
- **Traffic Lexicon (Driver's Codex):** A unified legal dashboard mapping road safety guidelines across four categories: Basic Rules, Constitutional Laws, International Standards, and Road Signs. Features:
  - Custom vector animations (e.g., roundabout right-of-way motion simulator, spinning global standard network map).
  - High-fidelity custom illustration background cards mapped uniquely to each guideline.
  - Standardized `.page-header` layout and radial-masked background watermarks (`codex_bg.jpg`) for perfect interface consistency.

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (Core layouts), Custom CSS Design System (Premium Glassmorphism & custom variables).
- **Backend:** Node.js, Express, Mongoose (MongoDB).
- **AI Integration:** Google Gemini API (`gemini-flash-latest`), OpenRouter API (`openrouter/free` fallback), Tesseract.js (On-device OCR).

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Database (Local instance or Atlas URI)
- Google Gemini API Key
- OpenRouter API Key (Optional fallback)

---

## Installation and Run

### 1. Setup Backend
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   GEMINI_API_KEY=your_gemini_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
4. Seed the database with local laws:
   ```bash
   node seed.js
   ```
5. Start the backend:
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```


