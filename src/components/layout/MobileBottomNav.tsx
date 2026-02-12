import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Map, Info, HelpCircle, MessageSquare, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Mobile Bottom Navigation Bar.
 * - Map Tab: Navigates to /
 * - Info Tab: Opens a Sheet Menu (No URL change) linking to other pages.
 */
export function MobileBottomNav() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            label: "Часті запитання (FAQ)",
            to: "/faq",
            icon: <HelpCircle className="w-5 h-5 text-blue-500" />
        },
        {
            label: "Підтримка",
            to: "/support",
            icon: <MessageSquare className="w-5 h-5 text-orange-500" />
        },
        {
            label: "Налаштування",
            to: "/settings",
            icon: <Settings className="w-5 h-5 text-gray-500" />
        },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm md:hidden z-50">
            <nav className="flex items-center justify-around h-16 rounded-2xl bg-background/80 backdrop-blur-md shadow-xl border border-border/50 px-2 transition-all duration-300">

                {/* MAP LINK */}
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => cn(
                        "flex flex-col items-center justify-center gap-1 w-full h-full rounded-xl transition-all active:scale-95",
                        isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Map className="w-6 h-6" />
                    <span className="text-xs">Мапа</span>
                </NavLink>

                {/* Separator */}
                <div className="w-px h-8 bg-border/50" />

                {/* INFO SHEET TRIGGER */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <button
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 w-full h-full rounded-xl transition-all active:scale-95",
                                isOpen ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Info className="w-6 h-6" />
                            <span className="text-xs">Інфо</span>
                        </button>
                    </SheetTrigger>

                    <SheetContent side="bottom" className="h-[60vh] rounded-t-[20px]">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="text-left text-2xl font-bold flex items-center gap-2">
                                <Info className="w-6 h-6" />
                                Меню Інформації
                            </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-3">
                            {menuItems.map((item) => (
                                <Link
                                    to={item.to}
                                    key={item.to}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between h-14 text-base px-4 bg-card hover:bg-accent border-muted shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <span>{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center text-xs text-muted-foreground">
                            <p>Віртуальний Коледж Mobile v1.0</p>
                        </div>
                    </SheetContent>
                </Sheet>

            </nav>
        </div>
    );
}
