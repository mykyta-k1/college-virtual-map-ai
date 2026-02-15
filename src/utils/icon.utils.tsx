import {
  GraduationCap,
  Briefcase,
  Bath,
  ArrowUpFromDot,
  Utensils,
  Wrench,
  LayoutDashboard,
  HelpCircle,
} from 'lucide-react';
import type { RoomType } from '@/config/floorsConfig';

/**
 * Повертає відповідну іконку та стилі для заданого типу кімнати.
 * @param type Тип кімнати (RoomType)
 * @param className Додаткові CSS класи для іконки
 */
export const getRoomIcon = (type: RoomType, className?: string) => {
  const props = { className: className || 'w-5 h-5' };

  switch (type) {
    case 'classroom': // Аудиторії
      return <GraduationCap {...props} className={`${props.className} text-blue-500`} />;
    case 'office': // Службові приміщення
      return <Briefcase {...props} className={`${props.className} text-indigo-500`} />;
    case 'wc': // Вбиральні
      return <Bath {...props} className={`${props.className} text-cyan-500`} />;
    case 'stairs': // Сходи
      return <ArrowUpFromDot {...props} className={`${props.className} text-gray-500`} />;
    case 'food': // Їдальня / Буфет
      return <Utensils {...props} className={`${props.className} text-orange-500`} />;
    case 'utility': // Господарські
      return <Wrench {...props} className={`${props.className} text-slate-500`} />;
    case 'hall': // Коридори / Холи
      return <LayoutDashboard {...props} className={`${props.className} text-purple-500`} />;
    default:
      return <HelpCircle {...props} className={`${props.className} text-muted-foreground`} />;
  }
};
