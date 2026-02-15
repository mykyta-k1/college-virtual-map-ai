import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { floorsConfig } from '@/config/floorsConfig';
import MapViewer from '@/components/map/MapViewer';
import type { SearchableRoom } from '@/services/search.service';

/**
 * Сторінка "Мапа" — основний компонент.
 *
 * Оновлений Layout (Full Viewport):
 * - Мапа займає ВЕСЬ доступний простір сторінки (h-full w-full).
 * - Відповідає розміру батьківського контейнера (main в App.tsx).
 * - Обробляє URL параметри ?room=ID та ?search=QUERY.
 * - Синхронізує URL тільки коли відкривається/закривається sidebar з деталями.
 */
export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFloorId, setActiveFloorId] = useState(1);

  // State to hold initial search query from URL
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [initialRoom, setInitialRoom] = useState<SearchableRoom | null>(null);

  const activeFloor = floorsConfig.find((f) => f.id === activeFloorId) ?? floorsConfig[0];

  // Process URL parameters - reactive to changes
  useEffect(() => {
    // Check for direct search parameter first (from AI chat or shared link)
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setInitialSearchQuery(searchQuery);
      return;
    }

    // Fallback to room parameter (from FAQ)
    const roomId = searchParams.get('room');
    if (roomId) {
      // Find floor for this room
      const floor = floorsConfig.find(f => f.rooms.some(r => r.id === roomId));
      if (floor) {
        setActiveFloorId(floor.id);

        // Find the room label to populate search
        const room = floor.rooms.find(r => r.id === roomId);
        if (room) {
          setInitialRoom({ ...room, floorId: floor.id });
        }
      }
    } else {
      // No URL params - clear initial search
      setInitialSearchQuery('');
    }
  }, [searchParams]); // React to URL changes

  // Handle room selection - updates URL when sidebar opens with room details
  const handleRoomSelect = useCallback((room: SearchableRoom | null) => {
    if (room) {
      // Room selected - sidebar opening - update URL
      setSearchParams({ search: room.label }, { replace: true });
    } else {
      // Room deselected - sidebar closing - clear URL
      setSearchParams({}, { replace: true });
    }
  }, [setSearchParams]);

  return (
    <div className="h-full w-full overflow-hidden bg-background relative">
      <MapViewer
        floor={activeFloor}
        allFloors={floorsConfig}
        onFloorChange={setActiveFloorId}
        onRoomSelect={handleRoomSelect}
        initialSearchQuery={initialSearchQuery}
        initialRoom={initialRoom}
      />
    </div>
  );
}
