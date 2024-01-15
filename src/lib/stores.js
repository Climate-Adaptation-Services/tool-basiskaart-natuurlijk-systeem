import { writable, derived } from 'svelte/store';

export const leafletMap = writable(null)
// export const mapBounds = writable(0);
// export const zoomLevel = writable(0);
// export const mapCenter = writable(0);
export const mapSelection = writable([]);
export const mapSelectionWithValue = writable([[],[]]);
export const clickLocation = writable(null);
export const kansOfDreiging = writable(null);
export const kansOfDreigingWithValue = writable(null);
export const subtypeFeatures = writable(null)
export const shapeOpacity = writable(1)











// export const subtypenColors = {
//   'Strandwal':'#FDCD66',
//   'Strandvlakte':'#F2FFD5',
//   'Kustduinen':'#FFFF6A',
//   'Zeekleivlakte':'#67BCD0',
//   'Kreekrug':'#B5D398',
//   'Kreekbedding':'#90A2B7',
//   'Terp':'#EE666A',
//   'Zoetwatergetijdevlakte':'#65B5CB',
//   'Zoutwatergetijdevlakte':'#D7EEE1',
//   'Laagveenvlakte':'#E1ADF7',
//   'Petgaten':'#B267C7',
//   'Meerbodem':'#6893AD',
//   // 'Kreekrug':'#67CAB4',
//   'Veenrest':'#AA8DBA',
//   'Stroomrug, oeverwal':'#C0F065',
//   'Rivierkom':'#66AC94',
//   'Uiterwaard':'#8B7CAA',
//   'Overslaggronden':'#BF7C84',
//   'Restgeul':'#667DA6',
//   'Rivierterras / zand':'#D8E1B5',
//   'Rivierterras / klei':'#90B8A8',
//   'Rivierduin':'#FFCB62',
//   'Stuwwal':'#ED9564',
//   'Smeltwaterafzettingen, sandr':'#F0BF65',
//   'Daluitspoelingswaaier':'#E1A4A3',
//   'Droogdal':'#A17794',
//   'Es dekzand':'#AB7C6A',
//   'Es':'#AB7A63',
//   'Grondmorenerug':'#E2A2A4',
//   'Grondmorene plateau, -vlakte':'#F8AFB1',
//   'Pingoruines en periglaciale laagten':'#FAC6B1',
//   'Dekzandrug':'#FEE2B7',
//   'Dekzandvlakte':'#F2E8D9',
//   'Stuifzandduin':'#FDFFA7',
//   'Beekdal zand':'#AABBB5',
//   'Beekdal veen':'#AEAED2',
//   'Depressie zand':'#A3C3D1',
//   'Depressie veen':'#7C759A',
//   'Depressie':'#D9E2EB',
//   'Ontgonnen hoogveen':'#F3D7FF',
//   'Hoogveen':'#9466AC',
//   'Lossplateau':'#E8C3C2',
//   'Losshelling':'#E1B9A3',
//   'Kalkhelling':'#B8AA8F',
//   'Beekdal':'#66AC94',
//   'Rivierterras':'#CCA664',
//   'Overige afzettingen':'#EF9464'
// }