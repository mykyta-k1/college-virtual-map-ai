/**
 * TypeScript types for the Pannellum panorama tour configuration.
 * Defines the structure for hotspots, scenes, and tour-level settings.
 */

// --- Hotspot Types ---

/** Base properties shared by all hotspot types */
interface PanoramaHotSpotBase {
    /** Pitch position of the hotspot in degrees */
    pitch: number;
    /** Yaw position of the hotspot in degrees */
    yaw: number;
    /** Tooltip text shown on hover */
    text?: string;
    /** Unique hotspot identifier (used for programmatic removal) */
    id?: string;
    /** Custom CSS class for the hotspot element */
    cssClass?: string;
    /** If true, hotspot scales with field of view changes */
    scale?: boolean;
}

/** Hotspot that navigates to another scene in the tour */
export interface PanoramaSceneHotSpot extends PanoramaHotSpotBase {
    type: 'scene';
    /** Target scene ID to navigate to */
    sceneId: string;
    /** Initial pitch of the target scene (degrees or 'same') */
    targetPitch?: number | 'same';
    /** Initial yaw of the target scene (degrees, 'same', or 'sameAzimuth') */
    targetYaw?: number | 'same' | 'sameAzimuth';
    /** Initial HFOV of the target scene (degrees or 'same') */
    targetHfov?: number | 'same';
}

/** Informational hotspot with optional link */
export interface PanoramaInfoHotSpot extends PanoramaHotSpotBase {
    type: 'info';
    /** URL to open when clicking the hotspot */
    URL?: string;
}

/** Union of all supported hotspot types */
export type PanoramaHotSpot = PanoramaSceneHotSpot | PanoramaInfoHotSpot;

// --- Scene Configuration ---

/** Configuration for a single panorama scene */
export interface PanoramaScene {
    /** Title displayed in the viewer UI */
    title?: string;
    /** Panorama type — currently only equirectangular is used */
    type: 'equirectangular' | 'cubemap' | 'multires';
    /** Path to the panorama image (relative to site root) */
    panorama: string;
    /** Starting horizontal field of view in degrees */
    hfov?: number;
    /** Starting pitch in degrees */
    pitch?: number;
    /** Starting yaw in degrees */
    yaw?: number;
    /** Minimum pitch the viewer can reach */
    minPitch?: number;
    /** Maximum pitch the viewer can reach */
    maxPitch?: number;
    /** Preview image URL shown before panorama loads */
    preview?: string;
    /** Auto-rotation speed in deg/sec (positive = counter-clockwise) */
    autoRotate?: number;
    /** Horizontal angle of view of the source image */
    haov?: number;
    /** Vertical angle of view of the source image */
    vaov?: number;
    /** Array of interactive hotspots placed in this scene */
    hotSpots?: PanoramaHotSpot[];
}

// --- Tour Configuration ---

/** Default settings applied to every scene unless overridden */
export interface PanoramaDefaultConfig {
    /** ID of the scene shown on initial load */
    firstScene: string;
    /** Whether to load the panorama automatically */
    autoLoad?: boolean;
    /** Fade transition duration between scenes (ms) */
    sceneFadeDuration?: number;
    /** Show zoom controls */
    showZoomCtrl?: boolean;
    /** Show fullscreen toggle */
    showFullscreenCtrl?: boolean;
    /** Enable compass display */
    compass?: boolean;
    /** Offset of panorama center from north in degrees */
    northOffset?: number;
    /** Auto-rotation speed in deg/sec */
    autoRotate?: number;
}

/** Top-level tour configuration containing defaults and scenes dictionary */
export interface PanoramaTourConfig {
    /** Shared default settings for all scenes */
    default: PanoramaDefaultConfig;
    /** Dictionary of scenes keyed by scene ID */
    scenes: Record<string, PanoramaScene>;
}
