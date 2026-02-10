import type { FloorData } from "@/config/floorsConfig";

interface MapViewerProps {
    floor: FloorData;
}

/**
 * Компонент відображення SVG карти поверху.
 * Контейнер 16:9 з масштабуванням SVG-плану.
 */
export default function MapViewer({ floor }: MapViewerProps) {
    return (
        <div className="relative w-full rounded-xl border-2 border-border bg-card overflow-hidden shadow-sm">
            {/* 16:9 aspect ratio контейнер */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                        src={floor.svgUrl}
                        alt={`План ${floor.label}`}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            {/* Назва поверху (overlay) */}
            <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm rounded-md px-3 py-1.5 border border-border/50">
                <span className="text-sm font-semibold text-foreground">
                    {floor.label}
                </span>
            </div>
        </div>
    );
}
