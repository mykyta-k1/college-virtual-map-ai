import { useMemo, useEffect, useRef } from 'react';
import type { FloorData } from '@/config/floorsConfig';
import { MapService } from '@/services/map.service';
import { NavigationService } from '@/services/navigation.service';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useMapSearch } from '@/hooks/useMapSearch';
import { useMapViewerState } from '@/hooks/useMapViewerState';
import { useMapHighlights } from '@/hooks/useMapHighlights';
import SVG from 'react-inlinesvg';
import { MapSearch } from './MapSearch';
import { RoomDetailsSidebar } from './RoomDetailsSidebar';
import { RouteOverlay } from './RouteOverlay';
import { ZoomControls } from './ZoomControls';
import { FloorSelector } from './FloorSelector';
import type { SearchableRoom } from '@/services/search.service';

interface MapViewerProps {
  floor: FloorData;
  allFloors: { id: number; label: string }[];
  onFloorChange: (id: number) => void;
  onRoomSelect?: (room: SearchableRoom | null) => void;
  initialSearchQuery?: string;
}

/**
 * SVG Map Viewer component with zoom/pan controls and room interaction.
 */
export default function MapViewer({
  floor,
  allFloors,
  onFloorChange,
  onRoomSelect,
  initialSearchQuery,
}: MapViewerProps) {
  // Управління станом
  const { state, actions } = useMapViewerState();

  const navService = useMemo(() => NavigationService.getInstance(), []);

  const { search, results } = useMapSearch(allFloors as any);

  // Синхронізація стану з початковим запитом URL
  const prevInitialQuery = useRef(initialSearchQuery);

  // Синхронізація стану зі змінами URL (лише коли URL справді змінюється)
  useEffect(() => {
    if (initialSearchQuery !== prevInitialQuery.current) {
      prevInitialQuery.current = initialSearchQuery;

      if (initialSearchQuery) {
        // Пропускаємо автозаповнення, якщо URL відповідає вибраній кімнаті (синхронізація навігації)
        if (state.selectedRoom && initialSearchQuery === state.selectedRoom.label) {
          return;
        }

        if (initialSearchQuery !== state.searchQuery) {
          actions.setSearchQuery(initialSearchQuery);
          search(initialSearchQuery);
        }
      } else if (state.searchQuery && !state.selectedRoom) {
        // Очищаємо пошук, якщо URL порожній і кімната не вибрана
        actions.clearSearch();
        search('');
      }
    }
  }, [initialSearchQuery, state.selectedRoom, state.searchQuery]);

  // Сповіщаємо батьківський компонент про зміну вибраної кімнати
  useEffect(() => {
    if (onRoomSelect) {
      onRoomSelect(state.selectedRoom);
    }
  }, [state.selectedRoom, onRoomSelect]);

  // --- Handlers Wrappers ---

  // Handle Search Input Change
  const handleSearchQueryChange = (query: string) => {
    actions.setSearchQuery(query);
    search(query);
  };

  const handleClearSearch = () => {
    actions.clearSearch();
    search('');
  };

  // Обробник вибору результату
  // Обгортаємо, щоб обробити зміну поверху, яка є частиною props MapViewer
  const handleSelectResult = (item: SearchableRoom, type: 'search' | 'start' | 'end') => {
    actions.selectResult(item, type, onFloorChange);
    if (type === 'search') {
      search(item.label);
    }
  };

  // Ефект для розрахунку маршруту
  useEffect(() => {
    if (state.isRouteMode && state.startPoint && state.endPoint) {
      const startNode = navService.findNodeByRoomId(state.startPoint.id);
      const endNode = navService.findNodeByRoomId(state.endPoint.id);

      if (startNode && endNode) {
        console.log(`🛣️ Calculating path from ${state.startPoint.label} to ${state.endPoint.label}...`);
        const path = navService.findPath(startNode.id, endNode.id);
        if (path) {
          console.log("✅ Route found:", path);
          actions.setCurrentPath(path);
        } else {
          console.warn("❌ Route not found!");
          actions.setCurrentPath(null);
        }
      } else {
        console.warn("⚠️ Cannot find graph nodes for selected rooms:", state.startPoint?.id, state.endPoint?.id);
        actions.setCurrentPath(null);
      }
    } else {
      // Clear path if not in route mode or points are missing
      if (state.currentPath) {
        actions.setCurrentPath(null);
      }
    }
  }, [state.isRouteMode, state.startPoint, state.endPoint, navService]);

  const handleMapClick = (e: React.MouseEvent) => {
    const svgElement = e.currentTarget as unknown as SVGSVGElement;
    const coords = MapService.getSVGClickCoordinates(e, svgElement);
    if (coords) {
      console.log(`Map Click: x=${coords.x}, y=${coords.y}`);
    }

    let target = e.target as Element;
    while (target && target.tagName !== 'svg' && target !== e.currentTarget) {
      if (target.id) {
        const cleanId = target.id.replace('bg_', '').replace('text_', '');
        let room = floor.rooms.find((r) => r.id === cleanId);
        if (!room) room = floor.rooms.find((r) => r.id.endsWith(cleanId));

        if (room) {
          const searchableRoom = { ...room, floorId: floor.id };

          if (state.isRouteMode) {
            handleSelectResult(searchableRoom, state.activeRouteInput);
          } else {
            actions.selectRoom(searchableRoom);
          }
          return;
        }
      }
      target = target.parentElement as Element;
    }
  };

  const handleSidebarRouteClick = () => {
    actions.closeSidebar();
    actions.enableRouteMode();
  };



  const highlightStyles = useMapHighlights({
    results,
    selectedRoom: state.selectedRoom,
    isRouteMode: state.isRouteMode,
    startPoint: state.startPoint,
    endPoint: state.endPoint,
  });

  return (
    <div
      id="map-root"
      className="relative w-full h-full bg-dot-pattern overflow-hidden group select-none"
    >
      <style>
        {`
            #map-root [id^="r"], #map-root g[id] { cursor: pointer !important; transition: fill 0.2s ease; }
            #map-root [id^="r"]:hover { fill: rgba(0, 0, 0, 0.1); }
            @keyframes pulse-room {
                0% { opacity: 0.6; stroke-width: 2px; }
                50% { opacity: 1; stroke-width: 5px; }
                100% { opacity: 0.6; stroke-width: 2px; }
            }
            ${highlightStyles}
        `}
      </style>

      {/* SVG Map Container */}
      <TransformWrapper
        initialScale={1} minScale={0.5} maxScale={4} centerOnInit
        wheel={{ step: 0.1 }}
        onTransformed={(e) => actions.setScale(e.state.scale)}
        doubleClick={{ disabled: true }}
      >
        {() => (
          <>
            <ZoomControls scale={state.currentScale} />
            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full flex items-center justify-center"
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: '100%', height: '100%' }}
            >
              <div className="relative w-full h-full">
                <SVG
                  src={floor.svgUrl}
                  title={`План ${floor.label}`}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
                  loader={<div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />}
                  onClick={handleMapClick}
                />
                {state.currentPath && (
                  <RouteOverlay
                    path={state.currentPath}
                    currentFloorId={floor.id}
                    viewBox="0 0 1658 421"
                    onFloorChange={onFloorChange}
                  />
                )}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Room Details Sidebar */}
      <RoomDetailsSidebar
        room={state.selectedRoom}
        isOpen={state.isSidebarOpen}
        onClose={actions.closeSidebar}
        onRouteClick={handleSidebarRouteClick}
      />

      {/* Search & Route Controls */}
      <MapSearch
        isRouteMode={state.isRouteMode}
        searchQuery={state.searchQuery}
        routeQueryStart={state.routeQueryStart}
        routeQueryEnd={state.routeQueryEnd}
        results={results}
        activeRouteInput={state.activeRouteInput}

        onSearch={search}
        onSearchQueryChange={handleSearchQueryChange}
        onRouteQueryStartChange={actions.setRouteQueryStart}
        onRouteQueryEndChange={actions.setRouteQueryEnd}
        onActiveRouteInputChange={actions.setActiveRouteInput}

        onToggleRouteMode={(enable) => enable ? actions.enableRouteMode() : actions.disableRouteMode()}
        onSelectResult={handleSelectResult}
        onClearSearch={handleClearSearch}
        onSwapRoute={actions.swapRoute}
      />


      {/* Floor Selector */}
      <FloorSelector
        currentFloorId={floor.id}
        allFloors={allFloors}
        onFloorChange={onFloorChange}
      />

      {/* Floor Name */}
      <div className="absolute top-20 right-4 md:top-6 md:right-6 pointer-events-none opacity-100 transition-all">
        <span className="text-3xl md:text-4xl font-black text-foreground/20 select-none">
          {floor.label}
        </span>
      </div>
    </div>
  );
}
