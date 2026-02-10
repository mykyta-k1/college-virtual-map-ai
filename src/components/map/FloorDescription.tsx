import {
    Building2,
    DoorOpen,
    Flame,
    Cross,
    Footprints,
    Theater,
    Archive,
} from "lucide-react";
import type { FloorData } from "@/config/floorsConfig";

interface FloorDescriptionProps {
    floor: FloorData;
}

/** Іконки за типом кімнати */
const typeIcons: Record<string, React.ReactNode> = {
    classroom: <Building2 className="w-4 h-4 text-emerald-600" />,
    wc: <DoorOpen className="w-4 h-4 text-blue-500" />,
    stairs: <Footprints className="w-4 h-4 text-amber-500" />,
    service: <Theater className="w-4 h-4 text-orange-500" />,
    entrance: <DoorOpen className="w-4 h-4 text-green-600" />,
    closet: <Archive className="w-4 h-4 text-gray-500" />,
};

const typeLabels: Record<string, string> = {
    classroom: "Навчальний кабінет",
    wc: "Санвузол",
    stairs: "Сходи",
    service: "Сервісне приміщення",
    entrance: "Вхід/Вихід",
    closet: "Комора",
};

/**
 * Компонент опису поверху з 'легендою' та переліком кімнат.
 */
export default function FloorDescription({ floor }: FloorDescriptionProps) {
    return (
        <div className="rounded-xl border-2 border-border bg-card p-4 shadow-sm">
            {/* Заголовок */}
            <h3 className="text-lg font-semibold text-foreground mb-2">
                Опис — {floor.label}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{floor.description}</p>

            {/* Опис приміщень */}
            <div className="flex flex-wrap gap-4 mb-4 pb-3 border-b border-border">
                <LegendItem icon={<Building2 className="w-4 h-4 text-emerald-600" />} label="Кабінет" color="#e8f4e8" />
                <LegendItem icon={<DoorOpen className="w-4 h-4 text-blue-500" />} label="WC" color="#d4e6f9" />
                <LegendItem icon={<Footprints className="w-4 h-4 text-amber-500" />} label="Сходи" color="#fff3cd" />
                <LegendItem icon={<Theater className="w-4 h-4 text-orange-500" />} label="Сервіс" color="#fde8d0" />
                <LegendItem icon={<Flame className="w-4 h-4 text-red-500" />} label="Вогнегасник" />
                <LegendItem icon={<Cross className="w-4 h-4 text-red-400" />} label="Аптечка" />
            </div>

            {/* Список кімнат */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {floor.rooms.map((room) => (
                    <div
                        key={room.id}
                        className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-md hover:bg-accent/50 transition-colors cursor-default"
                        title={room.note || typeLabels[room.type]}
                    >
                        {typeIcons[room.type] || <Building2 className="w-4 h-4" />}
                        <span className="text-foreground">{room.label}</span>
                        {room.note && (
                            <span className="text-xs text-muted-foreground ml-auto hidden sm:inline" title={room.note}>ⓘ</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Елемент опису */
function LegendItem({ icon, label, color }: { icon: React.ReactNode; label: string; color?: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {color && (
                <div className="w-3 h-3 rounded-sm border border-border" style={{ backgroundColor: color }} />
            )}
            {icon}
            <span>{label}</span>
        </div>
    );
}
