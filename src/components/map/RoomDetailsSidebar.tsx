import { useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { SearchableRoom } from '@/services/search.service';
import { getRoomIcon } from '@/utils/icon.utils';
import { Button } from '@/components/ui/button';
import { Navigation, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import PanoramaViewer from '@/components/tour/PanoramaViewer';
import panoramaTourConfig from '@/config/panoramaTour';
import { useMediaQuery } from '@/hooks/use-media-query';
import { teachers } from '@/config/teachersConfig';
import { TeacherCard } from './TeacherCard';
import { NoteItem } from './NoteItem';

interface RoomDetailsSidebarProps {
  room: SearchableRoom | null;
  isOpen: boolean;
  onClose: () => void;
  onRouteClick?: () => void;
}

export function RoomDetailsSidebar({
  room,
  isOpen,
  onClose,
  onRouteClick,
}: RoomDetailsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Check if room has panorama scenario
  const hasPanorama = room?.panoramaSceneId && panoramaTourConfig.scenes[room.panoramaSceneId];

  // Memoized panorama config
  const roomPanoramaConfig = useMemo(
    () =>
      hasPanorama && room?.panoramaSceneId
        ? {
            ...panoramaTourConfig,
            default: {
              ...panoramaTourConfig.default,
              firstScene: room.panoramaSceneId,
              // autoLoad: false is now inherited from config/panoramaTour.ts
            },
          }
        : null,
    [room?.panoramaSceneId, hasPanorama],
  );

  const roomTeachers = room?.teacherIds
    ? teachers.filter((t) => room.teacherIds?.includes(t.id))
    : [];

  if (!room) return null;

  const Content = (
    // Mobile needs padding for drag handle, Desktop should be flush
    <div className={`flex flex-col h-full bg-background ${isMobile ? 'pt-6' : 'pt-0'}`}>
      {/* Header: Panorama or Icon */}
      <div className="relative w-full h-56 md:h-64 shrink-0 bg-secondary flex items-center justify-center border-b border-border/50 overflow-hidden">
        {hasPanorama && roomPanoramaConfig ? (
          <div className="absolute inset-0 z-0">
            <PanoramaViewer key={room.panoramaSceneId} config={roomPanoramaConfig} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in-50 duration-300 z-10 p-6 text-center">
            <div className="p-4 bg-background rounded-full shadow-sm border border-border/50">
              {getRoomIcon(room.type, 'w-10 h-10')}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-background/50 px-2 py-0.5 rounded">
              {room.floorId} Поверх
            </span>
          </div>
        )}

        {/* Кнопка закриття (Тільки десктоп, бо мобільна має свайп) */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-background/50 hover:bg-background shadow-sm backdrop-blur-md"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Основний контент: Скрол з деталями */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Назва кімнати та тип */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getRoomIcon(room.type, 'w-5 h-5 text-primary')}
              <h2 className="text-2xl font-bold tracking-tight">{room.label}</h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              {room.type}
            </Badge>
          </div>

          {/* Опис кімнати */}
          {room.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Опис
              </h3>
              <p className="text-sm leading-relaxed text-foreground/90">{room.description}</p>
            </div>
          )}

          {/* Викладачі */}
          {roomTeachers.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Викладачі
              </h3>
              <div className="space-y-2">
                {roomTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            </div>
          )}

          {/* Примітки */}
          {room.note && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Примітка
              </h3>
              <NoteItem text={room.note} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Футер: Кнопка маршруту */}
      {onRouteClick && (
        <div className="p-4 border-t bg-background">
          <Button onClick={onRouteClick} className="w-full gap-2 shadow-sm" size="lg">
            <Navigation className="w-4 h-4" />
            Побудувати маршрут
          </Button>
        </div>
      )}
    </div>
  );

  // Рендер: Desktop (Sheet) або Mobile (Drawer)
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="sr-only">
            <DrawerTitle>{room.label}</DrawerTitle>
            <DrawerDescription>Деталі кімнати</DrawerDescription>
          </DrawerHeader>
          {Content}
        </DrawerContent>
        {/* Disable overlay darkening */}
        <div className="hidden" data-vaul-overlay="" />
      </Drawer>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l-0 sm:border-l">
        {Content}
      </SheetContent>
      {/* Disable overlay darkening by not rendering SheetOverlay */}
    </Sheet>
  );
}
