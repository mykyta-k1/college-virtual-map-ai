import { useState } from "react";
import { floorsConfig } from "@/config/floorsConfig";
import MapViewer from "@/components/map/MapViewer";

/**
 * Сторінка "Мапа" — основний компонент.
 * 
 * Оновлений Layout (Full Viewport):
 * - Мапа займає ВЕСЬ доступний простір сторінки (h-full w-full).
 * - Відповідає розміру батьківського контейнера (main в App.tsx).
 */
export default function MapPage() {
    const [activeFloorId, setActiveFloorId] = useState(1);
    const activeFloor = floorsConfig.find((f) => f.id === activeFloorId) ?? floorsConfig[0];

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
    };

    return (
        <div className="h-full w-full overflow-hidden bg-background relative">
            <MapViewer
                floor={activeFloor}
                allFloors={floorsConfig}
                onFloorChange={setActiveFloorId}
                onSearch={handleSearch}
            />
        </div>
    );
}
