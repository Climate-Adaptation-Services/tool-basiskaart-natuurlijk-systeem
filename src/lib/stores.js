import { writable, derived } from 'svelte/store';
import * as esri from "esri-leaflet";

export const tableSelection = writable(null);
export const mapSelection = writable(null);
export const mapBounds = writable(0);
export const zoomLevel = writable(0);
export const mapCenter = writable(0);
export const selectedGridNumber = writable(0);
export const selectedUID = writable(0);
export const loading = writable(false);
export const data = writable(0);
export const buurtGrenzen = writable(0);
export const simpleDataFlag = writable(true);
export const modal = writable(null);
export const leafletMap = writable(null);
export const tilelayerOpacity = writable(100);

export const tileLayers = derived(
  tilelayerOpacity,
  $tilelayerOpacity => {
    return {
      '0_100':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_0_cm_Kans_30_300/MapServer', opacity:$tilelayerOpacity/100.0}),
      '0_1000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_0_cm_Kans_300_3000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '0_10000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_0_cm_Kans_3000_30000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '0_100000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_0_cm_Kans_30000_300000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '20_100':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_20_cm_Kans_30_300/MapServer', opacity:$tilelayerOpacity/100.0}),
      '20_1000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_20_cm_Kans_300_3000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '20_10000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_20_cm_Kans_3000_30000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '20_100000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_20_cm_Kans_30000_300000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '50_100':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_50_cm_Kans_30_300/MapServer', opacity:$tilelayerOpacity/100.0}),
      '50_1000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_50_cm_Kans_300_3000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '50_10000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_50_cm_Kans_3000_30000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '50_100000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_50_cm_Kans_30000_300000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '200_100':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_200_cm_Kans_30_300/MapServer', opacity:$tilelayerOpacity/100.0}),
      '200_1000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_200_cm_Kans_300_3000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '200_10000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_200_cm_Kans_3000_30000/MapServer', opacity:$tilelayerOpacity/100.0}),
      '200_100000':new esri.tiledMapLayer({url: 'https://tiles.arcgis.com/tiles/7SEV6TvwRD5jzR74/arcgis/rest/services/Gevolgbeperking_Diepte_200_cm_Kans_30000_300000/MapServer', opacity:$tilelayerOpacity/100.0}),
    }
  }
)
