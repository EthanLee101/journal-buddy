// AI Analysis functionality - placeholder for demo
// To enable: add OPENAI_API_KEY to environment variables

export async function analyzeEntry(entryId: string) {
  // Placeholder implementation for demo
  console.log('AI analysis requested for entry:', entryId);
  
  // Return mock analysis data
  return {
    sentiment: 0.7,
    emotions: {
      joy: 0.8,
      sadness: 0.2,
      anger: 0.1,
      fear: 0.1,
      surprise: 0.3,
      disgust: 0.0
    },
    keywords: ['positive', 'growth', 'reflection'],
    insight: 'Your entry shows a positive outlook and self-reflection. Keep up the great work!'
  };
}

export async function analyzeEntryAsync(entryId: string) {
  // Queue for background processing (disabled for demo)
  console.log('Background AI analysis queued for entry:', entryId);
  return Promise.resolve();
} 