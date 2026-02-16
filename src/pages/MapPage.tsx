import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { floorsConfig } from '@/config/floorsConfig';
import MapViewer from '@/components/map/MapViewer';
import type { SearchableRoom } from '@/services/search.service';
import { SearchService } from '@/services/search.service';

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
    // Перевірка параметру search (наприклад, перехід з AI чату або посилання)
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      // Ініціалізуємо сервіс пошуку для знаходження кімнати
      const searchService = new SearchService(floorsConfig);
      const results = searchService.search(searchQuery);

      if (results.length > 0) {
        const bestMatch = results[0].item;

        // Перевіряємо на точний збіг (наприклад "312" == "312")
        const isExactMatch = bestMatch.label.toLowerCase() === searchQuery.toLowerCase();

        if (isExactMatch) {
          // ТОЧНИЙ ЗБІГ: Вважаємо це прямою навігацією (як клік по кнопці в AI)

          // 1. Перемикаємо поверх, якщо кімната на іншому
          if (bestMatch.floorId) setActiveFloorId(bestMatch.floorId);

          // 2. Вибираємо кімнату (активує синє виділення + сайдбар)
          setInitialRoom(bestMatch);

          // 3. Очищаємо пошуковий запит, щоб прибрати зелене виділення "результату пошуку"
          setInitialSearchQuery('');
          return;
        }

        // ЧАСТКОВИЙ ЗБІГ: Просто допомагаємо користувачу знайти
        // Перемикаємо на поверх з найкращим результатом
        if (bestMatch.floorId) {
          setActiveFloorId(bestMatch.floorId);
        }
        // Не вибираємо кімнату автоматично (вона буде підсвічена зеленим через пошук)
      }

      // Встановлюємо пошуковий запит (активує зелене виділення для всіх результатів)
      setInitialSearchQuery(searchQuery);
      return;
    }

    // Fallback to room parameter (from FAQ)
    const roomId = searchParams.get('room');
    if (roomId) {
      // Find floor for this room
      const floor = floorsConfig.find((f) => f.rooms.some((r) => r.id === roomId));
      if (floor) {
        setActiveFloorId(floor.id);

        // Find the room label to populate search
        const room = floor.rooms.find((r) => r.id === roomId);
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
  const handleRoomSelect = useCallback(
    (room: SearchableRoom | null) => {
      if (room) {
        // Room selected - sidebar opening - update URL
        setSearchParams({ search: room.label }, { replace: true });
      } else {
        // Room deselected - sidebar closing - clear URL
        setSearchParams({}, { replace: true });
      }
    },
    [setSearchParams],
  );

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
