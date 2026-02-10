import { Shield } from "lucide-react";

/**
 * Сторінка "Безпека" — інформація про укриття та евакуацію.
 * Поки що заглушка.
 */
export default function SafetyPage() {
    return (
        <div className="container mx-auto px-8 py-12">
            <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">Безпека</h1>
            </div>
            <p className="text-muted-foreground text-lg">
                Інформація про укриття, евакуаційні маршрути та екстрені контакти. Актуально для України.
            </p>
        </div>
    );
}
