import { writable, derived } from 'svelte/store';

export const leafletMap = writable(null)
export const mapBounds = writable(0);
export const zoomLevel = writable(0);
export const mapCenter = writable(0);
export const mapSelection = writable(0);
export const subtypeFeatures = writable(null)