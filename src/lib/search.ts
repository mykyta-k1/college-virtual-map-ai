import Fuse from 'fuse.js';
import type { FloorData, FloorRoom } from '@/config/floorsConfig';

// Додатковий тип для результату пошуку (кімната + ID поверху)
export type SearchableRoom = FloorRoom & { floorId: number };

export const flattenRooms = (floors: FloorData[]): SearchableRoom[] => {
    return floors.flatMap((floor) =>
        floor.rooms.map((room) => ({
            ...room,
            floorId: floor.id, // Додаємо ID поверху до кожної кімнати
        }))
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
                name: 'staff',
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
