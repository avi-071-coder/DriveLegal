# DriveLegal AI

DriveLegal AI is an AI-powered traffic law assistant that helps users understand traffic regulations, calculate fines, scan challans, and get legal guidance through a conversational interface.

## Overview

The application combines traffic law information, OCR-based document scanning, and AI-powered assistance into a single platform. Users can calculate challans based on state-specific rules, extract information from uploaded documents, and ask traffic-law-related questions in natural language.

## Features

### Fine Calculator

* Calculate traffic fines based on:

  * State
  * Violation type
  * Vehicle category
* Uses state-specific traffic law data for accurate results.

### Location Detection

* Detects the user's location through browser geolocation.
* Automatically selects the relevant state for fine calculations and legal information.

### AI Legal Assistant

* Answers traffic-law-related questions in natural language.
* Provides concise and structured responses.
* Includes automatic fallback support through OpenRouter if the primary AI service is unavailable.

### Challan OCR Scanner

* Extracts text from uploaded challan documents and images.
* Supports both gallery uploads and camera capture on mobile devices.
* Uses on-device OCR processing with Tesseract.js.

### Traffic Lexicon

A centralized reference section containing:

* Basic traffic rules
* Important legal provisions
* International road safety standards
* Road sign explanations

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### AI & OCR

* Google Gemini API
* OpenRouter (Fallback)
* Tesseract.js

## Prerequisites

* Node.js (v18 or higher)
* MongoDB instance or MongoDB Atlas
* Google Gemini API Key
* OpenRouter API Key (optional)

## Installation

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

Seed the database:

```bash
node seed.js
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Future Improvements

* Support for additional regional traffic regulations
* Multilingual legal assistance
* Voice-based interaction
* Challan history tracking
* User authentication and saved reports

```
```
