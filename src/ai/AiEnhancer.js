// Frontend AI Enhancer - now uses backend API for security
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function enhanceSummary(text) {
  if (!text || text.trim() === "") {
    return "Please enter your summary first.";
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/enhance-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.enhancedText || "AI enhancement failed. Please try again.";

  } catch (error) {
    console.error("AI Enhancement Error:", error);
    return "AI enhancement failed. Please check your internet connection and try again.";
  }
}
