import { ThemeToggle } from "@/components/theme-toggle";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="h-full w-full bg-background flex flex-col p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Налаштування
            </h1>

            <div className="max-w-md space-y-6">
                {/* Theme Settings */}
                <section className="bg-card border rounded-xl p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">Зовнішній вигляд</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Темна тема</span>
                        <ThemeToggle />
                    </div>
                </section>

                {/* Other settings placeholders */}
                <section className="bg-card border rounded-xl p-4 shadow-sm opacity-50 pointer-events-none">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">Мова (скоро)</h2>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Українська</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
