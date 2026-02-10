import { HelpCircle } from "lucide-react";

/**
 * Сторінка "FAQ" — відповіді на часті запитання студентів.
 * Поки що заглушка.
 */
export default function FaqPage() {
    return (
        <div className="container mx-auto px-8 py-12">
            <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">FAQ</h1>
            </div>
            <p className="text-muted-foreground text-lg">
                Відповіді на часті запитання для студентів, першокурсників та гостей коледжу.
            </p>
        </div>
    );
}
