<script>
  import { browser } from '$app/environment'
  import { LeafletMap, TileLayer } from 'svelte-leafletjs?client';
  import * as d3 from "d3";
  import Shape from '$lib/components/Shape.svelte'
  import { onMount } from 'svelte'
  import { buurtGrenzen, selectedUID, mapBounds, zoomLevel, mapSelection, mapCenter, leafletMap, tileLayers, tilelayerOpacity, tableSelection } from '$lib/stores.js';
  import "leaflet-search";
  import "leaflet-search/dist/leaflet-search.min.css";
  import LoadingIcon from './LoadingIcon.svelte'
  import * as topojson from "topojson-client";
  import * as topojsonsimplify from "topojson-simplify";
  // import 'leaflet.control.opacity';
  // import "leaflet.control.opacity/dist/L.Control.Opacity.css";

  // export let provinces
  export let datajson

  let buurtGrenzenData = topojsonsimplify.presimplify(datajson[0])
  buurtGrenzenData = topojson.feature(buurtGrenzenData, buurtGrenzenData.objects.GevolgbeperkingGebiedenDiepteKans20221221)

  buurtGrenzen.set(buurtGrenzenData.features)

  const mapOptions = {
    center: [52.2, 5.2],
    zoom: 7,
  };

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: "© OpenStreetMap contributors",
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  onMount(() => {

    leafletMap.set($leafletMap.getMap())
    mapBounds.set($leafletMap.getBounds())
    zoomLevel.set($leafletMap.getZoom())
    mapCenter.set($leafletMap.getCenter())
    mapSelection.set(null)
    $leafletMap.on('zoomstart', function() {
      d3.select('.spinner-item')
        .style('visibility', 'visible')
    })
    $leafletMap.on('drag', function() {
      d3.select('.spinner-item')
        .style('visibility', 'visible')
    })
    $leafletMap.on('moveend', function() {
      mapBounds.set($leafletMap.getBounds())
      zoomLevel.set($leafletMap.getZoom())
      mapCenter.set($leafletMap.getCenter())

      d3.select('.spinner-item')
        .style('visibility', 'hidden')
    });

    var searchLayer = L.layerGroup().addTo($leafletMap);
    $leafletMap.addControl( new L.Control.Search({
      url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
      jsonpParam: 'json_callback',
      propertyName: 'display_name',
      propertyLoc: ['lat','lon'],
      marker: L.circleMarker([0,0],{radius:30}),
      autoCollapse: true,
      autoType: false,
      minLength: 2
    }) );

    d3.select('.spinner-item')
      .style('visibility', 'hidden')

    for(const diepte_kans in $tileLayers){
      $tileLayers[diepte_kans].addTo($leafletMap);
    };

  })

  const waterdiepteColors = {
    '0cm':'#c3e8f0',
    '20cm':'#a5cff0',
    '50cm':'#7ca5d8',
    '200cm':'#6f7bba'
  }

  function kansenClass(kans){
    return (kans > 30000) ? '1xper100000jaar'
    : (kans > 3000) ? '1xper10000jaar'
    : (kans > 300) ? '1xper1000jaar'
    : (kans > 30) ? '1xper100jaar'
    : null
  }
  function clickRemove(){
    d3.select('.spinner-item')
      .style('visibility', 'visible')

    setTimeout(() => {
      mapSelection.set(null)
      d3.select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  $: visibleRemoveSelection = ($mapSelection !== null)
    ? 'visible'
    : 'hidden';

  function onOpacityChange(event){
    for(const diepte_kans in $tileLayers){
      $tileLayers[diepte_kans].remove();
    };
    tilelayerOpacity.set(event.target.value)
    // if there is a selection in the table, only add those layers
    if($tableSelection !== null){
      $tableSelection.forEach(diepte_kans => {
        $tileLayers[diepte_kans[0] + '_' + diepte_kans[1]].addTo($leafletMap);
      });
    }else{
      for(const diepte_kans in $tileLayers){
        $tileLayers[diepte_kans].addTo($leafletMap);
      };
    }
  }

</script>

<div class="backgroundMap">
  <span class='opacity_span'>
    <label for='opacity_slider'>Opacity</label>
    <input id='opacity_slider' value='100' type="range" min="0" max="100" on:change={onOpacityChange}>
  </span>

  <LoadingIcon />

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg class='removeselectionmap' visibility={visibleRemoveSelection} on:click={clickRemove} cursor='pointer'
    transform='translate({1.5}, {-40})'>
    <rect
      width={200}
      height={40}
      rx={20}
      x={2}
      y={2}
      stroke='black'
      fill='#f1f1f2'
    />
    <image fill='steelblue' href={'/images/remove.png'}
      transform='translate({15}, {7}) '
      width={30} height={30}/>
    <text class='textremoveselection' x={50} y={27}>Verwijder selectie</text>
  </svg>

  {#if browser}
    <LeafletMap bind:this={$leafletMap} options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions}/>
      {#each $buurtGrenzen as feature, i}
        <Shape {feature} />
      {/each}
    </LeafletMap>
  {/if}

</div>

<style>
  .opacity_span{
    position: absolute;
    z-index: 2000;
    top:20px;
    left:100px;
  }

  input[type=range]{
    /* fix for FF unable to apply focus style bug  */
    border: 0.5px solid black; 
  }
  label{
    font-size:14px; 
  }

	div{
		height:100%;
    width:100%;
	}

  .removeselectionmap{
    position:absolute;
    left:20vw;
    top:10vh;
    z-index: 10000;
    opacity:0.8;
  }

</style>
