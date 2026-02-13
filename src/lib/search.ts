import Fuse from 'fuse.js';
import type { FloorData, FloorRoom } from '@/config/floorsConfig';
import { teachers } from '@/config/teachersConfig';

// Додатковий тип для результату пошуку (кімната + ID поверху + розширені дані для пошуку)
export type SearchableRoom = FloorRoom & {
    floorId: number;
    // Додаємо віртуальне поле для пошуку, яке міститиме імена викладачів
    teacherNames?: string[];
};

export const flattenRooms = (floors: FloorData[]): SearchableRoom[] => {
    return floors.flatMap((floor) =>
        floor.rooms.map((room) => {
            // Знаходимо імена викладачів по ID
            const teacherNames = room.teacherIds
                ?.map(id => teachers.find(t => t.id === id)?.name)
                .filter((name): name is string => !!name) || [];

            return {
                ...room,
                floorId: floor.id,
                teacherNames: teacherNames
            };
        })
    );
};

export const createFuseInstance = (rooms: SearchableRoom[]) => {
    const options = {
        // Чи повертати оцінку відповідності (корисно для дебагу, 0 = ідеально)
        includeScore: true,

        // Поріг нечіткості (0.0 - точний збіг, 1.0 - збіг з чим завгодно)
        // 0.3 - ідеально: пробачає дрібні одруківки ("бугалтерія"), але не показує сміття
        threshold: 0.3,

        // Ігнорувати, де саме в рядку знайдено збіг (на початку чи в кінці)
        ignoreLocation: true,

        // Мінімальна довжина запиту (щоб не шукало по 1 літері)
        minMatchCharLength: 2,

        keys: [
            {
                name: 'label',
                weight: 1.0 // Найвищий пріоритет. Якщо ввели "301" — це точно 301.
            },
            {
                name: 'keywords',
                weight: 0.8 // Високий пріоритет. Синоніми ("ксерокс", "довідка").
            },
            {
                name: 'teacherNames',
                weight: 0.7 // Пошук викладачів ("Петренко").
            },
            {
                name: 'note',
                weight: 0.5 // Примітки ("Тут роздруковують...").
            },
            {
                name: 'description',
                weight: 0.3 // Офіційний опис (найменш важливий).
            }
        ]
    };

    return new Fuse(rooms, options);
};
