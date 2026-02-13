import { useMemo, useState } from 'react';
import type { FloorData } from '@/config/floorsConfig';
import { createFuseInstance, flattenRooms, type SearchableRoom } from '@/lib/search';
import type { FuseResult } from 'fuse.js';

export function useMapSearch(floors: FloorData[]) {
    // 1. Flatten rooms data once (or when floors change)
    const searchableRooms = useMemo(() => flattenRooms(floors), [floors]);

    // 2. Create Fuse instance once
    const fuse = useMemo(() => createFuseInstance(searchableRooms), [searchableRooms]);

    const [results, setResults] = useState<FuseResult<SearchableRoom>[]>([]);

    const search = (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(query);
        setResults(searchResults);
    };

    return { search, results };
}
