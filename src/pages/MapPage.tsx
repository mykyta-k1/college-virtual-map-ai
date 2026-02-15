import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { floorsConfig } from '@/config/floorsConfig';
import MapViewer from '@/components/map/MapViewer';

/**
 * Сторінка "Мапа" — основний компонент.
 *
 * Оновлений Layout (Full Viewport):
 * - Мапа займає ВЕСЬ доступний простір сторінки (h-full w-full).
 * - Відповідає розміру батьківського контейнера (main в App.tsx).
 * - Обробляє URL параметри ?room=ID для автоматичного вибору та ?search=QUERY для пошуку.
 */
export default function MapPage() {
  const [searchParams] = useSearchParams();
  const [activeFloorId, setActiveFloorId] = useState(1);

  // State to hold initial search query from URL (passed once to MapViewer)
  const [initialSearchQuery, setInitialSearchQuery] = useState('');

  const activeFloor = floorsConfig.find((f) => f.id === activeFloorId) ?? floorsConfig[0];

  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId) {
      // Find floor for this room
      const floor = floorsConfig.find(f => f.rooms.some(r => r.id === roomId));
      if (floor) {
        setActiveFloorId(floor.id);

        // Find the room label to populate search
        const room = floor.rooms.find(r => r.id === roomId);
        if (room) {
          // We want to simulate a search for this room so it gets highlighted and selected
          setInitialSearchQuery(room.label);
        }
      }
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="h-full w-full overflow-hidden bg-background relative">
      <MapViewer
        floor={activeFloor}
        allFloors={floorsConfig}
        onFloorChange={setActiveFloorId}
        onSearch={handleSearch}
        initialSearchQuery={initialSearchQuery}
      />
    </div>
  );
}
