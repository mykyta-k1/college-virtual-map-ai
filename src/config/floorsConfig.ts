import Floor1Svg from '@/assets/floors/Floor1.svg';
import Floor2Svg from '@/assets/floors/Floor2.svg';
import Floor3Svg from '@/assets/floors/Floor3.svg';

export interface FloorRoom {
    id: string;
    label: string;
    type: 'classroom' | 'wc' | 'stairs' | 'service' | 'entrance' | 'closet';
    note?: string;
}

export interface FloorData {
    id: number;
    label: string;
    svgUrl: string;
    description: string;
    rooms: FloorRoom[];
}

/**
 * Конфігурація поверхів будівлі з переліком кімнат та їх типів.
 */
export const floorsConfig: FloorData[] = [
    {
        id: 1,
        label: "Поверх 1",
        svgUrl: Floor1Svg,
        description: "Перший поверх. Головний вхід, адміністративні кабінети, актова зала та кафе.",
        rooms: [
            { id: "301", label: "Каб. 301", type: "classroom" },
            { id: "303", label: "Каб. 303", type: "classroom" },
            { id: "305", label: "Каб. 305", type: "classroom" },
            { id: "307", label: "Каб. 307", type: "classroom" },
            { id: "309", label: "Каб. 309", type: "classroom" },
            { id: "300", label: "Каб. 300", type: "classroom" },
            { id: "302", label: "Каб. 302", type: "classroom" },
            { id: "304", label: "Каб. 304", type: "classroom" },
            { id: "306", label: "Каб. 306", type: "classroom" },
            { id: "308", label: "Каб. 308", type: "classroom", note: "Має додаткову кімнату" },
            { id: "310", label: "Каб. 310", type: "classroom" },
            { id: "wc-m", label: "WC (чол.)", type: "wc" },
            { id: "wc-f", label: "WC (жін.)", type: "wc" },
            { id: "hall", label: "Актова зала", type: "service" },
            { id: "cafe", label: "Кафе", type: "service" },
            { id: "cafe-hall", label: "Зал кафе + кухня", type: "service" },
        ],
    },
    {
        id: 2,
        label: "Поверх 2",
        svgUrl: Floor2Svg,
        description: "Другий поверх. Навчальні кабінети та лабораторії.",
        rooms: [
            { id: "319", label: "Каб. 319", type: "classroom" },
            { id: "321", label: "Каб. 321", type: "classroom" },
            { id: "323", label: "Каб. 323", type: "classroom" },
            { id: "325", label: "Каб. 325", type: "classroom", note: "Сполучення з кімнатою" },
            { id: "327", label: "Каб. 327", type: "classroom", note: "Сполучення з кімнатою" },
            { id: "329", label: "Каб. 329", type: "classroom" },
            { id: "331", label: "Каб. 331", type: "classroom" },
            { id: "312", label: "Каб. 312", type: "classroom" },
            { id: "314", label: "Каб. 314", type: "classroom" },
            { id: "316", label: "Каб. 316", type: "classroom", note: "Сполучення з кімнатою" },
            { id: "318", label: "Каб. 318", type: "classroom" },
            { id: "320", label: "Каб. 320", type: "classroom", note: "Сполучення з кімнатою" },
            { id: "322", label: "Каб. 322", type: "classroom" },
            { id: "324", label: "Каб. 324", type: "classroom" },
        ],
    },
    {
        id: 3,
        label: "Поверх 3",
        svgUrl: Floor3Svg,
        description: "Третій поверх. Навчальні кабінети з багатьма внутрішніми переходами.",
        rooms: [
            { id: "333", label: "Каб. 333", type: "classroom" },
            { id: "335", label: "Каб. 335", type: "classroom" },
            { id: "337", label: "Каб. 337", type: "classroom", note: "Перехід з кімнатою" },
            { id: "339", label: "Каб. 339", type: "classroom", note: "Два переходи з кімнатою" },
            { id: "341", label: "Каб. 341", type: "classroom" },
            { id: "343", label: "Комора 343", type: "closet" },
            { id: "345", label: "Каб. 345", type: "classroom", note: "Два переходи кімнати" },
            { id: "347", label: "Каб. 347", type: "classroom", note: "Два переходи кімнат" },
            { id: "349", label: "Каб. 349", type: "classroom", note: "Два входи" },
            { id: "326", label: "Каб. 326", type: "classroom", note: "Перехід до 328" },
            { id: "328", label: "Каб. 328", type: "classroom", note: "Перехід з 326 + внутрішній" },
            { id: "330", label: "Каб. 330", type: "classroom" },
            { id: "332", label: "Каб. 332", type: "classroom", note: "Перехід з кімнатою" },
            { id: "334", label: "Каб. 334", type: "classroom", note: "Перехід з кімнатою" },
            { id: "336", label: "Каб. 336", type: "classroom" },
            { id: "338", label: "Каб. 338", type: "classroom", note: "Два входи, два переходи" },
            { id: "340", label: "Каб. 340", type: "classroom", note: "Перехід до 342" },
            { id: "342", label: "Каб. 342", type: "classroom", note: "Перехід з 340, два виходи" },
        ],
    },
];
