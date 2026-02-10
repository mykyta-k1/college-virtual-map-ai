import UzNULogo from "@/assets/UzNU_logo.png";

/**
 * Footer компонент з копірайтом та логотипом університету.
 */
export function Footer() {
    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 md:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Копірайт */}
                    <div className="text-sm text-muted-foreground text-center sm:text-left">
                        © 2026 Ужгородський національний університет. Усі права захищені.
                    </div>

                    {/* Логотип */}
                    <div className="flex items-center">
                        <img
                            src={UzNULogo}
                            alt="УжНУ Логотип"
                            className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                    </div>

                </div>
            </div>
        </footer>
    );
}
