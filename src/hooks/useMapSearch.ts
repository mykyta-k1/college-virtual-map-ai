import { useMemo, useState } from 'react';
import type { FloorData } from '@/config/floorsConfig';
import { SearchService, type SearchableRoom } from '@/services/search.service';
import type { FuseResult } from 'fuse.js';
export type { FuseResult };

export function useMapSearch(floors: FloorData[]) {
  // Ініціалізація сервісу пошуку
  const searchService = useMemo(() => new SearchService(floors), [floors]);
  const [results, setResults] = useState<FuseResult<SearchableRoom>[]>([]);

  const search = (query: string) => {
    const searchResults = searchService.search(query);
    setResults(searchResults);
  };

  return { search, results };
}
