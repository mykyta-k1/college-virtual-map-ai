export interface HandbookItem {
    id: string;
    name: string;
    category: 'administration' | 'departments' | 'infrastructure';
    description?: string;
    location?: {
        floorId: number;
        roomId: string;
    };
}

export const handbookData: HandbookItem[] = [
    // --- АДМІНІСТРАЦІЯ ---
    {
        id: "director",
        name: "Кабінет Директора",
        category: "administration",
        location: { floorId: 1, roomId: "305" } // Приклад
    },
    {
        id: "deputy-director",
        name: "Заступик директора з НВР",
        category: "administration",
        location: { floorId: 1, roomId: "303" } // Приклад
    },
    {
        id: "accounting",
        name: "Бухгалтерія",
        category: "administration",
        location: { floorId: 1, roomId: "301" } // Приклад
    },

    // --- КАФЕДРИ ---
    {
        id: "cs-dept",
        name: "Кафедра комп'ютерних наук",
        category: "departments",
        location: { floorId: 2, roomId: "323" } // Приклад
    },
    {
        id: "math-dept",
        name: "Кафедра математики",
        category: "departments",
        location: { floorId: 2, roomId: "325" } // Приклад
    },
    {
        id: "humanities-dept",
        name: "Кафедра гуманітарних дисциплін",
        category: "departments",
        location: { floorId: 3, roomId: "335" } // Приклад
    },

    // --- ІНФРАСТРУКТУРА ---
    {
        id: "library",
        name: "Бібліотека",
        category: "infrastructure",
        location: { floorId: 2, roomId: "331" } // Приклад
    },
    {
        id: "canteen",
        name: "Їдальня (Кафе)",
        category: "infrastructure",
        location: { floorId: 1, roomId: "cafe" }
    },
    {
        id: "assembly-hall",
        name: "Актова зала",
        category: "infrastructure",
        location: { floorId: 1, roomId: "hall" }
    },
    {
        id: "medical",
        name: "Медпункт",
        category: "infrastructure",
        location: { floorId: 1, roomId: "300" } // Приклад
    },
    {
        id: "wc-1",
        name: "Вбиральні (1 поверх)",
        category: "infrastructure",
        location: { floorId: 1, roomId: "wc-m" }
    },
];
