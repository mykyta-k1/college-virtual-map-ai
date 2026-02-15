import { useState, useEffect } from 'react';
import { Search, X, Navigation, CircleDot, MapPin, ArrowUpDown, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SimpleTooltip } from '@/components/ui/simple-tooltip';
import { cn } from '@/lib/utils';
import { SearchDropdown } from './SearchDropdown';
import type { SearchableRoom } from '@/services/search.service';
import type { FuseResult } from 'fuse.js';

interface MapSearchProps {
    // State
    isRouteMode: boolean;
    searchQuery: string;
    routeQueryStart: string;
    routeQueryEnd: string;
    results: FuseResult<SearchableRoom>[];
    activeRouteInput: 'start' | 'end';

    // Handlers
    onSearch: (query: string) => void;
    onSearchQueryChange: (query: string) => void;
    onRouteQueryStartChange: (query: string) => void;
    onRouteQueryEndChange: (query: string) => void;
    onActiveRouteInputChange: (type: 'start' | 'end') => void;

    onToggleRouteMode: (enable: boolean) => void;
    onSelectResult: (room: SearchableRoom, type: 'search' | 'start' | 'end') => void;
    onClearSearch: () => void;
    onSwapRoute: () => void;

    // Optional Error State
    hasError?: boolean;
}

