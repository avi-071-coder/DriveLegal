# DriveLegal AI

An AI-powered traffic law assistant providing localized challan calculations and interactive legal guidance.

## Overview
DriveLegal AI brings together national and state-level traffic regulations into a centralized, user-friendly platform. It features an automated fine calculator with dynamic filtering based on location, an OCR scanner for reading physical challans, and an integrated AI chatbot for instant legal inquiries.

## Features
- **Smart Fine Calculator:** Calculates traffic fines dynamically based on selected State, Violation, and Vehicle Type.
- **Auto-Location Detection:** Automatically detects your state to provide geo-fenced local traffic fine information.
- **AI Chatbot & Voice Assistant:** Ask questions about your rights and get immediate, intelligent answers.
- **OCR Scanner:** Upload documents or challans to instantly extract and read text.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS (Design System overridden with custom Vanilla CSS for premium aesthetic), Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express, MongoDB (Mongoose).
- **AI/ML:** Google Gemini API (for chatbot), Tesseract.js (for OCR).

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB URI
- Google Gemini API Key

### Installation

1. **Clone the repository**
2. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create a .env file with your MONGO_URI and GEMINI_API_KEY
   npm run dev
   ```
3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
