import type { PanoramaTourConfig } from '../types/panorama';

/**
 * Tour configuration for the campus panorama viewer.
 * Defines two scenes with navigation hotspots between them
 * and an example info hotspot in each scene.
 */
const panoramaTourConfig: PanoramaTourConfig = {
    default: {
        firstScene: 'scene_1',
        autoLoad: true,
        sceneFadeDuration: 1000,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        compass: false,
    },

    scenes: {
        /* ---- Scene 1 ---- */
        scene_1: {
            title: 'Корпус — Головний вхід',
            type: 'equirectangular',
            // minPitch: -5,
            // maxPitch: 1,
            panorama: '/panoramas/scene_1.webp',
            hfov: 110,
            pitch: 0,
            yaw: 0,
            hotSpots: [
                // Навігаційний хотспот → перехід до scene_2
                {
                    type: 'scene',
                    pitch: -5,
                    yaw: 120,
                    text: 'Перейти до внутрішнього двору',
                    sceneId: 'scene_2',
                    targetPitch: 0,
                    targetYaw: 0,
                },
                // Інформаційний хотспот — приклад
                {
                    type: 'info',
                    pitch: 10,
                    yaw: -30,
                    text: 'Головний вхід до навчального корпусу. Побудовано у 1965 році.',
                },
            ],
        },

        /* ---- Scene 2 ---- */
        scene_2: {
            title: 'Внутрішній двір',
            type: 'equirectangular',
            panorama: '/panoramas/scene_2.jpg',
            hfov: 110,
            pitch: 0,
            yaw: 0,
            hotSpots: [
                // Навігаційний хотспот → перехід назад до scene_1
                {
                    type: 'scene',
                    pitch: -3,
                    yaw: -90,
                    text: 'Повернутися до головного входу',
                    sceneId: 'scene_1',
                    targetPitch: 0,
                    targetYaw: 0,
                },
                // Інформаційний хотспот — приклад
                {
                    type: 'info',
                    pitch: 5,
                    yaw: 60,
                    text: 'Зона відпочинку для студентів. Тут проводяться щорічні фестивалі.',
                },
            ],
        },
    },
};

export default panoramaTourConfig;
