/**
 * AI Chat Configuration
 *
 * Environment variables for AI Worker integration
 */

export const aiConfig = {
  // Use local relative proxy path rather than absolute URL
  workerUrl: '/api/ai/chat',

  // Assume enabled since we do not expose secrets to the browser
  // A healthier check would be an explicit VITE_FEATURE_AI=true if we need to toggle it
  isEnabled: true,
};
