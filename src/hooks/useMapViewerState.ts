import { useReducer, useCallback } from 'react';
import type { SearchableRoom } from '@/services/search.service';
import type { PathNode } from '@/config/navigatorPathsConfig';

// --- State Interface ---
interface MapViewerState {
    currentScale: number;
    selectedRoom: SearchableRoom | null;
    isSidebarOpen: boolean;

    // Search & Route
    searchQuery: string;
    isRouteMode: boolean;
    startPoint: SearchableRoom | null;
    endPoint: SearchableRoom | null;
    routeQueryStart: string;
    routeQueryEnd: string;
    activeRouteInput: 'start' | 'end';
    currentPath: PathNode[] | null;
}

// --- Initial State ---
const initialState: MapViewerState = {
    currentScale: 1,
    selectedRoom: null,
    isSidebarOpen: false,
    searchQuery: '',
    isRouteMode: false,
    startPoint: null,
    endPoint: null,
    routeQueryStart: '',
    routeQueryEnd: '',
    activeRouteInput: 'end',
    currentPath: null,
};

// Actions
type MapViewerAction =
    | { type: 'SET_SCALE'; payload: number }
    | { type: 'SELECT_ROOM'; payload: SearchableRoom }
    | { type: 'DESELECT_ROOM' }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'CLEAR_SEARCH' }
    | { type: 'ENABLE_ROUTE_MODE' }
    | { type: 'DISABLE_ROUTE_MODE' }
    | { type: 'SET_START_POINT'; payload: SearchableRoom }
    | { type: 'SET_END_POINT'; payload: SearchableRoom }
    | { type: 'SET_ROUTE_QUERY_START'; payload: string }
    | { type: 'SET_ROUTE_QUERY_END'; payload: string }
    | { type: 'SWAP_ROUTE' }
    | { type: 'SET_ACTIVE_ROUTE_INPUT'; payload: 'start' | 'end' }
    | { type: 'SET_CURRENT_PATH'; payload: PathNode[] | null };

// Reducer
function mapViewerReducer(state: MapViewerState, action: MapViewerAction): MapViewerState {
    switch (action.type) {
        case 'SET_SCALE':
            return { ...state, currentScale: action.payload };

        case 'SELECT_ROOM':
            return {
                ...state,
                selectedRoom: action.payload,
                isSidebarOpen: true,
                searchQuery: '', // Clear search query to avoid ghost highlights
            };

        case 'DESELECT_ROOM':
            return { ...state, selectedRoom: null, isSidebarOpen: false };

        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };

        case 'CLEAR_SEARCH':
            return { ...state, searchQuery: '', selectedRoom: null, isSidebarOpen: false };

        case 'ENABLE_ROUTE_MODE': {
            // Transition to route mode
            let newState: MapViewerState = {
                ...state,
                isRouteMode: true,
                searchQuery: '',
                startPoint: null,
                routeQueryStart: '',
                currentPath: null
            };

            // Use selected room as destination if available
            if (state.selectedRoom) {
                newState.endPoint = state.selectedRoom;
                newState.routeQueryEnd = state.selectedRoom.label;
                newState.activeRouteInput = 'start';
            } else if (state.searchQuery) {
                // Use current search as destination
                newState.endPoint = null;
                newState.routeQueryEnd = state.searchQuery;
                newState.activeRouteInput = 'start';
            } else {
                newState.endPoint = null;
                newState.routeQueryEnd = '';
                newState.activeRouteInput = 'start';
            }
            return newState;
        }

        case 'DISABLE_ROUTE_MODE':
            return {
                ...state,
                isRouteMode: false,
                startPoint: null,
                endPoint: null,
                routeQueryStart: '',
                routeQueryEnd: '',
                searchQuery: '',
                currentPath: null,
            };

        case 'SET_START_POINT':
            return {
                ...state,
                startPoint: action.payload,
                routeQueryStart: action.payload.label,
                searchQuery: ''
            };

        case 'SET_END_POINT':
            return {
                ...state,
                endPoint: action.payload,
                routeQueryEnd: action.payload.label,
                searchQuery: ''
            };

        case 'SET_ROUTE_QUERY_START':
            return { ...state, routeQueryStart: action.payload };

        case 'SET_ROUTE_QUERY_END':
            return { ...state, routeQueryEnd: action.payload };

        case 'SWAP_ROUTE':
            return {
                ...state,
                startPoint: state.endPoint,
                endPoint: state.startPoint,
                routeQueryStart: state.routeQueryEnd,
                routeQueryEnd: state.routeQueryStart,
            };

        case 'SET_ACTIVE_ROUTE_INPUT':
            return { ...state, activeRouteInput: action.payload };

        case 'SET_CURRENT_PATH':
            return { ...state, currentPath: action.payload };

        default:
            return state;
    }
}

