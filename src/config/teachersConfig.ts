export interface Teacher {
    id: string;
    name: string;
    position: string;
    email: string;
    avatarUrl?: string; // Path to avatar image or undefined for fallback
    schedule: {
        day: string;
        start: string; // HH:MM
        end: string;   // HH:MM
    }[];
    isCurator?: boolean;
}

export const teachers: Teacher[] = [
    {
        id: "t1",
        name: "Петренко Василь Іванович",
        position: "Викладач фізики",
        email: "v.petrenko@college.edu.ua",
        schedule: [
            { day: "Pn", start: "08:30", end: "14:00" },
            { day: "Wt", start: "09:00", end: "15:00" },
            { day: "Sr", start: "08:30", end: "14:00" },
        ]
    },
    {
        id: "t2",
        name: "Коваленко Олена Сергіївна",
        position: "Викладач математики",
        email: "o.kovalenko@college.edu.ua",
        schedule: [
            { day: "Mn", start: "10:00", end: "16:00" },
            { day: "Tu", start: "10:00", end: "16:00" },
            { day: "We", start: "10:00", end: "16:00" },
            { day: "Th", start: "10:00", end: "16:00" },
            { day: "Fr", start: "10:00", end: "15:00" },
        ]
    },
    {
        id: "t3",
        name: "Сидоренко Андрій Вікторович",
        position: "Викладач інформатики",
        email: "a.sydorenko@college.edu.ua",
        schedule: [
            { day: "Mn", start: "09:00", end: "17:00" },
            { day: "We", start: "09:00", end: "17:00" },
            { day: "Fr", start: "09:00", end: "16:00" },
        ]
    },
    {
        id: "t4",
        name: "Мельник Ірина Петрівна",
        position: "Викладач історії",
        email: "i.melnyk@college.edu.ua",
        schedule: [
            { day: "Tu", start: "08:00", end: "13:00" },
            { day: "Th", start: "08:00", end: "13:00" },
        ]
    },
    {
        id: "t5",
        name: "Бойко Тарас Григорович",
        position: "Викладач хімії",
        email: "t.boyko@college.edu.ua",
        schedule: [
            { day: "Mn", start: "11:00", end: "17:00" },
            { day: "Fr", start: "11:00", end: "17:00" },
        ]
    },
    {
        id: "c1",
        name: "Гончар Марія Олександрівна",
        position: "Куратор групи КН-21",
        email: "m.honchar@college.edu.ua",
        isCurator: true,
        schedule: [
            { day: "Mn", start: "09:00", end: "18:00" },
            { day: "Tu", start: "09:00", end: "18:00" },
            { day: "We", start: "09:00", end: "18:00" },
            { day: "Th", start: "09:00", end: "18:00" },
            { day: "Fr", start: "09:00", end: "17:00" },
        ]
    }
];
