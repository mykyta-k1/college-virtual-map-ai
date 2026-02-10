import { useEffect, useRef } from 'react';
import type { PanoramaTourConfig } from '../../types/panorama';
import type { PannellumViewer } from 'pannellum';

/* Підключення pannellum JS (side-effect: додає window.pannellum) та стилів */
import 'pannellum';
import 'pannellum/build/pannellum.css';
import './PanoramaViewer.css';

interface PanoramaViewerProps {
    /** Конфігурація туру з описом сцен та хотспотів */
    config: PanoramaTourConfig;
}

/**
 * Компонент 360° панорамного переглядача.
 * Ініціалізує pannellum viewer у контейнері та автоматично
 * очищає ресурси при розмонтуванні.
 */
const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ config }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<PannellumViewer | null>(null);

    useEffect(() => {
        /* Не ініціалізувати, якщо контейнер ще не в DOM */
        if (!containerRef.current) return;

        /* Очистити попередній viewer (якщо конфігурація змінилась) */
        if (viewerRef.current) {
            viewerRef.current.destroy();
            viewerRef.current = null;
        }

        /**
         * Ініціалізація pannellum viewer з переданою конфігурацією.
         * pannellum глобально доступний через window.pannellum
         * (скрипт підключається через build-файл бібліотеки).
         */
        viewerRef.current = window.pannellum.viewer(
            containerRef.current,
            config as unknown as Record<string, unknown>
        );

        /* Очищення при розмонтуванні компонента */
        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, [config]);

    return (
        <div
            ref={containerRef}
            className="panorama-viewer-container"
        />
    );
};

export default PanoramaViewer;
