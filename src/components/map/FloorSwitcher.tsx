import { cn } from "@/lib/utils";
import type { FloorData } from "@/config/floorsConfig";

interface FloorSwitcherProps {
    floors: FloorData[];
    activeFloor: number;
    onFloorChange: (floorId: number) => void;
}

/**
 * Компонент перемикання поверхів.
 * Відображає великі кнопки з мініатюрою SVG плану поверху.
 */
export default function FloorSwitcher({ floors, activeFloor, onFloorChange }: FloorSwitcherProps) {
    return (
        <div className="flex flex-col gap-3">
            {floors.map((floor) => (
                <button
                    key={floor.id}
                    onClick={() => onFloorChange(floor.id)}
                    className={cn(
                        "group relative flex flex-col items-center justify-center gap-2",
                        "w-full min-h-[120px] p-3 rounded-xl border-2 transition-all duration-200",
                        "hover:shadow-md hover:scale-[1.02]",
                        activeFloor === floor.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border bg-card hover:border-primary/40"
                    )}
                >
                    {/* Мініатюра SVG плану */}
                    <div className="w-full h-16 overflow-hidden rounded-md bg-muted/30 flex items-center justify-center">
                        <img
                            src={floor.svgUrl}
                            alt={`План ${floor.label}`}
                            className={cn(
                                "w-full h-full object-contain opacity-60 transition-opacity",
                                activeFloor === floor.id && "opacity-100"
                            )}
                        />
                    </div>

                    {/* Назва поверху */}
                    <span className={cn(
                        "text-sm font-semibold transition-colors",
                        activeFloor === floor.id
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                    )}>
                        {floor.label}
                    </span>

                    {/* Індикатор активного поверху */}
                    {activeFloor === floor.id && (
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
