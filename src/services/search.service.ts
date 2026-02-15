import Fuse, { type FuseResult } from 'fuse.js';
import type { FloorData, FloorRoom } from '@/config/floorsConfig';
import { teachers } from '@/config/teachersConfig';

/**
 * Розширений тип кімнати для пошуку.
 * Включає ID поверху та віртуальне поле з іменами викладачів.
 */
export type SearchableRoom = FloorRoom & {
  floorId: number;
  teacherNames?: string[];
};

/**
 * Сервіс для обробки пошукових запитів.
 * Використовує Fuse.js для нечіткого пошуку.
 */
export class SearchService {
  private fuse: Fuse<SearchableRoom>;
  private allRooms: SearchableRoom[];

  constructor(floors: FloorData[]) {
    this.allRooms = this.flattenRooms(floors);
    this.fuse = this.createFuseInstance(this.allRooms);
  }

  /**
   * Перетворює ієрархічні дані поверхів у плоский список кімнат,
   * додаючи імена викладачів для пошуку.
   */
  private flattenRooms(floors: FloorData[]): SearchableRoom[] {
    return floors.flatMap((floor) =>
      floor.rooms.map((room) => {
        // Знаходимо імена викладачів по їх ID
        const teacherNames =
          room.teacherIds
            ?.map((id) => teachers.find((t) => t.id === id)?.name)
            .filter((name): name is string => !!name) || [];

        return {
          ...room,
          floorId: floor.id,
          teacherNames: teacherNames,
        };
      }),
    );
  }

  /**
   * Створює та налаштовує екземпляр Fuse.js.
   */
  private createFuseInstance(rooms: SearchableRoom[]): Fuse<SearchableRoom> {
    const options = {
      includeScore: true,
      threshold: 0.3, // Поріг чутливості для виправлення одруківки
      ignoreLocation: true, // Шукати в будь-якій частині рядка
      minMatchCharLength: 2, // Мінімальна довжина запиту
      keys: [
        { name: 'label', weight: 1.0 }, // Номер кімнати (найвищий пріоритет)
        { name: 'keywords', weight: 0.8 }, // Ключові слова
        { name: 'teacherNames', weight: 0.7 }, // Імена викладачів
        { name: 'note', weight: 0.5 }, // Примітки
        { name: 'description', weight: 0.3 }, // Опис
      ],
    };

    return new Fuse(rooms, options);
  }

  /**
   * Виконує пошук по заданому запиту.
   * @param query Пошуковий запит
   * @returns Результати пошуку
   */
  public search(query: string): FuseResult<SearchableRoom>[] {
    if (!query || !query.trim()) {
      return [];
    }
    return this.fuse.search(query);
  }

  /**
   * Повертає всі доступні для пошуку кімнати.
   */
  public getAllRooms(): SearchableRoom[] {
    return this.allRooms;
  }
}
