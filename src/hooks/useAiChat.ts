import { useState, useEffect, useRef } from 'react';
import { AiService } from '@/services/ai.service';
import { parseAiResponse, type MetaTag } from '@/utils/ai.utils';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    metaTag?: MetaTag;
}

interface UseAiChatState {
    messages: Message[];
    input: string;
    isLoading: boolean;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    setInput: (input: string) => void;
    sendMessage: () => Promise<void>;
}

/**
 * Domain hook for AI Chat state management
 * Handles message history, loading state, and AI worker communication
 */
export function useAiChat(isOpen: boolean): UseAiChatState {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const aiService = AiService.getInstance();

    // Send welcome message after 1 second of opening
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const timer = setTimeout(() => {
                const welcomeMessage: Message = {
                    id: 'welcome',
                    role: 'assistant',
                    content: 'Привіт! 👋 Я можу допомогти тобі знайти кабінети, викладачів або інші місця в коледжі. Просто задай своє питання!',
                    timestamp: new Date(),
                };
                setMessages([welcomeMessage]);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Send message to AI worker
            const response = await aiService.sendMessage(userMessage.content);

            // Parse response for meta tags
            const parsed = parseAiResponse(response.response);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: parsed.content,
                timestamp: new Date(),
                metaTag: parsed.metaTag || undefined,
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('AI Worker error:', error);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '❌ Вибачте, виникла помилка при обробці вашого запиту. Спробуйте ще раз пізніше.',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        input,
        isLoading,
        scrollRef,
        setInput,
        sendMessage,
    };
}
