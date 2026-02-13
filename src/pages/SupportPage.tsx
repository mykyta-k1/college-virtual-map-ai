import { useState } from "react";
import { Mail, MessageCircle, Bug, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SupportPage() {
    const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || "support@college-map.ai";
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(supportEmail);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const handleReportBug = () => {
        window.location.href = `mailto:${supportEmail}?subject=Повідомлення про помилку (Virtual Map)&body=Опишіть проблему тут:`;
    };

    const handleFeedback = () => {
        window.location.href = `mailto:${supportEmail}?subject=Зворотній зв'язок (Virtual Map)&body=Ваша пропозиція або запитання:`;
    };

    return (
        <div className="h-full w-full bg-background flex flex-col p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
            <div className="max-w-xl mx-auto w-full space-y-8 text-center pt-10">

                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                        <MessageCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold">Підтримка</h1>
                    <p className="text-muted-foreground max-w-md">
                        Виникли питання або знайшли помилку? Напишіть нам, і ми спробуємо допомогти якомога швидше.
                    </p>
                </div>

                <div className="grid gap-4 w-full">
                    {/* Bug Report Button */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3">
                        <Bug className="w-8 h-8 text-destructive" />
                        <h3 className="font-semibold text-lg">Повідомити про помилку</h3>
                        <p className="text-sm text-muted-foreground mb-2">Знайшли баг або неточність на мапі?</p>
                        <Button variant="destructive" className="w-full sm:w-auto" onClick={handleReportBug}>
                            Надіслати звіт про помилку
                        </Button>
                    </div>

                    {/* General Help Button */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3">
                        <Mail className="w-8 h-8 text-blue-500" />
                        <h3 className="font-semibold text-lg">Загальна допомога</h3>
                        <p className="text-sm text-muted-foreground mb-2">Є пропозиції або потрібна консультація?</p>
                        <Button variant="outline" className="w-full sm:w-auto" onClick={handleFeedback}>
                            Написати повідомлення
                        </Button>
                    </div>
                </div>

                {/* Email Copy Section */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                        Або напишіть нам напряму:
                    </p>
                    <div
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full cursor-pointer hover:bg-secondary transition-colors group relative"
                        onClick={handleCopyEmail}
                        title="Клікніть щоб скопіювати"
                    >
                        <span className="text-sm font-mono text-primary font-medium select-all">
                            {supportEmail}
                        </span>
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                        )}

                        {/* Copied Popup */}
                        <div className={cn(
                            "absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg transition-all duration-200 pointer-events-none",
                            copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                            Скопійовано!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
