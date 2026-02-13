import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { FuseResult } from "fuse.js";
import type { SearchableRoom } from "@/lib/search";
import { getRoomIcon } from "./mapUtils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            // Check if click is outside the dropdown
            // Note: We might need to handle the input field separately if it's not part of this component
            // But usually the input has its own click handler or we rely on blur?
            // Actually, if we click the input, we don't want to close it immediately if we want to keep typing.
            // But here we are checking if click is outside the dropdown REF.
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // If the click target is NOT the search input (we can't easily check that here without passing a ref to it)
                // A common pattern is to just close it. If they click input, onFocus/onClick on input will open it again.
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible, onClose]);

    if (!isVisible || results.length === 0) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "absolute top-14 left-0 right-0 bg-background/95 backdrop-blur-md rounded-xl border border-border/50 shadow-xl overflow-hidden z-30 animate-in fade-in zoom-in-95 duration-200"
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
                            {/* Icon Container */}
                            <div className="flex-shrink-0 p-2 bg-secondary/50 rounded-md group-hover:bg-background transition-colors">
                                {getRoomIcon(item.type, "w-5 h-5")}
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold text-sm truncate text-foreground">
                                        {item.label}
                                    </span>
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
                                        👤 {item.teacherNames[0]} {item.teacherNames.length > 1 && `+${item.teacherNames.length - 1}`}
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
