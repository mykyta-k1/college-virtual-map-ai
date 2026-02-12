import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from "@/lib/utils";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    delay?: number;
    side?: 'top' | 'bottom' | 'left' | 'right';
}

export function SimpleTooltip({ content, children, delay = 1000, side = 'right' }: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const show = () => {
        timeoutRef.current = setTimeout(() => {
            if (triggerRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                let top = 0;
                let left = 0;
                const offset = 10;

                switch (side) {
                    case 'right':
                        top = rect.top + rect.height / 2;
                        left = rect.right + offset;
                        break;
                    case 'left':
                        top = rect.top + rect.height / 2;
                        left = rect.left - offset;
                        break;
                    case 'top':
                        top = rect.top - offset;
                        left = rect.left + rect.width / 2;
                        break;
                    case 'bottom':
                        top = rect.bottom + offset;
                        left = rect.left + rect.width / 2;
                        break;
                }

                setCoords({ top, left });
                setVisible(true);
            }
        }, delay);
    };

    const hide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
    };

    // Dynamic classes based on side
    const tooltipClasses = cn(
        "fixed z-[100] px-2 py-1 bg-black text-white text-xs rounded shadow-md animate-in fade-in zoom-in-95 duration-200 pointer-events-none whitespace-nowrap",
        side === 'right' && "-translate-y-1/2",
        side === 'left' && "-translate-y-1/2 -translate-x-full",
        side === 'top' && "-translate-x-1/2 -translate-y-full",
        side === 'bottom' && "-translate-x-1/2"
    );

    const arrowClasses = cn(
        "absolute w-0 h-0 border-[4px] border-transparent",
        side === 'right' && "top-1/2 -left-2 -translate-y-1/2 border-r-black",
        side === 'left' && "top-1/2 -right-2 -translate-y-1/2 border-l-black",
        side === 'top' && "left-1/2 -bottom-2 -translate-x-1/2 border-t-black",
        side === 'bottom' && "left-1/2 -top-2 -translate-x-1/2 border-b-black"
    );

    return (
        <div
            ref={triggerRef}
            onMouseEnter={show}
            onMouseLeave={hide}
            className="w-full flex justify-center relative"
        >
            {children}
            {visible && createPortal(
                <div
                    style={{ top: coords.top, left: coords.left }}
                    className={tooltipClasses}
                >
                    {content}
                    <div className={arrowClasses} />
                </div>,
                document.body
            )}
        </div>
    );
}
