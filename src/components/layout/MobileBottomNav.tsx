import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Map, Info, HelpCircle, MessageSquare, Settings, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

/**
 * Mobile Bottom Navigation Bar.
 * - Map Tab: Navigates to /
 * - Info Tab: Opens a Drawer Menu (No URL change) linking to other pages.
 * - Flush to bottom with no margin/padding.
 */
export function MobileBottomNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: 'Часті запитання (FAQ)',
      to: '/faq',
      icon: <HelpCircle className="w-5 h-5 text-blue-500" />,
    },
    {
      label: 'Підтримка',
      to: '/support',
      icon: <MessageSquare className="w-5 h-5 text-orange-500" />,
    },
    {
      label: 'Налаштування',
      to: '/settings',
      icon: <Settings className="w-5 h-5 text-gray-500" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full md:hidden z-50">
      {/* Flush transparent/blurred background container if needed, but styling on nav keeps it clean */}
      <nav className="flex items-center justify-around h-16 bg-background/95 backdrop-blur-md border-t border-border/50 px-2 transition-all duration-300 pb-safe">
        {/* MAP LINK */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 pt-2 pb-2',
              isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground',
            )
          }
        >
          <Map className="w-6 h-6" />
          <span className="text-[10px] uppercase tracking-wider">Мапа</span>
        </NavLink>

        {/* Separator */}
        <div className="w-px h-8 bg-border/50" />

        {/* INFO DRAWER TRIGGER */}
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <button
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-95 pt-2 pb-2',
                isOpen ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Info className="w-6 h-6" />
              <span className="text-[10px] uppercase tracking-wider">Інфо</span>
            </button>
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="mb-4">
                <DrawerTitle className="text-left text-2xl font-bold flex items-center gap-2">
                  <Info className="w-6 h-6" />
                  Меню Інформації
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex flex-col gap-3 px-4 pb-8">
                {menuItems.map((item) => (
                  <Link to={item.to} key={item.to} onClick={() => setIsOpen(false)}>
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
            </div>
          </DrawerContent>
        </Drawer>
      </nav>
    </div>
  );
}