export function MapSearch({
    isRouteMode,
    searchQuery,
    routeQueryStart,
    routeQueryEnd,
    results,
    activeRouteInput,

    onSearch,
    onSearchQueryChange,
    onRouteQueryStartChange,
    onRouteQueryEndChange,
    onActiveRouteInputChange,
    onToggleRouteMode,
    onSelectResult,
    onClearSearch,
    onSwapRoute,
}: MapSearchProps) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Determine which query is "active" for logic checks
    const currentQuery = isRouteMode
        ? (activeRouteInput === 'start' ? routeQueryStart : routeQueryEnd)
        : searchQuery;

    const hasResults = results.length > 0;
    const hasQuery = currentQuery.trim().length > 0;
    // Local error check
    const isError = hasQuery && !hasResults;
    const [showError, setShowError] = useState(false);

    // Manage transient error visibility
    useEffect(() => {
        if (isError) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 3000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        } else {
            setShowError(false);
        }
    }, [isError]);

    // Sync Dropdown visibility with query interactions
    const handleInputFocus = (type: 'search' | 'start' | 'end') => {
        if (type === 'start') onActiveRouteInputChange('start');
        if (type === 'end') onActiveRouteInputChange('end');

        // Set active query for search
        const query = type === 'search' ? searchQuery
            : type === 'start' ? routeQueryStart
                : routeQueryEnd;

        onSearch(query);
        setIsDropdownVisible(!!query.trim());
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'search' | 'start' | 'end') => {
        const val = e.target.value;
        if (type === 'search') onSearchQueryChange(val);
        else if (type === 'start') onRouteQueryStartChange(val);
        else onRouteQueryEndChange(val);

        onSearch(val);
        setIsDropdownVisible(!!val.trim());
    };

    const handleSelect = (item: SearchableRoom) => {
        setIsDropdownVisible(false);
        const type = isRouteMode ? activeRouteInput : 'search';
        onSelectResult(item, type);

        // Auto-switch focus if start is selected and end is empty
        if (isRouteMode && activeRouteInput === 'start' && !routeQueryEnd) {
            onActiveRouteInputChange('end');
        }
    };

    return (
        <div className="absolute top-4 left-4 right-4 md:left-6 md:right-auto md:w-96 z-20 transition-all">
            <div className="relative group/search flex flex-col gap-2">

                {/* STANDARD MODE */}
                {!isRouteMode && (
                    <div className="relative w-full">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                            <Search className={cn("w-5 h-5 transition-colors", isError ? 'text-destructive' : 'text-black')} />
                        </div>
                        <Input
                            type="text"
                            placeholder="Пошук кабінету..."
                            value={searchQuery}
                            className={cn(
                                'w-full pl-11 pr-24 h-12 rounded-full border-2 bg-white/40 backdrop-blur-md shadow-lg transition-all focus-visible:ring-0 text-black placeholder:text-black/60 font-medium',
                                isError
                                    ? 'border-destructive/50 focus-visible:border-destructive bg-destructive/10'
                                    : 'border-white/20 focus-visible:bg-white/80 focus-visible:border-black/20',
                            )}
                            onChange={(e) => handleChange(e, 'search')}
                            onFocus={() => handleInputFocus('search')}
                        />

                        {/* ACTIONS Right Side */}
                        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 shrink-0 rounded-full hover:bg-black/10 text-black/60"
                                    onClick={onClearSearch}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            <SimpleTooltip content="Прокласти маршрут">
                                <Button
                                    size="icon"
                                    className="h-9 w-9 shrink-0 rounded-full bg-blue-500 hover:bg-blue-600 shadow-md text-white border-0"
                                    onClick={() => onToggleRouteMode(true)}
                                >
                                    <Navigation className="w-4 h-4 fill-current" />
                                </Button>
                            </SimpleTooltip>
                        </div>
                    </div>
                )}

                {/* ROUTE MODE */}
                {isRouteMode && (
                    <div className="flex flex-col gap-0 bg-background/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl animate-in slide-in-from-top-2 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
                            <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Маршрут</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mr-1 hover:bg-muted" onClick={() => onToggleRouteMode(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Route Controls Container */}
                        <div className="flex items-center p-3 gap-3">

                            {/* Left: Icons & Connector */}
                            <div className="flex flex-col items-center gap-1 py-1 self-stretch justify-between w-6 shrink-0">
                                <CircleDot className="w-4 h-4 text-green-500 shrink-0" />
                                <div className="w-0.5 grow border-l-2 border-dotted border-border my-1"></div>
                                <MapPin className="w-4 h-4 text-red-500 shrink-0 fill-red-500" />
                            </div>

                            {/* Middle: Inputs */}
                            <div className="flex flex-col gap-3 flex-1 min-w-0">
                                <Input
                                    placeholder="Звідки..."
                                    className="h-9 text-sm bg-white/50 border-border/60 focus-visible:ring-1"
                                    value={routeQueryStart}
                                    onChange={(e) => handleChange(e, 'start')}
                                    onFocus={() => handleInputFocus('start')}
                                />
                                <Input
                                    placeholder="Куди..."
                                    className="h-9 text-sm bg-white/50 border-border/60 focus-visible:ring-1"
                                    value={routeQueryEnd}
                                    onChange={(e) => handleChange(e, 'end')}
                                    onFocus={() => handleInputFocus('end')}
                                />
                            </div>

                            {/* Right: Swap Button */}
                            <div className="flex items-center justify-center shrink-0">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-full border-border/60 hover:bg-muted/80 shadow-sm"
                                    onClick={onSwapRoute}
                                    title="Змінити напрямок"
                                >
                                    <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Dropdown */}
                <div className="relative w-full mt-1">
                    <SearchDropdown
                        results={results}
                        onSelect={handleSelect}
                        isVisible={isDropdownVisible && hasResults}
                        onClose={() => setIsDropdownVisible(false)}
                    />
                </div>

                {/* Error Message */}
                {showError && (
                    <div className={`
                absolute left-0 right-0 bg-destructive/90 text-destructive-foreground text-sm py-1.5 px-3 rounded-md shadow-md backdrop-blur-sm animate-in fade-in slide-in-from-top-1 flex items-center gap-2 z-10
                ${isRouteMode ? 'top-[calc(100%+0.5rem)]' : 'top-14'}
            `}>
                        <AlertCircle className="w-4 h-4" />
                        <span>Нічого не знайдено</span>
                    </div>
                )}
            </div>
        </div>
    );
}
