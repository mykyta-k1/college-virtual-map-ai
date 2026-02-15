import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AiChatButtonProps {
    onClick: () => void;
    className?: string;
}

/**
 * Floating AI Chat Button
 * Positioned bottom-right on desktop, closer to edges on mobile
 */
export function AiChatButton({ onClick, className }: AiChatButtonProps) {
    return (
        <Button
            onClick={onClick}
            size="lg"
            className={cn(
                'fixed z-40 shadow-2xl rounded-full gap-2 font-bold',
                'bottom-20 right-4 md:bottom-8 md:right-8',
                'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
                'transition-all duration-300 hover:scale-105 active:scale-95',
                className
            )}
        >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">AI</span>
        </Button>
    );
}
