import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Map, HelpCircle, X, MessageSquare, Settings, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { cn } from '@/lib/utils';

/**
 * Enhanced Sidebar Navigation.
 * - Desktop Only.
 * - Tooltips on hover (0.5s delay).
 * - Settings link icon-only in collapsed state.
 */
export function SidebarNav() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Main Navigation Items
  const navItems = [
    { id: 'home', label: 'Мапа', to: '/', icon: <Map className="w-5 h-5 flex-shrink-0" /> },
    { id: 'teachers', label: 'Хто ви?', to: '/teachers', icon: <GraduationCap className="w-5 h-5 flex-shrink-0" /> }, // Доданий рядок
    { id: 'faq', label: 'FAQ', to: '/faq', icon: <HelpCircle className="w-5 h-5 flex-shrink-0" /> },
    {
      id: 'support',
      label: 'Підтримка',
      to: '/support',
      icon: <MessageSquare className="w-5 h-5 flex-shrink-0" />,
    },
  ];

  return (
    <>
      {/* --- BACKDROP OVERLAY (Dimming) --- */}
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:block hidden',
          isExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={() => setIsExpanded(false)}
      />

      {/* --- SIDEBAR --- */}
      <aside
        className={cn(
          'hidden md:flex flex-col h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out shadow-xl',
          isExpanded ? 'w-64' : 'w-20',
        )}
      >
        {/* Header Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b flex-shrink-0">
          {isExpanded ? (
            <>
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="bg-primary text-primary-foreground p-1 rounded-md font-bold text-xs flex-shrink-0">
                  VK
                </div>
                <span className="font-semibold text-sm truncate">Віртуальний Коледж</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 ml-auto flex-shrink-0"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Закрити меню</span>
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <SimpleTooltip content="Розгорнути меню" delay={500}>
                <Button variant="ghost" size="icon" onClick={() => setIsExpanded(true)}>
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Відкрити меню</span>
                </Button>
              </SimpleTooltip>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => (
            <SimpleTooltip key={item.id} content={item.label} delay={500}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsExpanded(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center transition-colors rounded-md w-full',
                    isExpanded
                      ? 'gap-3 px-3 py-2.5 text-sm font-medium justify-start'
                      : 'flex-col gap-1 justify-center py-3 text-[10px] font-medium text-center h-16',
                    isActive
                      ? 'bg-secondary text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                  )
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </SimpleTooltip>
          ))}
        </nav>

        {/* Footer: Settings Link (Icon Only when collapsed, Text when expanded) */}
        <div className="p-2 border-t flex-shrink-0 bg-muted/10 flex justify-center">
          <SimpleTooltip content="Налаштування" delay={500}>
            <NavLink
              to="/settings"
              onClick={() => setIsExpanded(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center transition-colors rounded-md w-full hover:bg-secondary/50',
                  isExpanded
                    ? 'gap-3 px-3 py-3 text-sm font-medium justify-start'
                    : 'justify-center h-12',
                  isActive ? 'text-foreground bg-secondary' : 'text-muted-foreground',
                )
              }
            >
              <Settings className="w-6 h-6 flex-shrink-0" />
              {/* Settings text visible ONLY when expanded */}
              {isExpanded ? (
                <span>Налаштування</span>
              ) : (
                <span className="sr-only">Налаштування</span>
              )}
            </NavLink>
          </SimpleTooltip>
        </div>
      </aside>
    </>
  );
}
