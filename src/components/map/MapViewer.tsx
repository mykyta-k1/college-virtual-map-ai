import { useState, useMemo } from "react";
import { Search, Plus, Minus, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FloorData } from "@/config/floorsConfig";
import { cn } from "@/lib/utils";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { SimpleTooltip } from "@/components/ui/simple-tooltip";
import { useMapSearch } from "@/hooks/useMapSearch";
import SVG from "react-inlinesvg";
import { SearchDropdown } from "./SearchDropdown";
import { RoomDetailsSidebar } from "./RoomDetailsSidebar";
import type { SearchableRoom } from "@/lib/search";

interface MapViewerProps {
    floor: FloorData;
    allFloors: { id: number; label: string }[];
    onFloorChange: (id: number) => void;
    onSearch?: (query: string) => void;
}

/**
 * Component for controlling zoom (Horizontal Slider).
 * Hidden on mobile (touch devices usually use pinch-to-zoom).
 */
function ZoomControls({ scale }: { scale: number }) {
    const { zoomIn, zoomOut, setTransform, instance } = useControls();

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newScale = parseFloat(e.target.value);
        const { positionX, positionY } = instance.transformState;
        setTransform(positionX, positionY, newScale, 0);
    };

    return (
        <div className="absolute bottom-4 left-4 z-20 hidden md:flex flex-row items-center gap-4 bg-background/90 backdrop-blur-md rounded-full py-2 px-4 shadow-lg border border-border/50 transition-all">
            <button
                onClick={() => zoomOut(0.2)}
                className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
                title="Зменшити"
            >
                <Minus className="w-5 h-5" />
            </button>

            {/* Horizontal Slider Track Container */}
            <div className="w-48 relative flex items-center justify-center">
                <input
                    type="range"
                    min={0.5}
                    max={4}
                    step={0.1}
                    value={scale}
                    onChange={handleSliderChange}
                    className="w-full h-1.5 cursor-pointer appearance-none bg-secondary rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:hover:bg-primary/80 transition-all"
                />
            </div>

            <button
                onClick={() => zoomIn(0.2)}
                className="p-1.5 rounded-full hover:bg-secondary/80 transition-colors text-foreground"
                title="Збільшити"
            >
                <Plus className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-muted-foreground w-8 text-center select-none">
                {Math.round(scale * 100)}%
            </span>
        </div>
    );
}

/**
 * Компонент відображення SVG карти поверху з елементами управління.
 * 
 * - Uses react-inlinesvg for DOM interaction
 * - Highlights search results
 * - Shows error state for empty results
 * - Zoom controls at bottom (desktop only)
 * - Search bar aligned to left
 */