/**
 * Custom Hook for MapViewer State Logic
 * Manages MapViewer state including zoom, selection, search, and routing modes.
 */
export function useMapViewerState() {
    const [state, dispatch] = useReducer(mapViewerReducer, initialState);

    // --- Wrapper Handlers for cleaner API ---

    const setScale = useCallback((scale: number) => dispatch({ type: 'SET_SCALE', payload: scale }), []);

    const selectRoom = useCallback((room: SearchableRoom) => dispatch({ type: 'SELECT_ROOM', payload: room }), []);

    const closeSidebar = useCallback(() => dispatch({ type: 'DESELECT_ROOM' }), []);

    const setSearchQuery = useCallback((query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query }), []);

    const clearSearch = useCallback(() => dispatch({ type: 'CLEAR_SEARCH' }), []);

    const enableRouteMode = useCallback(() => dispatch({ type: 'ENABLE_ROUTE_MODE' }), []);

    const disableRouteMode = useCallback(() => dispatch({ type: 'DISABLE_ROUTE_MODE' }), []);

    const setStartPoint = useCallback((room: SearchableRoom) => dispatch({ type: 'SET_START_POINT', payload: room }), []);

    const setEndPoint = useCallback((room: SearchableRoom) => dispatch({ type: 'SET_END_POINT', payload: room }), []);

    const setRouteQueryStart = useCallback((query: string) => dispatch({ type: 'SET_ROUTE_QUERY_START', payload: query }), []);

    const setRouteQueryEnd = useCallback((query: string) => dispatch({ type: 'SET_ROUTE_QUERY_END', payload: query }), []);

    const swapRoute = useCallback(() => dispatch({ type: 'SWAP_ROUTE' }), []);

    const setActiveRouteInput = useCallback((input: 'start' | 'end') => dispatch({ type: 'SET_ACTIVE_ROUTE_INPUT', payload: input }), []);

    const setCurrentPath = useCallback((path: PathNode[] | null) => dispatch({ type: 'SET_CURRENT_PATH', payload: path }), []);

    // Complex Handler: Select Result based on mode/type
    const selectResult = useCallback((item: SearchableRoom, type: 'search' | 'start' | 'end', onFloorChange?: (id: number) => void) => {
        if (type === 'start') {
            setStartPoint(item);
        } else if (type === 'end') {
            setEndPoint(item);
        } else {
            // Explore mode selection
            if (onFloorChange && item.floorId) onFloorChange(item.floorId);
            selectRoom(item);
        }
    }, [setStartPoint, setEndPoint, selectRoom]);

    return {
        state,
        actions: {
            setScale,
            selectRoom,
            closeSidebar,
            setSearchQuery,
            clearSearch,
            enableRouteMode,
            disableRouteMode,
            setStartPoint,
            setEndPoint,
            setRouteQueryStart,
            setRouteQueryEnd,
            swapRoute,
            setActiveRouteInput,
            setCurrentPath,
            selectResult
        }
    };
}
