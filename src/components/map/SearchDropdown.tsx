import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { FuseResult } from 'fuse.js';
import type { SearchableRoom } from '@/services/search.service';
import { getRoomIcon } from '@/utils/icon.utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchDropdownProps {
  results: FuseResult<SearchableRoom>[];
  onSelect: (item: SearchableRoom) => void;
  isVisible: boolean;
  onClose: () => void;
}

export function SearchDropdown({ results, onSelect, isVisible, onClose }: SearchDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Перевірка кліку поза межами дропдауну
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible || results.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute top-2 left-0 right-0 bg-background/95 backdrop-blur-md rounded-xl border border-border/50 shadow-xl overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200',
      )}
    >
      <ScrollArea className="h-auto max-h-[60vh]">
        <div className="p-2 pb-4 flex flex-col gap-1">
          {results.map(({ item }) => (
            <button
              key={`${item.id}-${item.floorId}`}
              onClick={() => onSelect(item)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
            >
              {/* Контейнер іконки */}
              <div className="flex-shrink-0 p-2 bg-secondary/50 rounded-md group-hover:bg-background transition-colors">
                {getRoomIcon(item.type, 'w-5 h-5')}
              </div>

              {/* Текстовий контент */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm truncate text-foreground">{item.label}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                    {item.floorId} Поверх
                  </span>
                </div>

                {item.description && (
                  <span className="text-xs text-muted-foreground truncate w-full">
                    {item.description}
                  </span>
                )}

                {item.teacherNames && item.teacherNames.length > 0 && (
                  <span className="text-[10px] text-primary/80 truncate mt-0.5">
                    👤 {item.teacherNames[0]}{' '}
                    {item.teacherNames.length > 1 && `+${item.teacherNames.length - 1}`}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
