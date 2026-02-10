import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Home, BookOpen, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: "home", label: "Мапа", to: "/", icon: <Home className="w-4 h-4" /> },
        { id: "handbook", label: "Довідник", to: "/handbook", icon: <BookOpen className="w-4 h-4" /> },
        { id: "safety", label: "Безпека", to: "/safety", icon: <Shield className="w-4 h-4" /> },
        { id: "faq", label: "FAQ", to: "/faq", icon: <HelpCircle className="w-4 h-4" /> },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 gap-4 h-16 items-center">

                    {/* --- ЛОГОТИП (3 колонки зліва) --- */}
                    <div className="col-span-3 flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-2 rounded-md font-bold text-sm">
                            VK
                        </div>
                        <span className="font-semibold text-base hidden lg:inline">
                            Віртуальний Коледж
                        </span>
                    </div>

                    {/* --- НАВІГАЦІЯ ПО ЦЕНТРУ (6 колонок) --- */}
                    <nav className="col-span-6 hidden md:flex items-center justify-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-sm font-medium transition-colors
                                    hover:text-primary
                                    ${isActive ? 'text-primary' : 'text-muted-foreground'}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span className="flex items-center gap-2">
                                            {item.icon}
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* --- ПЕРЕМИКАЧ ТЕМИ (3 колонки справа) --- */}
                    <div className="col-span-3 hidden md:flex items-center justify-end">
                        <ThemeToggle />
                    </div>

                    {/* --- MOBILE MENU --- */}
                    <div className="col-span-9 md:hidden flex items-center justify-end gap-2">
                        <ThemeToggle />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Відкрити меню</span>
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="left">
                                <SheetHeader>
                                    <SheetTitle className="text-left">Меню навігації</SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-2 mt-6">
                                    {navItems.map((item) => (
                                        <NavLink
                                            key={item.id}
                                            to={item.to}
                                            end={item.to === "/"}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => `
                                                flex items-center gap-3 text-base font-medium py-3 px-3 rounded-md transition-colors
                                                ${isActive
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-accent'
                                                }
                                            `}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </div>
        </header>
    );
}