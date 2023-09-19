<script>
  import { Polygon } from 'svelte-leafletjs?client';
  import { browser } from '$app/environment'
  import * as d3 from "d3";
  import { mapBounds, zoomLevel } from '$lib/stores.js';
  import flip from "@turf/flip";
  import rewind from "@turf/rewind";

  import { bind } from 'svelte-simple-modal';
  import AlertPopup from '$lib/components/AlertPopup.svelte';

  export let feature;

  // console.log(feature)

  // const toSingleChance = {
  //   '30300':'100',
  //   '3003000':'1000',
  //   '300030000':'10000',
  //   '30000300000':'100000'
  // }

  // const clickEvents = ['click']


  // function click(){

  //   selectedUID.set(feature.properties.UID)

  //   if($tableSelection === null){
  //     let newMapSelection = []
  //     for(const property in feature.properties){
  //       if(property.includes('Diepte') && feature.properties[property] === 1){
  //         const split = property.split('Kans')
  //         const diepte = split[0].split('Diepte')[1]
  //         const kans = toSingleChance[split[1]]
  //         newMapSelection.push([diepte, kans])
  //       }
  //     }
  //     mapSelection.set(newMapSelection)
  //   }else{
  //     modal.set(bind(AlertPopup, { message: "Het is niet mogelijk een gebied te selecteren op het moment dat een vak in de tabel is geselecteerd. Klik opnieuw op een geselecteerd vak in de tabel om een selectie te verwijderen." }))
  //   }
  // }

  // d3.select('.backgroundMap')
  //   .on('click', (e) => {
  //     console.log(e.srcElement._leaflet_id)
  //     if(e.srcElement._leaflet_id === 19){
  //       mapSelection.set(null)
  //       selectedUID.set(0)
  //     }
  //   })

  // let weight;
  // $: if($mapSelection !== null && $selectedUID === feature.properties.UID){
  //   weight = 1
  //   console.log('weight1')
  // }else{
  //   weight = 0
  // }

  // $: northEast = $mapBounds._northEast
  // $: southWest = $mapBounds._southWest
  // $: featureCenter = d3.geoCentroid(feature)

  // function notTooSmall(){
  //   let area = d3.geoArea(flip(feature))
  //   if($zoomLevel < 10 && area < 0.00000003){
  //     return false
  //   }
  //   if($zoomLevel < 10.5 && area < 0.00000002){
  //     return false
  //   }
  //   if($zoomLevel < 11 && area < 0.00000001){
  //     return false
  //   }

  //   return true
  // }


  // let visible;
  // $: if(
  //   $mapBounds !== 0 &&
  //   (featureCenter[1] < northEast.lat+0.05 && featureCenter[1] > southWest.lat-0.05) &&
  //   (featureCenter[0] < northEast.lng+0.05 && featureCenter[0] > southWest.lng-0.05) &&

  //   notTooSmall()
  // ){
  //   visible = true;
  // }else{
  //   visible = false;
  // }


</script>

{#if browser}
<!-- && tableSelected && feature.geometry !== null} -->
  <Polygon
    latLngs={rewind(feature).geometry.coordinates}
    color={'red'}
    fillOpacity={1}
    fillColor={'black'}
  />
{/if}


<style></style>
