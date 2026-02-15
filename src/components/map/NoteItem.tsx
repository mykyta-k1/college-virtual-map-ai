import { Info } from 'lucide-react';

interface NoteItemProps {
  text: string;
}

export function NoteItem({ text }: NoteItemProps) {
  return (
    <div className="relative overflow-hidden p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
      <div className="flex gap-3">
        <div className="shrink-0 mt-0.5">
          <Info className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">
            Примітка
          </h4>
          <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed font-medium">
            {text}
          </p>
        </div>
      </div>
      {/* Decorative background icon */}
      <Info className="absolute -right-4 -bottom-4 h-24 w-24 text-amber-500/10 rotate-12 pointer-events-none" />
    </div>
  );
}
