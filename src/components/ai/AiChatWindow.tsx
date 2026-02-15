import { useNavigate } from 'react-router-dom';
import { X, Send, Sparkles, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAiChat } from '@/hooks/useAiChat';

interface AiChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * AI Chat Window Component
 * Interactive chat interface with welcome message and worker integration
 */
export function AiChatWindow({ isOpen, onClose }: AiChatWindowProps) {
    const navigate = useNavigate();
    const { messages, input, isLoading, scrollRef, setInput, sendMessage } = useAiChat(isOpen);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleShowOnMap = (label: string) => {
        // Navigate to map page and trigger search with the label
        navigate(`/?search=${encodeURIComponent(label)}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className={cn(
                'fixed z-50 bg-background border border-border rounded-2xl shadow-2xl',
                'flex flex-col overflow-hidden',
                'bottom-36 right-4 md:bottom-24 md:right-8',
                'w-[calc(100vw-2rem)] max-w-md h-[500px]',
                'animate-in slide-in-from-bottom-4 duration-300'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">AI Асистент</h3>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id}>
                            <div
                                className={cn(
                                    'flex gap-2 items-start',
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                )}
                            >
                                {/* Assistant Avatar */}
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground'
                                    )}
                                >
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                </div>

                                {/* User Avatar */}
                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1">
                                        <User className="w-4 h-4 text-primary-foreground" />
                                    </div>
                                )}
                            </div>

                            {/* Show "Show on Map" button if meta tag exists */}
                            {message.role === 'assistant' && message.metaTag && (
                                <div className="flex justify-start mt-2 ml-10">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleShowOnMap(message.metaTag!.label)}
                                        className="gap-2 text-xs"
                                    >
                                        <MapPin className="w-3 h-3" />
                                        Показати на мапі
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start gap-2 items-start">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            <div className="bg-secondary rounded-2xl px-4 py-2 text-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Напиши своє питання..."
                        className="flex-1 px-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={sendMessage}
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className="rounded-full"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
