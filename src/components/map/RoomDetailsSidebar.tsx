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

export function RoomDetailsSidebar({ room, isOpen, onClose, onRouteClick }: RoomDetailsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Якщо кімната не вибрана, не рендеримо нічого (хоча для анімації drawer це може бути нюансом, але батьківський компонент контролює isOpen)
  if (!room) return null;

  // Перевірка наявності панорами для цієї кімнати
  const hasPanorama = room.panoramaSceneId && panoramaTourConfig.scenes[room.panoramaSceneId];

  // Створення конфігурації для панорами (якщо вона є)
  const roomPanoramaConfig =
    hasPanorama && room.panoramaSceneId
      ? {
        ...panoramaTourConfig,
        default: {
          ...panoramaTourConfig.default,
          firstScene: room.panoramaSceneId,
          autoLoad: true,
        },
      }
      : null;

  // Фільтрація викладачів, закріплених за цією кімнатою
  const roomTeachers = room.teacherIds
    ? teachers.filter((t) => room.teacherIds?.includes(t.id))
    : [];

  const Content = (
    <div className="flex flex-col h-full bg-background">
      {/* Заголовок: Панорама або Іконка */}
      <div className="relative w-full h-56 md:h-64 shrink-0 bg-secondary flex items-center justify-center border-b border-border/50 overflow-hidden">
        {hasPanorama && roomPanoramaConfig ? (
          <div className="absolute inset-0 z-0">
            <PanoramaViewer config={roomPanoramaConfig} />
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
            <span className="sr-only">Закрити</span>
          </Button>
        )}
      </div>

      {/* Контент з прокруткою */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Секція заголовку */}
          <div>
            <div className="flex items-center justify-between mb-1 gap-4">
              <h2 className="text-2xl font-black leading-tight">{room.label}</h2>
              {/* Бейдж поверху, якщо він не відображений в хедері (наприклад, коли є панорама) */}
              {hasPanorama && (
                <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                  {room.floorId} Поверх
                </span>
              )}
            </div>
            {room.description && (
              <p className="text-lg text-muted-foreground leading-snug">{room.description}</p>
            )}
          </div>

          <div className="h-px w-full bg-border/50" />

          <div className="space-y-6">
            {/* Секція викладачів */}
            {roomTeachers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2 pl-2">
                  Викладачі
                </h3>
                <div className="flex flex-col">
                  {roomTeachers.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                  ))}
                </div>
              </div>
            )}

            {/* Ключові слова */}
            {room.keywords && room.keywords.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Ключові слова
                </h3>
                <div className="flex flex-wrap gap-2">
                  {room.keywords.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs border border-border/50">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Примітки */}
            {room.note && <NoteItem text={room.note} />}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background shrink-0 pb-safe">
        <Button
          className="w-full gap-2 text-base font-bold h-12 rounded-xl shadow-lg shadow-primary/20"
          onClick={onRouteClick}
        >
          <Navigation className="w-4 h-4" />
          Прокласти маршрут
        </Button>
      </div>
    </div>
  );

  // Рендер шторки для мобільних
  if (isMobile) {
    return (
      <Drawer shouldScaleBackground open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent className="h-[85vh] outline-none">
          {/* Accessible Handle Area */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4 cursor-grab active:cursor-grabbing" />

          {/* Drawer Header (Required for accessibility, but can be visually hidden if needed) */}
          <DrawerHeader className="sr-only">
            <DrawerTitle>{room.label}</DrawerTitle>
            <DrawerDescription>Деталі кімнати та навігація</DrawerDescription>
          </DrawerHeader>

          {Content}
        </DrawerContent>
      </Drawer>
    );
  }

  // Рендер бокової панелі для десктопу
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 gap-0 border-l border-border/50 shadow-2xl bg-background overflow-hidden flex flex-col"
      >
        {Content}
      </SheetContent>
    </Sheet>
  );
}
