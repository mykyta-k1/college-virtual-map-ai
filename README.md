# 🗺️ Віртуальна карта коледжу (PWA)

Інтерактивний веб-додаток для навігації студентів та відвідувачів коледжу. Це Progressive Web App (PWA), що дозволяє швидко знаходити аудиторії, переглядати 360° панорами та отримувати важливу довідкову інформацію про викладачів та кабінети.

---

## 📂 Структура проєкту

```text
college-virtual-map-ai/
├── public/                      # Статичні ресурси
│   ├── panoramas/               # Файли 360° панорам (.webp)
│   ├── icons/                   # Іконки PWA
│   └── manifest.json            # Конфігурація PWA
│
├── src/
│   ├── assets/                  # Легкі асети (SVG плани поверхів)
│   ├── components/
│   │   ├── map/                 # Логіка мапи (MapViewer, RoomDetails, Sidebar)
│   │   ├── tour/                # 360° тур (PanoramaViewer)
│   │   └── ui/                  # Базові UI компоненти (Shadcn UI)
│   │
│   ├── config/                  # Конфігураційні файли даних
│   │   ├── floorsConfig.ts      # Дані про кабінети та поверхи
│   │   ├── teachersConfig.ts    # База даних викладачів
│   │   └── panoramaTour.ts      # Налаштування сцен 360°
│   │
│   ├── hooks/                   # Кастомні хуки (useMediaQuery)
│   ├── lib/                     # Утиліти (search.ts, utils.ts)
│   └── App.tsx                  # Головний компонент
```

---

## 🚀 Сторінки та Функціонал

### 1. 🏠 Головна Мапа
* **Інтерактивні SVG:** Масштабовані плани поверхів.
* **Smart Search:** Пошук кабінетів за номером, назвою або **прізвищем викладача**.
* **Деталі кабінету:**
  * Бічна панель (Sheet) на десктопі.
  * Висувна панель (Drawer) на мобільних пристроях.
  * Інформація про **викладачів** (статус "В мережі", контакти).
* **360° Перегляд:** Інтегрований переглядач панорам для обраних локацій.

### 2. 🛡️ Безпека та Інфо
* Швидкий доступ до схем укриттів.
* Екстрені контакти.

---

## 💾 Структура Даних

### 👨‍🏫 Teachers (`teachersConfig.ts`)
Зберігає інформацію про персонал.
```typescript
interface Teacher {
    id: string;          // "t1"
    name: string;        // "Петренко В.І."
    position: string;    // "Викладач фізики"
    email: string;       // Для копіювання
    avatarUrl?: string;  // Шлях до фото
    isCurator?: boolean; // Чи є куратором
    schedule: {          // Графік для статусу "В мережі"
        day: string;     // "Mn", "Tu"...
        start: string;   // "08:30"
        end: string;     // "14:00"
    }[];
}
```

### 🚪 Rooms (`floorsConfig.ts`)
Описує кожне приміщення на карті.
```typescript
interface FloorRoom {
    id: string;          // "r1-301" (збігається з ID в SVG)
    label: string;       // "301"
    type: RoomType;      // 'classroom' | 'office' | 'wc' ...
    
    description?: string;// "Кабінет фізики"
    note?: string;       // "Тут є проектор"
    keywords?: string[]; // ["наука", "лабораторія"]
    
    teacherIds?: string[]; // ["t1", "t2"] — прив'язка до Teachers
    panoramaSceneId?: string; // "scene_1" — прив'язка до Panorama
}
```

### 📷 Panoramas (`panoramaTour.ts`)
Конфігурація 360° туру.
```typescript
interface PanoramaScene {
    title: string;       // "Головний хол"
    panorama: string;    // Шлях до .jpg
    hotSpots: HotSpot[]; // Точки переходу або інфо
}
```

## Використані джерела

![https://www.npmjs.com/package/pannellum-react](Pannellum lib)
![https://ui.shadcn.com/](UI lib)
![https://www.fusejs.io/getting-started/installation.html](search engine)
![https://prettier.io/docs/install](Prettier)
