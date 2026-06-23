# DriveLegal AI

## The Problem
Navigating traffic laws and understanding penalty structures is confusing and intimidating for the average driver. Traffic rules vary drastically between regions, physical challans (Fines) are hard to decipher, and finding legally accurate, reliable information quickly is a constant challenge.

## The Solution: DriveLegal AI
**DriveLegal AI** is an intelligent, nationwide traffic law assistant designed to make legal compliance simple. It provides instant, localized fine calculations, automated document scanning, and reliable AI-driven legal guidance covering all Indian States and Union Territories. 

## Key Features
- **Nationwide Fine Calculator:** Instantly estimate accurate traffic fines based on specific states, vehicle types, and over 15+ violation types.
- **On-Device Challan OCR:** Securely scan physical paper tickets or digital challans directly in the browser. Processing is done entirely on-device via WebAssembly, guaranteeing absolute privacy.
- **AI Legal Assistant:** Ask direct traffic law questions and receive concise, structured answers. Powered by a high-speed AI routing system with automatic fallbacks for maximum uptime and zero data logging.
- **Driver's Codex:** A comprehensive digital lexicon of driving regulations, covering Constitutional Laws, International Standards, Road Signs, and Basic Rules.
- **Enterprise Security:** Built with strict rate limiting, NoSQL injection sanitization, and secure HTTP headers to ensure safe, reliable operations.

## Tech Stack
- **Frontend:** React, Vite, Framer Motion
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI & Processing:** Google Gemini API (Primary), OpenRouter API (Fallback), Tesseract.js (Local OCR)
- **Security:** Helmet, Express-Rate-Limit, Express-Mongo-Sanitize

## Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Database (Local or Atlas)
- Google Gemini API Key

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_key
```
Seed the nationwide database and start the server:
```bash
node seed.js
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory and run:
```bash
cd client
npm install
npm run dev
```
