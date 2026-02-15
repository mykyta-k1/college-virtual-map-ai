import { useState } from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { AiChatButton } from './AiChatButton';
import { AiChatWindow } from './AiChatWindow';

/**
 * AI Chat Container
 * Manages chat state and only shows when online
 */
export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const isOnline = useOnlineStatus();

  // Don't render if offline
  if (!isOnline) return null;

  return (
    <>
      <AiChatButton onClick={() => setIsOpen(true)} />
      <AiChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
