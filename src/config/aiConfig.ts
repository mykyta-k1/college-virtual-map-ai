/**
 * AI Chat Configuration
 *
 * Environment variables for AI Worker integration
 */

export const aiConfig = {
  // Cloudflare Worker AI endpoint
  workerUrl: import.meta.env.VITE_AI_WORKER_URL || '',

  // API Key for authentication
  apiKey: import.meta.env.VITE_AI_API_KEY || '',

  // Check if AI is enabled (both URL and key must be present)
  isEnabled: Boolean(import.meta.env.VITE_AI_WORKER_URL && import.meta.env.VITE_AI_API_KEY),
};
