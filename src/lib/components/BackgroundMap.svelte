<script>
  import { browser } from '$app/environment'
  import { LeafletMap, TileLayer, Marker } from 'svelte-leafletjs?client';
  import { select } from 'd3';
  import Shape from '$lib/components/Shape.svelte'
  import { onMount, afterUpdate } from 'svelte'
  import { leafletMap, subtypeFeatures, shapeOpacity, mapSelection, clickLocation, stedelijkGebiedToggle } from '$lib/stores.js';
  import 'leaflet.pattern?client'
  import flip from "@turf/flip";

  import LoadingIcon from './LoadingIcon.svelte'
  import * as topojson from "topojson-client";
  import * as topojsonsimplify from "topojson-simplify";

  export let datajson
  export let dataKansenDreigingen

  let bnsData1 = topojsonsimplify.presimplify(datajson[0])
  bnsData1 = topojson.feature(bnsData1, bnsData1.objects['BKNSN_2023_xaaaa'])
  let bnsData2 = topojsonsimplify.presimplify(datajson[1])
  bnsData2 = topojson.feature(bnsData2, bnsData2.objects['BKNSN_2023_xaaab'])
  let bnsData3 = topojsonsimplify.presimplify(datajson[2])
  bnsData3 = topojson.feature(bnsData3, bnsData3.objects['BKNSN_2023_xaaac'])
  let bnsData4 = topojsonsimplify.presimplify(datajson[3])
  bnsData4 = topojson.feature(bnsData4, bnsData4.objects['BKNSN_2023_xaaad'])
  let bnsData5 = topojsonsimplify.presimplify(datajson[4])
  bnsData5 = topojson.feature(bnsData5, bnsData5.objects['BKNSN_2023_xaaae'])
  let bnsData6 = topojsonsimplify.presimplify(datajson[5])
  bnsData6 = topojson.feature(bnsData6, bnsData6.objects['BKNSN_2023_xaaaf'])

  let stedGebied = topojsonsimplify.presimplify(datajson[6])
  stedGebied = topojson.feature(stedGebied, stedGebied.objects['TOP10NL_Plaats'])

  subtypeFeatures.set([...bnsData1.features, ...bnsData2.features, ...bnsData3.features, ...bnsData4.features, ...bnsData5.features, ...bnsData6.features])

  $: console.log($subtypeFeatures)
  $: console.log($mapSelection)

  const mapOptions = {
    center: [52.2, 5.2],
    zoom: 8,
  };

  const tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 13,
      maxNativeZoom: 19,
      attribution: "© OpenStreetMap contributors",
      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],
  };

  let sg;
  onMount(async () => {
    leafletMap.set($leafletMap.getMap())

    L.control.scale().addTo($leafletMap);

    select('.spinner-item')
      .style('visibility', 'hidden')

    // stedelijk gebied
    const stripes = new L.StripePattern({weight:2, angle:45, color:'grey'});
    stripes.addTo($leafletMap);

    sg = new L.Polygon(flip(stedGebied.features[0]).geometry.coordinates, {
      fillPattern: stripes,
      fillOpacity: 1.0,
      color:'black',
      weight:0.4,
      interactive:false});
      

    $leafletMap.on('zoomend', function (e) {
      if(e.target._zoom >= 12 && $stedelijkGebiedToggle === 'on'){
        sg.addTo($leafletMap);
      }else{
        sg.remove()
      }
    });
  })

  $: if($leafletMap){
    if($stedelijkGebiedToggle === 'off'){
      sg.remove()
    }else if($leafletMap.getZoom() >= 12){
      sg.addTo($leafletMap);
    }
  }


  function onOpacityChange(event){
    shapeOpacity.set(event.target.value/100)
  }

  let map_element = {top:0, right:0, left:0}
  afterUpdate(() => {
    map_element = document.getElementsByClassName('backgroundMap')[0].getBoundingClientRect()
  })

</script>

<div class="backgroundMap">
  <div class='opacity_span' style='top:{map_element.top + 10}px; left:{map_element.right-210}px'>
    <label for='opacity_slider' style='font-size:16px'>Transparantie</label>
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
