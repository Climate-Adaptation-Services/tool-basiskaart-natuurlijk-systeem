<script>
  import { Polygon } from 'svelte-leafletjs?client';
  import { browser } from '$app/environment'
  import flip from "@turf/flip";

  import { bind } from 'svelte-simple-modal';
  import AlertPopup from '$lib/components/AlertPopup.svelte';

  import { subtypenColors, shapeOpacity, mapSelection, clickLocation, kansOfDreiging } from '$lib/stores.js';
  import { select } from 'd3';

  export let feature;
  export let dataKansenDreigingen

  // console.log(feature)

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

  function click(e, feature){
    if($mapSelection.length === 0){
      select('.spinner-item')
      .style('visibility', 'visible')
    }
    setTimeout(() => {
      kansOfDreiging.set(null)
      clickLocation.set(e.detail.latlng)
      mapSelection.set([feature.properties.BKNSN_CODE])
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

</script>

{#if browser}
<!-- && tableSelected && feature.geometry !== null} -->
  <Polygon
    latLngs={flip(feature).geometry.coordinates}
    fillColor={(feature.properties.BKNSN_CODE.length > 1 && feature.properties.BKNSN_CODE !== 'Hv4' && feature.properties.BKNSN_CODE !== 'Zk7')
      ? subtypenColors[dataKansenDreigingen.filter(d => d.BKNSN_code === feature.properties.BKNSN_CODE)[0]['Sublandschap']]
      : 'none'}
    fillOpacity={($mapSelection.length > 0) 
      ? ($mapSelection.includes(feature.properties.BKNSN_CODE)) ? $shapeOpacity+0.3 : 0.1 
      : $shapeOpacity}
    color={($mapSelection.includes(feature.properties.BKNSN_CODE))
      ? 'black'
      : 'none'}
    weight='0.1'
    events={['click']}
    on:click={e => click(e, feature)}
  />
{/if}
<!-- on:mouseout={() => mapSelection.set(null)} -->


<style></style>
