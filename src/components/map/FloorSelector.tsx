import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { cn } from '@/lib/utils';

interface FloorSelectorProps {
    currentFloorId: number;
    allFloors: { id: number; label: string }[];
    onFloorChange: (id: number) => void;
}

export function FloorSelector({ currentFloorId, allFloors, onFloorChange }: FloorSelectorProps) {
    const sortedFloors = [...allFloors].sort((a, b) => b.id - a.id);

    return (
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20">
            <div className="flex flex-col items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 shadow-lg">
                {sortedFloors.map((f) => (
                    <SimpleTooltip key={f.id} content={`${f.label}`} delay={300} side="left">
                        <button
                            onClick={() => onFloorChange(f.id)}
                            className={cn(
                                'w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-bold transition-all duration-200 flex items-center justify-center shadow-sm',
                                currentFloorId === f.id
                                    ? 'bg-background text-foreground scale-110 ring-2 ring-border z-10'
                                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground',
                            )}
                        >
                            {f.id}
                        </button>
                    </SimpleTooltip>
                ))}
            </div>
        </div>
    );
}
