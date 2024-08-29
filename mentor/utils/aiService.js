// utils/aiService.js
export const fetchAIResponse = async (query) => {
    // Replace this URL with your AI service endpoint
    const response = await fetch('https://your-ai-service.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: query }),
    });
  
    const data = await response.json();
    return data.answer; // Adjust according to your API response format
  };
  