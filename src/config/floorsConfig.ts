import Floor1Svg from '@/assets/floors/one_floor.svg';
import Floor2Svg from '@/assets/floors/two_floor.svg';
import Floor3Svg from '@/assets/floors/three_floor.svg';

export type RoomType =
  | 'classroom' // Аудиторії
  | 'office' // Службові (деканат, кафедра)
  | 'wc' // Туалети
  | 'stairs' // Сходи
  | 'food' // Їдальня, буфет
  | 'utility' // Господарські приміщення (кухня, щитова, медпункт)
  | 'hall'; // Коридор, хол, актова зала

export interface FloorRoom {
  id: string;
  label: string;
  type: RoomType;
  description?: string;
  note?: string;
  keywords?: string[];
  teacherIds?: string[];
  panoramaSceneId?: string;
}

export interface FloorData {
  id: number;
  label: string;
  svgUrl: string;
  rooms: FloorRoom[];
}

export const floorsConfig: FloorData[] = [
  {
    id: 1,
    label: 'Перший поверх',
    svgUrl: Floor1Svg,
    rooms: [
      // --- Ліве крило (300-310) ---
      {
        id: 'r1-301',
        label: '301',
        type: 'office',
        description: 'Кабінет української мови та літератури',
        keywords: ['вступ', 'документи', 'абітурієнт'],
        panoramaSceneId: 'room_301',
      },
      {
        id: 'r1-303',
        label: '303',
        type: 'utility',
        description: 'Викладацька',
        note: 'Графік: 09:00-15:00',
        keywords: ['лікар', 'аптечка', 'допомога', 'медсестра'],
        panoramaSceneId: 'room_303',
      },
      {
        id: 'r1-305',
        label: '305',
        type: 'classroom',
        description: 'Мала лекційна зала',
        panoramaSceneId: 'room_305',
      },
      {
        id: 'r1-307',
        label: '307',
        type: 'office',
        description: 'Мала лекційна зала',
        keywords: ['зарплата', 'стипендія', 'контракт'],
        panoramaSceneId: 'room_307',
      },
      {
        id: 'r1-309',
        label: '309',
        type: 'classroom',
        description: 'Аудиторія іноземних мов',
        keywords: ['англійська', 'німецька'],
        panoramaSceneId: 'room_309',
      },
      {
        id: 'r1-300',
        label: '300',
        type: 'classroom',
        description: 'Кабінет української мови та літератури',
        keywords: ['pc', 'лабораторна', 'інформатика'],
        teacherIds: ['t3'],
      },
      {
        id: 'r1-302',
        label: '302',
        type: 'classroom',
        description: 'Кабінет історії україни',
      },
      {
        id: 'r1-304',
        label: '304',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r1-308',
        label: '308',
        type: 'utility',
        description: 'Серверна / IT відділ',
        keywords: ['адмін', 'інтернет', 'вайфай'],
        note: 'Вхід заборонено',
      },
      {
        id: 'r1-310',
        label: '310',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },

      // --- Інфраструктура (Праве крило) ---
      {
        id: 'r1-wc-1',
        label: 'WC',
        type: 'wc',
        description: 'Жіноча вбиральня',
        keywords: ['туалет', 'жіночий'],
        panoramaSceneId: 'wc_1',
      },
      {
        id: 'r1-wc-2',
        label: 'WC',
        type: 'wc',
        description: 'Чоловіча вбиральня',
        keywords: ['туалет', 'чоловічий'],
      },
      {
        id: 'r1-kitchen',
        label: 'Кухня',
        type: 'utility',
        description: 'Студентська кухня',
        note: 'Тільки для студентів',
      },
      {
        id: 'r1-cafe-hall',
        label: 'КАФЕ ЗАЛ',
        type: 'food',
        description: 'Обідня зала',
        keywords: ['столи', 'обід', 'перерва'],
      },
      {
        id: 'r1-hall',
        label: 'ЗАЛ',
        type: 'hall',
        description: 'Актова зала',
        keywords: ['концерт', 'збори', 'виступ', 'сцена'],
        panoramaSceneId: 'hall_1_1',
      },
      {
        id: 'r1-cafe',
        label: 'КАФЕ',
        type: 'food',
        description: 'Буфет',
        keywords: ['кава', 'їжа', 'булочки', 'вода'],
        note: 'Працює до 16:00',
      },
      {
        id: 'r1-entrance',
        label: 'Вхід',
        type: 'hall',
        description: 'Вхід в зону',
        keywords: ['кава', 'їжа', 'булочки', 'вода'],
        panoramaSceneId: 'hall_1_2',
      },

      {
        id: 'r1-stairs-1',
        label: 'Сходи (Центральні)',
        type: 'stairs',
        keywords: ['вгору', '2 поверх'],
      },
      { id: 'r1-stairs-2', label: 'Сходи (Запасні)', type: 'stairs', keywords: ['вихід'] },
    ],
  },
  {
    id: 2,
    label: 'Другий поверх',
    svgUrl: Floor2Svg,
    rooms: [
      // --- Верхній ряд (319 - 331) ---
      {
        id: 'r2-319',
        label: '319',
        type: 'classroom',
        description: 'Кабінет історії [Fictional]',
        keywords: ['історія', 'право'],
        teacherIds: ['t4'],
        panoramaSceneId: 'room_319',
      },
      {
        id: 'r2-321',
        label: '321',
        type: 'office',
        description: 'Методичний кабінет [Fictional]',
        keywords: ['методист', 'розклад'],
        panoramaSceneId: 'room_321',
      },
      {
        id: 'r2-323',
        label: '323',
        type: 'classroom',
        description: 'Мала аудиторія [Fictional]',
        teacherIds: ['t2'],
        panoramaSceneId: 'room_323',
      },
      {
        id: 'r2-325',
        label: '325',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_325',
      },
      {
        id: 'r2-327',
        label: '327',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r2-329',
        label: '329',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r2-331',
        label: '331',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },

      // --- Нижній ряд (312 - 324) ---
      {
        id: 'r2-312',
        label: '312',
        type: 'classroom',
        description: 'Лабораторія фізики [Fictional]',
        keywords: ['фізика', 'досліди', 'лабораторна'],
        panoramaSceneId: 'room_312',
        teacherIds: ['t1'],
      },
      {
        id: 'r2-314',
        label: '314',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_314',
      },
      {
        id: 'r2-316',
        label: '316',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_316',
      },
      {
        id: 'r2-318',
        label: '318',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_318',
      },
      {
        id: 'r2-320',
        label: '320',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_320',
      },
      {
        id: 'r2-322',
        label: '322',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_322',
      },
      {
        id: 'r2-324',
        label: '324',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_324',
      },

      // --- Технічні ---
      {
        id: 'r2-stairs-1',
        label: 'Сходи',
        type: 'stairs',
        keywords: ['вниз', 'вгору', '1 поверх', '3 поверх'],
      },
      { id: 'r2-stairs-2', label: 'Сходи', type: 'stairs' },
    ],
  },
  {
    id: 3,
    label: 'Третій поверх',
    svgUrl: Floor3Svg,
    rooms: [
      // --- Верхній ряд (333 - 349) ---
      {
        id: 'r3-333',
        label: '333',
        type: 'classroom',
        description: 'Велика лекційна зала [Fictional]',
        keywords: ['потік', 'лекція', 'проектор'],
        panoramaSceneId: 'room_333',
      },
      {
        id: 'r3-335',
        label: '335',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-337',
        label: '337',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-339',
        label: '339',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-341',
        label: '341',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-343',
        label: '343',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-345',
        label: '345',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-347',
        label: '347',
        type: 'utility',
        description: 'Архів / Господарська [Fictional]',
        panoramaSceneId: 'room_347',
        note: 'Вхід тільки для персоналу',
      },
      {
        id: 'r3-349',
        label: '349',
        type: 'classroom',
        description: 'Лабораторія хімії [Fictional]',
        keywords: ['хімія', 'реактиви', 'лабораторна'],
        note: 'Обережно!',
        teacherIds: ['t5'],
      },

      // --- Нижній ряд (326 - 342) ---
      {
        id: 'r3-326',
        label: '326',
        type: 'classroom',
        description: "Комп'ютерний клас №2 [Fictional]",
        keywords: ['pc', 'інформатика', 'програмування'],
      },
      {
        id: 'r3-328',
        label: '328',
        type: 'office',
        description: 'Викладацька [Fictional]',
        keywords: ['кафедра', 'викладачі', 'куратор'],
        teacherIds: ['c1'],
      },
      {
        id: 'r3-330',
        label: '330',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-332',
        label: '332',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-334',
        label: '334',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-336',
        label: '336',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-338',
        label: '338',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },
      {
        id: 'r3-340',
        label: '340',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
        panoramaSceneId: 'room_340',
      },
      {
        id: 'r3-342',
        label: '342',
        type: 'classroom',
        description: 'Аудиторія [Fictional]',
      },

      // --- Технічні ---
      { id: 'r3-stairs-1', label: 'Сходи', type: 'stairs', keywords: ['вниз', '2 поверх'] },
      { id: 'r3-stairs-2', label: 'Сходи', type: 'stairs' },
    ],
  },
];
