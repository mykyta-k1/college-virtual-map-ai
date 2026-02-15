import { useMemo } from 'react';
import type { SearchableRoom } from '@/services/search.service';
import type { FuseResult } from 'fuse.js';

interface UseMapHighlightsProps {
  results: FuseResult<SearchableRoom>[];
  selectedRoom: SearchableRoom | null;
  isRouteMode: boolean;
  startPoint: SearchableRoom | null;
  endPoint: SearchableRoom | null;
}

/**
 * Hook to generate CSS styles for map element highlighting based on current state.
 */
export function useMapHighlights({
  results,
  selectedRoom,
  isRouteMode,
  startPoint,
  endPoint,
}: UseMapHighlightsProps) {
  const hasResults = results.length > 0;

  const highlightStyles = useMemo(() => {
    let styles = '';

    // 1. Search Results (Green Pulse)
    if (hasResults) {
      styles += results
        .map(
          (r) => `
        [id="${r.item.id}"] {
            fill: #22c55e !important; 
            stroke: #22c55e !important; 
            stroke-width: 3px !important;
            opacity: 1 !important;
            animation: pulse-room 2s infinite ease-in-out;
        }
      `,
        )
        .join('\n');
    }

    // 2. Selected Room (Blue/Cyan)
    if (selectedRoom) {
      styles += `
            [id="${selectedRoom.id}"] {
                fill: #0ea5e9 !important; 
                stroke: #0ea5e9 !important; 
                stroke-width: 3px !important;
                opacity: 1 !important;
            }
        `;
    }

    // 3. Route Points (Start - Green, End - Red)
    if (isRouteMode) {
      if (startPoint) {
        styles += `
            [id="${startPoint.id}"] {
                fill: #22c55e !important; 
                stroke: #22c55e !important; 
                stroke-width: 3px !important;
                opacity: 1 !important;
            }
        `;
      }
      if (endPoint) {
        styles += `
            [id="${endPoint.id}"] {
                fill: #ef4444 !important; /* Red for destination */
                stroke: #ef4444 !important; 
                stroke-width: 3px !important;
                opacity: 1 !important;
            }
        `;
      }
    }

    return styles;
  }, [results, hasResults, selectedRoom, isRouteMode, startPoint, endPoint]);

  return highlightStyles;
}
