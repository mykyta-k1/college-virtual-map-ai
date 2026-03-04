import { aiConfig } from '@/config/aiConfig';

interface AiWorkerResponse {
  response: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface AiWorkerRequest {
  message: string;
}

/**
 * Service for interacting with AI Worker
 */
export class AiService {
  private static instance: AiService;

  private constructor() { }

  static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  /**
   * Send a message to the AI worker and get response
   */
  async sendMessage(message: string): Promise<AiWorkerResponse> {
    if (!aiConfig.workerUrl) {
      throw new Error('AI Worker URL not configured.');
    }

    const request: AiWorkerRequest = { message };

    const response = await fetch(aiConfig.workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`AI Worker request failed: ${response.status} ${response.statusText}`);
    }

    const data: AiWorkerResponse = await response.json();
    return data;
  }
}
