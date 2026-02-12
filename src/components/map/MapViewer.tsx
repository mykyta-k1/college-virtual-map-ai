import { useState } from "react";
import { Search, Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FloorData } from "@/config/floorsConfig";
import { cn } from "@/lib/utils";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { useMapSearch } from "@/hooks/useMapSearch";

interface MapViewerProps {
    floor: FloorData;
    allFloors: { id: number; label: string }[];
    onFloorChange: (id: number) => void;
    onSearch?: (query: string) => void;
}

/**
 * Component for controlling zoom (Vertical Slider).
 * Mobile optimized: smaller scale/padding.
 */
function ZoomControls({ scale }: { scale: number }) {
    const { zoomIn, zoomOut, setTransform, instance } = useControls();

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newScale = parseFloat(e.target.value);
        const { positionX, positionY } = instance.transformState;
        setTransform(positionX, positionY, newScale, 0);
    };

    return (
        <div className="absolute top-24 left-4 z-20 flex flex-col items-center gap-2 bg-background/90 backdrop-blur rounded-full py-2 px-1.5 shadow-lg border border-border/50 transition-all md:py-3 md:px-2 md:scale-100 scale-90 origin-top-left">
            <button
                onClick={() => zoomIn(0.2)}
                className="p-1 md:p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
                title="Збільшити"
            >
                <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Vertical Slider Track Container */}
            <div className="h-24 md:h-32 w-6 relative flex items-center justify-center">
                <input
                    type="range"
                    min={0.5}
                    max={4}
                    step={0.1}
                    value={scale}
                    onChange={handleSliderChange}
                    className="absolute w-24 md:w-32 h-6 -rotate-90 origin-center cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-secondary/50 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 md:[&::-webkit-slider-thumb]:h-4 md:[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:-mt-[3px] md:[&::-webkit-slider-thumb]:-mt-1.5 hover:[&::-webkit-slider-thumb]:bg-primary/80"
                />
            </div>

            <button
                onClick={() => zoomOut(0.2)}
                className="p-1 md:p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
                title="Зменшити"
            >
                <Minus className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <span className="text-[10px] font-bold text-muted-foreground select-none">
                {Math.round(scale * 100)}%
            </span>
        </div>
    );
}

/**
 * Компонент відображення SVG карти поверху з елементами управління.
 * 
 * - Search moved to Left.
 * - Zoom controls optimized for mobile.
 * - Overlay text contrast increased.
 */
export default function MapViewer({ floor, allFloors, onFloorChange, onSearch: propOnSearch }: MapViewerProps) {
    // Сортуємо поверхи від найбільшого до найменшого (3 -> 1)
    const sortedFloors = [...allFloors].sort((a, b) => b.id - a.id);
    const [currentScale, setCurrentScale] = useState(1);

    // Internal Search Hook
    const { search } = useMapSearch(allFloors as any); // Casting for now if types mismatch slightly with deep structures

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        search(query); // Logs to console
        if (propOnSearch) propOnSearch(query);
    };

    return (
        <div className="relative w-full h-full bg-dot-pattern overflow-hidden group select-none">

            {/* --- SVG MAP CONTAINER WITH ZOOM --- */}
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                wheel={{ step: 0.1 }}
                onTransformed={(e) => setCurrentScale(e.state.scale)}
                doubleClick={{ disabled: true }}
            >
                {() => (
                    <>
                        <ZoomControls scale={currentScale} />

                        <TransformComponent
                            wrapperClass="w-full h-full"
                            contentClass="w-full h-full flex items-center justify-center"
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{ width: "100%", height: "100%" }}
                        >
                            <img
                                src={floor.svgUrl}
                                alt={`План ${floor.label}`}
                                className="w-full h-full object-contain transition-transform duration-75 ease-out select-none pointer-events-none"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{ pointerEvents: 'auto' }}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>

            {/* --- SEARCH OVERLAY (Top Left) --- */}
            <div className="absolute top-4 left-14 right-4 md:left-20 md:right-auto md:w-96 z-20 transition-all">
                <div className="relative group/search">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <Search className="w-5 h-5 text-black" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Пошук кабінету..."
                        className="w-full pl-11 h-12 rounded-full border-white/20 bg-white/40 backdrop-blur-md shadow-lg transition-all focus-visible:ring-black/20 focus-visible:bg-white/80 text-black placeholder:text-black/60 font-medium"
                        onChange={handleSearchInput}
                    />
                </div>
            </div>

            {/* --- FLOOR SELECTOR OVERLAY (Right Center) --- */}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20">
                <div className="flex flex-col items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 shadow-lg">
                    {sortedFloors.map((f) => (
                        <SimpleTooltip key={f.id} content={`${f.label}`} delay={300} side="left">
                            <button
                                onClick={() => onFloorChange(f.id)}
                                className={cn(
                                    "w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-bold transition-all duration-200 flex items-center justify-center shadow-sm",
                                    floor.id === f.id
                                        ? "bg-background text-foreground scale-110 ring-2 ring-border z-10"
                                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                )}
                            >
                                {f.id}
                            </button>
                        </SimpleTooltip>
                    ))}
                </div>
            </div>

            {/* Назва поверху (overlay fade - Increased Contrast) */}
            <div className="absolute top-20 right-4 md:top-6 md:right-6 pointer-events-none opacity-100 transition-all">
                <span className="text-3xl md:text-4xl font-black text-foreground/20 select-none">
                    {floor.label}
                </span>
            </div>

        </div>
    );
}
