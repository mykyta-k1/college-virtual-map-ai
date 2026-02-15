import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';

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
    <div className={cn('fixed z-40 bottom-20 right-4 md:bottom-8 md:right-8', className)}>
      <SimpleTooltip content="AI Чат" side="left" delay={500}>
        <Button
          onClick={onClick}
          size="lg"
          className={cn(
            'shadow-2xl rounded-full font-black text-base pointer-events-auto',
            'w-14 h-14 p-0',
            'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70',
            'transition-all duration-300 hover:scale-105 active:scale-95',
          )}
        >
          AI
        </Button>
      </SimpleTooltip>
    </div>
  );
}
