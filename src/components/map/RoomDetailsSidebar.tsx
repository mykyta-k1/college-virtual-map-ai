import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Drawer } from 'vaul';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { SearchableRoom } from '@/lib/search';
import { getRoomIcon } from './mapUtils';
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
}

export function RoomDetailsSidebar({ room, isOpen, onClose }: RoomDetailsSidebarProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Ensure we don't render if no room, BUT for animations/drawer logic we might need to handle presence.
  // However, the parent controls isOpen.
  if (!room) return null;

  // Check if room has a panorama scene
  const hasPanorama = room.panoramaSceneId && panoramaTourConfig.scenes[room.panoramaSceneId];

  // Create a modified config for this specific room view
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

  // Filter teachers for this room
  const roomTeachers = room.teacherIds
    ? teachers.filter((t) => room.teacherIds?.includes(t.id))
    : [];

  const Content = (
    <div className="flex flex-col h-full bg-background">
      {/* Mobile Drawer Handle (Only visible in Drawer) */}
      {isMobile && (
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-2 mt-4" />
      )}

      {/* Header Image / Icon Area OR Panorama */}
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

        {/* Close Button - Different positioning for mobile/desktop if needed */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full bg-background/50 hover:bg-background shadow-sm backdrop-blur-md"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Title Section */}
          <div>
            <div className="flex items-center justify-between mb-1 gap-4">
              <h2 className="text-2xl font-black leading-tight">{room.label}</h2>
              {/* Room Type Badge if not in header/panorama */}
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
            {/* Teachers Section */}
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

            {/* Keywords / Tags */}
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

            {/* Note */}
            {room.note && <NoteItem text={room.note} />}
          </div>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border bg-background shrink-0">
        <Button className="w-full gap-2 text-base font-bold h-12 rounded-xl shadow-lg shadow-primary/20">
          <Navigation className="w-4 h-4" />
          Прокласти маршрут
        </Button>
      </div>
    </div>
  );

  // Render Drawer for Mobile
  if (isMobile) {
    return (
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} shouldScaleBackground>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[85vh] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
            {Content}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  // Render Sheet for Desktop
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
