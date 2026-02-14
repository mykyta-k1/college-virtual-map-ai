import { useState, useEffect } from 'react';
import type { Teacher } from '@/config/teachersConfig';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const [isOnline, setIsOnline] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate online status based on schedule
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const days = ['Su', 'Mn', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      const dayName = days[now.getDay()];
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const isWorking = teacher.schedule.some((slot) => {
        if (slot.day !== dayName) return false;

        const [startH, startM] = slot.start.split(':').map(Number);
        const [endH, endM] = slot.end.split(':').map(Number);
        const startTime = startH * 60 + startM;
        const endTime = endH * 60 + endM;

        return currentTime >= startTime && currentTime <= endTime;
      });

      setIsOnline(isWorking);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [teacher.schedule]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(teacher.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get initials for fallback
  const initials = teacher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group">
      {/* Avatar with Status */}
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
          <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ring-0.5 ring-background',
            isOnline ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600',
          )}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm truncate leading-none text-foreground">
            {teacher.name}
          </h4>
          {isOnline && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-700 dark:text-green-400 leading-none">
              В аудиторії
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="truncate max-w-[120px]">{teacher.position}</span>
          <span className="w-1 h-1 rounded-full bg-border shrink-0" />
          {/* Email Copy Button (Compact) */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 hover:text-primary transition-colors focus:outline-none"
            title={copied ? 'Скопійовано' : 'Копіювати пошту'}
          >
            {copied ? <Check className="h-3 w-3 text-green-500" /> : <Mail className="h-3 w-3" />}
            <span className={cn('truncate max-w-[150px]', copied && 'text-green-600')}>
              {copied ? 'Скопійовано' : teacher.email}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
