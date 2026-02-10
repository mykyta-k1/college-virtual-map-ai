import { useState } from "react";
import { floorsConfig } from "@/config/floorsConfig";
import FloorSwitcher from "@/components/map/FloorSwitcher";
import MapViewer from "@/components/map/MapViewer";
import FloorDescription from "@/components/map/FloorDescription";

/**
 * Сторінка "Мапа" — основний компонент з Layout контейнером.
 * 
 * Лівий стовпець: кнопки вибору поверху (з мініатюрами SVG).
 * Правий стовпець верх: SVG-план поверху (16:9).
 * Правий стовпець низ: опис поверху з легендою.
 */
export default function MapPage() {
    const [activeFloorId, setActiveFloorId] = useState(1);

    const activeFloor = floorsConfig.find((f) => f.id === activeFloorId) ?? floorsConfig[0];

    return (
        <div className="container mx-auto px-6 md:px-12 py-6">
            <div className="grid grid-cols-12 gap-5">

                {/* --- Ліва панель: кнопки поверхів --- */}
                <aside className="col-span-12 md:col-span-2 lg:col-span-2">
                    <FloorSwitcher
                        floors={floorsConfig}
                        activeFloor={activeFloorId}
                        onFloorChange={setActiveFloorId}
                    />
                </aside>

                {/* --- Права панель: мапа + опис --- */}
                <div className="col-span-12 md:col-span-10 lg:col-span-10 flex flex-col gap-5">
                    {/* Карта поверху (16:9) */}
                    <MapViewer floor={activeFloor} />

                    {/* Опис поверху */}
                    <FloorDescription floor={activeFloor} />
                </div>

            </div>
        </div>
    );
}
