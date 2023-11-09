<script>
  import { browser } from '$app/environment'
  import { LeafletMap, TileLayer, Marker } from 'svelte-leafletjs?client';
  import { select } from 'd3';
  import Shape from '$lib/components/Shape.svelte'
  import { onMount, afterUpdate } from 'svelte'
  import { leafletMap, subtypeFeatures, shapeOpacity, mapSelection, clickLocation } from '$lib/stores.js';

  import LoadingIcon from './LoadingIcon.svelte'
  import * as topojson from "topojson-client";
  import * as topojsonsimplify from "topojson-simplify";

  export let datajson
  export let dataKansenDreigingen

  console.log(datajson)

  let bnsData = topojsonsimplify.presimplify(datajson[0])
  bnsData = topojson.feature(bnsData, bnsData.objects.BKNSN_GeoJSON)

  subtypeFeatures.set(bnsData.features)

  const mapOptions = {
    center: [52.2, 5.2],
    zoom: 8,
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

    select('.spinner-item')
      .style('visibility', 'hidden')
  })

  function onOpacityChange(event){
    shapeOpacity.set(event.target.value/100)
  }

  let map_element = {top:0, right:0, left:0}
  $: console.log(map_element)
  afterUpdate(() => {
    map_element = document.getElementsByClassName('backgroundMap')[0].getBoundingClientRect()
  })

</script>

<div class="backgroundMap">
  <div class='opacity_span' style='top:{map_element.top + 10}px; left:{map_element.right-210}px'>
    <label for='opacity_slider' style='font-size:16px'>Opacity</label>
    <input id='opacity_slider' value='100' type="range" min="0" max="100" on:change={onOpacityChange}>
  </div>

  <LoadingIcon />

  {#if browser}
    <LeafletMap bind:this={$leafletMap} options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions}/>
      {#each $subtypeFeatures as feature, i}
        <Shape {feature} {dataKansenDreigingen} />
      {/each}
      {#if $mapSelection !== null && $clickLocation !== null}
        <Marker latLng={[$clickLocation.lat, $clickLocation.lng]}/>
      {/if}
    </LeafletMap>
  {/if}

</div>

<style>
  .opacity_span{
    z-index: 2000;
    /* opacity: 0.8; */
    background-color: white;
    position: fixed;
    width:200px;
    height:70px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 2px;
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

</style>
