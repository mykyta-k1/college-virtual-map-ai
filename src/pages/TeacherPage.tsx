import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Mail, 
  GraduationCap, 
  Users, 
  User, 
  Calendar, 
  Clock 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { teachers, type Teacher } from '@/config/teachersConfig';

// Словник для перекладу днів тижня
const dayMap: Record<string, string> = {
  'Mn': 'Пн', 'Pn': 'Пн',
  'Tu': 'Вт', 'Wt': 'Вт',
  'We': 'Ср', 'Sr': 'Ср',
  'Th': 'Чт', 'Ct': 'Чт',
  'Fr': 'Пт', 'Pt': 'Пт'
};

export default function TeacherPage() {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // Групуємо викладачів: Куратори та інші викладачі
  const groupedTeachers = {
    curators: teachers.filter(t => t.isCurator),
    teachers: teachers.filter(t => !t.isCurator),
  };

  const handleMapAction = (teacher: Teacher) => {
    // Якщо є конкретний кабінет, ведемо туди, інакше просто шукаємо за прізвищем на мапі
    if (teacher.roomId) {
      navigate(`/?room=${teacher.roomId}`);
    } else {
      navigate(`/?search=${encodeURIComponent(teacher.name)}`);
    }
  };

  const TeacherList = () => (
    <div className="space-y-12 md:space-y-16 pb-24 md:pb-12 w-full max-w-3xl mx-auto relative z-10">
      
      {/* Секція: Куратори */}
      {groupedTeachers.curators.length > 0 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 sticky top-4 z-20 w-max">
            <div className="p-2 bg-foreground text-background rounded-xl shadow-lg">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Куратори
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" value={openItem} onValueChange={setOpenItem}>
            {groupedTeachers.curators.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}
          </Accordion>
        </div>
      )}

      {/* Секція: Викладачі */}
      {groupedTeachers.teachers.length > 0 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex items-center gap-3 sticky top-4 z-20 w-max">
            <div className="p-2 bg-foreground text-background rounded-xl shadow-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Викладачі
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" value={openItem} onValueChange={setOpenItem}>
            {groupedTeachers.teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}
          </Accordion>
        </div>
      )}
    </div>
  );

  // Окремий компонент картки викладача для чистоти коду
  const TeacherCard = ({ teacher }: { teacher: Teacher }) => (
    <AccordionItem 
      value={teacher.id} 
      className="border border-border/40 bg-background/60 backdrop-blur-xl rounded-2xl px-2 md:px-4 overflow-hidden transition-all duration-300 data-[state=open]:border-foreground/20 data-[state=open]:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-foreground/30"
    >
      <AccordionTrigger className="text-left py-5 hover:no-underline group">
        <div className="flex items-center gap-4 w-full pr-4">
          {/* Аватарка */}
          <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden">
            {teacher.avatarUrl ? (
              <img src={teacher.avatarUrl} alt={teacher.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-base md:text-lg font-semibold">{teacher.name}</span>
            <span className="text-xs md:text-sm text-muted-foreground font-normal">{teacher.position}</span>
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base">
        <div className="pl-14 md:pl-16 space-y-6">
          
          {/* Розклад */}
          {teacher.schedule.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium text-sm">
                <Calendar className="w-4 h-4" />
                Графік роботи
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {teacher.schedule.map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 border border-border/50">
                    <span className="font-semibold text-foreground w-6 text-center text-xs bg-background rounded-md py-0.5">
                      {dayMap[slot.day] || slot.day}
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3 h-3 opacity-70" />
                      {slot.start} - {slot.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Кнопки дій */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm font-medium border-border/50 hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm"
              onClick={() => handleMapAction(teacher)}
            >
              <MapPin className="w-4 h-4" />
              Знайти на мапі
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full gap-2 h-9 md:h-10 px-4 md:px-6 text-xs md:text-sm font-medium transition-all duration-300 shadow-sm"
              onClick={() => window.location.href = `mailto:${teacher.email}`}
            >
              <Mail className="w-4 h-4" />
              Написати
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-background relative overflow-y-auto overflow-x-hidden selection:bg-foreground selection:text-background pb-20">
      
      {/* 2026 Trend: Subtle Tech Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 pt-12 md:pt-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16 md:mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-muted/50 rounded-full border border-border/50 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-2">
              <GraduationCap className="w-3 h-3" /> Викладацький склад
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Викладачі
          </h1>
          
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto font-medium">
            Розклад, контакти та розташування кабінетів викладачів коледжу. Знайдіть потрібну людину за кілька кліків.
          </p>
        </div>

        {/* Content */}
        <TeacherList />
      </div>
    </div>
  );
}