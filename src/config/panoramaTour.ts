import type { PanoramaTourConfig } from '../types/panorama';

/**
 * Tour configuration for the campus panorama viewer.
 * Defines scenes for Classrooms (c*) and Halls/Stairs (h*).
 */
const panoramaTourConfig: PanoramaTourConfig = {
  default: {
    firstScene: 'hall_1_1', // Default starting point (Floor 1 Hall)
    autoLoad: false,
    sceneFadeDuration: 1000,
    showZoomCtrl: true,
    showFullscreenCtrl: true,
    compass: false,
  },

  scenes: {
    /* ==================== FLOOR 1 ==================== */
    // Hallways & Stairs
    hall_1_1: {
      title: 'Холл 1-го поверху (Центр)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/h1_1.webp',
      hotSpots: [{ type: 'scene', text: 'До входу', sceneId: 'hall_1_2', pitch: 0, yaw: 0 }],
    },
    hall_1_2: {
      title: 'Холл 1-го поверху (Вхід)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/h1_2.webp',
      hotSpots: [{ type: 'scene', text: 'До центру', sceneId: 'hall_1_1', pitch: 0, yaw: 180 }],
    },
    hall_1_2_2: {
      title: 'Холл 1-го поверху (Сходи)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/h1_2_2.webp',
      hotSpots: [],
    },
    wc_1: {
      title: 'Вбиральня (1 поверх)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/wc.webp',
      hotSpots: [],
    },

    // Classrooms
    room_301: {
      title: 'Аудиторія 301',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/c301_c300.webp',
      hotSpots: [],
    },
    room_303: {
      title: 'Аудиторія 303 (Медпункт)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/c303_c302.webp',
      hotSpots: [],
    },
    room_305: {
      title: 'Аудиторія 305',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/c305.webp',
      hotSpots: [],
    },
    room_307: {
      title: 'Аудиторія 307 (Бухгалтерія)',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/c307_c304.webp',
      hotSpots: [],
    },
    room_309: {
      title: 'Аудиторія 309',
      type: 'equirectangular',
      panorama: '/panoramas/floor1/c309_c308.webp',
      hotSpots: [],
    },

    /* ==================== FLOOR 2 ==================== */
    // Hallways & Stairs
    hall_2: {
      title: 'Холл 2-го поверху',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/h2.webp',
      hotSpots: [],
    },
    hall_2_3_1: {
      title: 'Сходи 2-3 поверх (Проліт 1)',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/h2_3_1.webp',
      hotSpots: [],
    },
    hall_2_3_1_alt: {
      title: 'Сходи 2-3 поверх (Проліт 1 - Альт)',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/h2_3_1_alt.webp',
      hotSpots: [],
    },
    hall_2_3_2: {
      title: 'Сходи 2-3 поверх (Проліт 2)',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/h2_3_2.webp',
      hotSpots: [],
    },

    // Classrooms
    room_312: {
      title: 'Аудиторія 312',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c312.webp',
      hotSpots: [],
    },
    room_314: {
      title: 'Аудиторія 314',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c314_c312.webp',
      hotSpots: [],
    },
    room_316: {
      title: 'Аудиторія 316',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c316_c325.webp',
      hotSpots: [],
    },
    room_318: {
      title: 'Аудиторія 318',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c318.webp',
      hotSpots: [],
    },
    room_319: {
      title: 'Аудиторія 319',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c319.webp',
      hotSpots: [],
    },
    room_320: {
      title: 'Аудиторія 320',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c320.webp',
      hotSpots: [],
    },
    room_321: {
      title: 'Аудиторія 321',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c314_c321.webp', // Assuming this covers 321
      hotSpots: [],
    },
    room_322: {
      title: 'Аудиторія 322',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c322_c329.webp',
      hotSpots: [],
    },
    room_323: {
      title: 'Аудиторія 323',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c323.webp',
      hotSpots: [],
    },
    room_324: {
      title: 'Аудиторія 324',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c324.webp',
      hotSpots: [],
    },
    room_328: {
      title: 'Аудиторія 328',
      type: 'equirectangular',
      panorama: '/panoramas/floor2/c328_c325.webp',
      hotSpots: [],
    },

    /* ==================== FLOOR 3 ==================== */
    // Classrooms
    room_333: {
      title: 'Аудиторія 333',
      type: 'equirectangular',
      panorama: '/panoramas/floor3/c333_c326.webp',
      hotSpots: [],
    },
    room_340: {
      title: 'Аудиторія 340',
      type: 'equirectangular',
      panorama: '/panoramas/floor3/c340.webp',
      hotSpots: [],
    },
    room_347: {
      title: 'Аудиторія 347',
      type: 'equirectangular',
      panorama: '/panoramas/floor3/c347_c340.webp',
      hotSpots: [],
    },
  },
};

export default panoramaTourConfig;
