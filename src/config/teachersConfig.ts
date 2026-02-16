export interface Teacher {
  id: string;
  name: string;
  position: string;
  email: string;
  avatarUrl?: string;
  roomId?: string; // Додано для переходу на мапу
  schedule: {
    day: string;
    start: string;
    end: string;
  }[];
  isCurator?: boolean;
}

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: 'Петренко Василь Іванович',
    position: 'Викладач фізики',
    email: 'v.petrenko@college.edu.ua',
    roomId: 'cabinet-301', // Приклад ID кабінету
    schedule: [
      { day: 'Pn', start: '08:30', end: '14:00' },
      { day: 'Wt', start: '09:00', end: '15:00' },
      { day: 'Sr', start: '08:30', end: '14:00' },
    ],
  },
  {
    id: 't2',
    name: 'Коваленко Олена Сергіївна',
    position: 'Викладач математики',
    email: 'o.kovalenko@college.edu.ua',
    schedule: [
      { day: 'Mn', start: '10:00', end: '16:00' },
      { day: 'Tu', start: '10:00', end: '16:00' },
      { day: 'We', start: '10:00', end: '16:00' },
      { day: 'Th', start: '10:00', end: '16:00' },
      { day: 'Fr', start: '10:00', end: '15:00' },
    ],
  },
  // ... інші викладачі з вашого списку
  {
    id: 'c1',
    name: 'Гончар Марія Олександрівна',
    position: 'Куратор групи КН-21',
    email: 'm.honchar@college.edu.ua',
    isCurator: true,
    roomId: 'cabinet-105', // Приклад
    schedule: [
      { day: 'Mn', start: '09:00', end: '18:00' },
      { day: 'Fr', start: '09:00', end: '17:00' },
    ],
  },
];