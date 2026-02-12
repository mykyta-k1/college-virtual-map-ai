import Floor1Svg from '@/assets/floors/one_floor.svg';
import Floor2Svg from '@/assets/floors/two_floor.svg';
import Floor3Svg from '@/assets/floors/three_floor.svg';

export type RoomType =
    | 'classroom'   // Аудиторії
    | 'office'      // Службові (деканат, кафедра)
    | 'wc'          // Туалети
    | 'stairs'      // Сходи
    | 'food'        // Їдальня, буфет
    | 'utility'     // Господарські приміщення (кухня, щитова, медпункт)
    | 'hall';       // Коридор, хол, актова зала

export interface FloorRoom {
    id: string;
    label: string;
    type: RoomType;
    description?: string;
    note?: string;
    keywords?: string[];
    staff?: string[];
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
        label: "Перший поверх",
        svgUrl: Floor1Svg,
        rooms: [
            // --- Ліве крило (300-310) ---
            {
                id: "r1-301",
                label: "301",
                type: "office",
                description: "Приймальна комісія [Fictional]",
                keywords: ["вступ", "документи", "абітурієнт"],
                staff: ["Іваненко О.І."]
            },
            {
                id: "r1-303",
                label: "303",
                type: "utility",
                description: "Медпункт",
                note: "Графік: 09:00-15:00",
                keywords: ["лікар", "аптечка", "допомога", "медсестра"]
            },
            {
                id: "r1-305",
                label: "305",
                type: "classroom",
                description: "Мала лекційна зала [Fictional]",
            },
            {
                id: "r1-307",
                label: "307",
                type: "office",
                description: "Бухгалтерія [Fictional]",
                keywords: ["зарплата", "стипендія", "контракт"]
            },
            {
                id: "r1-309",
                label: "309",
                type: "classroom",
                description: "Аудиторія іноземних мов [Fictional]",
                keywords: ["англійська", "німецька"]
            },
            {
                id: "r1-300",
                label: "300",
                type: "classroom",
                description: "Комп'ютерний клас №1 [Fictional]",
                keywords: ["pc", "лабораторна", "інформатика"]
            },
            {
                id: "r1-302",
                label: "302",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r1-304",
                label: "304",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r1-308",
                label: "308",
                type: "utility",
                description: "Серверна / IT відділ [Fictional]",
                keywords: ["адмін", "інтернет", "вайфай"],
                note: "Вхід заборонено"
            },
            {
                id: "r1-310",
                label: "310",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },

            // --- Інфраструктура (Праве крило) ---
            {
                id: "r1-wc-1",
                label: "WC",
                type: "wc",
                description: "Жіноча вбиральня",
                keywords: ["туалет", "жіночий"]
            },
            {
                id: "r1-wc-2",
                label: "WC",
                type: "wc",
                description: "Чоловіча вбиральня",
                keywords: ["туалет", "чоловічий"]
            },
            {
                id: "r1-kitchen",
                label: "Кухня",
                type: "utility",
                description: "Службова кухня",
                note: "Тільки для персоналу [Fictional]"
            },
            {
                id: "r1-cafe-hall",
                label: "КАФЕ ЗАЛ",
                type: "food",
                description: "Обідня зала",
                keywords: ["столи", "обід", "перерва"]
            },
            {
                id: "r1-hall",
                label: "ЗАЛ",
                type: "hall",
                description: "Актова зала",
                keywords: ["концерт", "збори", "виступ", "сцена"]
            },
            {
                id: "r1-cafe",
                label: "КАФЕ",
                type: "food",
                description: "Буфет",
                keywords: ["кава", "їжа", "булочки", "вода"],
                note: "Працює до 16:00"
            },

            // --- Технічні --- (також можна додати головний вхід)
            { id: "r1-stairs-1", label: "Сходи (Центральні)", type: "stairs", keywords: ["вгору", "2 поверх"] },
            { id: "r1-stairs-2", label: "Сходи (Запасні)", type: "stairs", keywords: ["вихід"] }
        ]
    },
    {
        id: 2,
        label: "Другий поверх",
        svgUrl: Floor2Svg,
        rooms: [
            // --- Верхній ряд (319 - 331) ---
            {
                id: "r2-319",
                label: "319",
                type: "classroom",
                description: "Кабінет історії [Fictional]",
                keywords: ["історія", "право"],
                staff: ["Петренко В.В."]
            },
            {
                id: "r2-321",
                label: "321",
                type: "office",
                description: "Методичний кабінет [Fictional]",
                keywords: ["методист", "розклад"]
            },
            {
                id: "r2-323",
                label: "323",
                type: "classroom",
                description: "Мала аудиторія [Fictional]",
            },
            {
                id: "r2-325",
                label: "325",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-327",
                label: "327",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-329",
                label: "329",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-331",
                label: "331",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },

            // --- Нижній ряд (312 - 324) ---
            {
                id: "r2-312",
                label: "312",
                type: "classroom",
                description: "Лабораторія фізики [Fictional]",
                keywords: ["фізика", "досліди", "лабораторна"]
            },
            {
                id: "r2-314",
                label: "314",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-316",
                label: "316",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-318",
                label: "318",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-320",
                label: "320",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-322",
                label: "322",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r2-324",
                label: "324",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },

            // --- Технічні ---
            { id: "r2-stairs-1", label: "Сходи", type: "stairs", keywords: ["вниз", "вгору", "1 поверх", "3 поверх"] },
            { id: "r2-stairs-2", label: "Сходи", type: "stairs" }
        ]
    },
    {
        id: 3,
        label: "Третій поверх",
        svgUrl: Floor3Svg,
        rooms: [
            // --- Верхній ряд (333 - 349) ---
            {
                id: "r3-333",
                label: "333",
                type: "classroom",
                description: "Велика лекційна зала [Fictional]",
                keywords: ["потік", "лекція", "проектор"],
                staff: ["Проф. Мельник А.С."]
            },
            {
                id: "r3-335",
                label: "335",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-337",
                label: "337",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-339",
                label: "339",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-341",
                label: "341",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-343",
                label: "343",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-345",
                label: "345",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-347",
                label: "347",
                type: "utility",
                description: "Архів / Господарська [Fictional]",
                note: "Вхід тільки для персоналу"
            },
            {
                id: "r3-349",
                label: "349",
                type: "classroom",
                description: "Лабораторія хімії [Fictional]",
                keywords: ["хімія", "реактиви", "лабораторна"],
                note: "Обережно!"
            },

            // --- Нижній ряд (326 - 342) ---
            {
                id: "r3-326",
                label: "326",
                type: "classroom",
                description: "Комп'ютерний клас №2 [Fictional]",
                keywords: ["pc", "інформатика", "програмування"]
            },
            {
                id: "r3-328",
                label: "328",
                type: "office",
                description: "Викладацька [Fictional]",
                keywords: ["кафедра", "викладачі", "куратор"]
            },
            {
                id: "r3-330",
                label: "330",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-332",
                label: "332",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-334",
                label: "334",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-336",
                label: "336",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-338",
                label: "338",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-340",
                label: "340",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },
            {
                id: "r3-342",
                label: "342",
                type: "classroom",
                description: "Аудиторія [Fictional]",
            },

            // --- Технічні ---
            { id: "r3-stairs-1", label: "Сходи", type: "stairs", keywords: ["вниз", "2 поверх"] },
            { id: "r3-stairs-2", label: "Сходи", type: "stairs" }
        ]
    }
];