export default function MapViewer({ floor, allFloors, onFloorChange, onSearch: propOnSearch }: MapViewerProps) {
    // Сортуємо поверхи від найбільшого до найменшого (3 -> 1)
    const sortedFloors = [...allFloors].sort((a, b) => b.id - a.id);
    const [currentScale, setCurrentScale] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<SearchableRoom | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Internal Search Hook
    const { search, results } = useMapSearch(allFloors as any);

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        search(query);
        setIsDropdownVisible(!!query.trim());
        if (propOnSearch) propOnSearch(query);
    };

    const handleSelectResult = (item: SearchableRoom) => {
        setSearchQuery(item.label);
        setIsDropdownVisible(false);

        // Switch floor if needed
        if (item.floorId !== floor.id) {
            onFloorChange(item.floorId);
        }

        // Set selected room and open sidebar
        setSelectedRoom(item);
        setIsSidebarOpen(true);

        // Update search to single item
        search(item.label);
    };

    const handleMapClick = (e: React.MouseEvent) => {
        let target = e.target as Element;
        // Traverse up to find a matching ID within the SVG
        while (target && target.tagName !== "svg" && target !== e.currentTarget) {
            if (target.id) {
                const room = floor.rooms.find((r) => r.id === target.id);
                if (room) {
                    const searchableRoom = { ...room, floorId: floor.id };
                    setSelectedRoom(searchableRoom);
                    setIsSidebarOpen(true);
                    return;
                }
            }
            target = target.parentElement as Element;
        }
        // If clicked on empty space (not a room), close sidebar?
        // Optional: setIsSidebarOpen(false);
    };

    const hasResults = results.length > 0;
    const hasQuery = searchQuery.trim().length > 0;
    const isError = hasQuery && !hasResults;

    // Generate dynamic styles for highlighted rooms
    const highlightStyles = useMemo(() => {
        let styles = "";

        // 1. Search Results Highlight (Green, Pulse)
        if (hasResults) {
            styles += results.map(r => `
            #${r.item.id} {
                fill: #22c55e !important; /* green-500 */
                stroke: #15803d !important; /* green-700 */
                stroke-width: 3px !important;
                opacity: 1 !important;
                animation: pulse-room 2s infinite ease-in-out;
            }
            #${r.item.id} * {
                fill: #22c55e !important;
                animation: pulse-room 2s infinite ease-in-out;
            }
        `).join("\n");
        }

        // 2. Secondary Highlight (Manual Selection - Blue/Cyan)
        // Only if selectedRoom is set and NOT currently the sole search result (optional logic, but let's just layer it)
        // If a room is selected via click, we want to show it clearly.
        if (selectedRoom) {
            styles += `
                #${selectedRoom.id} {
                    fill: #0ea5e9 !important; /* sky-500 */
                    stroke: #0369a1 !important; /* sky-700 */
                    stroke-width: 3px !important;
                    opacity: 1 !important;
                }
                #${selectedRoom.id} * {
                    fill: #0ea5e9 !important;
                }
            `;
        }

        return styles;
    }, [results, hasResults, selectedRoom]);

    return (
        <div id="map-root" className="relative w-full h-full bg-dot-pattern overflow-hidden group select-none">
            {/* Inject dynamic styles for current search results */}
            <style>
                {`
                    /* Cursor Pointer for all rooms (Scoped to Map Root to avoid Radix conflicts) */
                    #map-root [id^="r"] {
                        cursor: pointer !important;
                        transition: fill 0.2s ease;
                    }
                    #map-root [id^="r"]:hover {
                        fill: rgba(0, 0, 0, 0.1);
                    }

                    @keyframes pulse-room {
                        0% { opacity: 0.6; stroke-width: 2px; }
                        50% { opacity: 1; stroke-width: 5px; }
                        100% { opacity: 0.6; stroke-width: 2px; }
                    }
                    ${highlightStyles}
                `}
            </style>

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
                            <SVG
                                src={floor.svgUrl}
                                title={`План ${floor.label}`}
                                className="w-full h-full"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'auto'
                                }}
                                loader={<div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />}
                                onClick={handleMapClick}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>

            {/* --- ROOM DETAILS SIDEBAR --- */}
            <RoomDetailsSidebar
                room={selectedRoom}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* --- SEARCH OVERLAY (Top Left) --- */}
            <div className="absolute top-4 left-4 right-4 md:left-6 md:right-auto md:w-96 z-20 transition-all">
                <div className="relative group/search">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <Search className={cn(
                            "w-5 h-5 transition-colors",
                            isError ? "text-destructive" : "text-black"
                        )} />
                    </div>
                    <Input
                        type="text"
                        placeholder="Пошук кабінету..."
                        value={searchQuery}
                        className={cn(
                            "w-full pl-11 h-12 rounded-full border-2 bg-white/40 backdrop-blur-md shadow-lg transition-all focus-visible:ring-0 text-black placeholder:text-black/60 font-medium",
                            isError
                                ? "border-destructive/50 focus-visible:border-destructive bg-destructive/10"
                                : "border-white/20 focus-visible:bg-white/80 focus-visible:border-black/20"
                        )}
                        onChange={handleSearchInput}
                        onFocus={() => setIsDropdownVisible(!!searchQuery.trim())}
                    />

                    {/* Results Dropdown */}
                    <SearchDropdown
                        results={results}
                        onSelect={handleSelectResult}
                        isVisible={isDropdownVisible && hasResults}
                        onClose={() => setIsDropdownVisible(false)}
                    />

                    {/* Error Message */}
                    {isError && (
                        <div className="absolute top-14 left-4 right-4 bg-destructive/90 text-destructive-foreground text-sm py-1.5 px-3 rounded-md shadow-md backdrop-blur-sm animate-in fade-in slide-in-from-top-1 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>Нічого не знайдено</span>
                        </div>
                    )}
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
