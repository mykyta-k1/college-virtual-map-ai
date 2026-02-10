/**
 * Type declaration for the pannellum library (loaded globally via script).
 * Pannellum attaches itself to `window.pannellum` and exposes a `viewer` factory.
 */

declare module 'pannellum' {
    /** Pannellum viewer instance returned by `pannellum.viewer()` */
    export interface PannellumViewer {
        /** Remove the viewer and clean up resources */
        destroy(): void;
        /** Get the current scene ID */
        getScene(): string;
        /** Load a different scene by ID with optional initial view */
        loadScene(sceneId: string, pitch?: number, yaw?: number, hfov?: number): this;
        /** Get the current pitch in degrees */
        getPitch(): number;
        /** Get the current yaw in degrees */
        getYaw(): number;
        /** Get the current horizontal field of view in degrees */
        getHfov(): number;
        /** Set the pitch with optional animation */
        setPitch(pitch: number, animated?: number | boolean): this;
        /** Set the yaw with optional animation */
        setYaw(yaw: number, animated?: number | boolean): this;
        /** Set the horizontal field of view */
        setHfov(hfov: number, animated?: number | boolean): this;
        /** Animate the view to a target position */
        lookAt(pitch?: number, yaw?: number, hfov?: number, animated?: number | boolean): this;
        /** Register an event listener */
        on(event: string, callback: (...args: unknown[]) => void): this;
        /** Remove an event listener */
        off(event: string, callback?: (...args: unknown[]) => void): this;
        /** Toggle fullscreen mode */
        toggleFullscreen(): this;
        /** Check if the panorama has finished loading */
        isLoaded(): boolean;
        /** Resize the viewer (e.g., after container resize) */
        resize(): void;
    }

    /** Factory function to create a new viewer inside a container element */
    export function viewer(
        container: HTMLElement | string,
        config: Record<string, unknown>
    ): PannellumViewer;
}

/**
 * Augment the global Window to include pannellum —
 * pannellum attaches itself as `window.pannellum`.
 */
interface Window {
    pannellum: typeof import('pannellum');
}
