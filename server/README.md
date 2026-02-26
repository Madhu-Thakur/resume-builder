# Resume Builder Backend Server

Backend server for the Resume Builder application that provides secure AI functionality.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Set up environment variables:
Create a `.env` file in the `server` directory:
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3001
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST /api/enhance-summary
Enhances a professional summary using AI.

**Request Body:**
```json
{
  "text": "Your professional summary text here"
}
```

**Response:**
```json
{
  "enhancedText": "Enhanced summary text"
}
```

### GET /api/health
Health check endpoint to verify server status.

## Security Notes

- The API key is now stored server-side and not exposed to the frontend
- CORS is enabled to allow requests from the frontend
- Input validation is performed to prevent malicious requests

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key
- `PORT`: Port number for the server (default: 3001)