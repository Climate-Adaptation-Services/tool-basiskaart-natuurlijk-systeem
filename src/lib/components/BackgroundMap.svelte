<script>
  import { browser } from '$app/environment'
  import { LeafletMap, TileLayer, Marker } from 'svelte-leafletjs?client';
  import { select } from 'd3';
  import Shape from '$lib/components/Shape.svelte'
  import { onMount } from 'svelte'
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

  const tileUrl = 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png'

  const tileLayerOptions = {
      minZoom: 2,
      maxZoom: 13,
      maxNativeZoom: 19,
      attribution: 'Kaartgegevens © <a href="https://www.kadaster.nl">Kadaster</a>',
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


  // Sliderwaarde is transparantie in procenten: 0% = volledig dekkend, 100% = onzichtbaar.
  // De store houdt de omgekeerde waarde vast (fillOpacity van de vlakken).
  let transparantie = 0

  function onOpacityChange(event){
    shapeOpacity.set(1 - event.target.value/100)
  }

</script>

<div class="backgroundMap">
  <div class='opacity_span'>
    <div class='opacity_header'>
      <label for='opacity_slider'>Transparantie</label>
      <span class='opacity_value' aria-hidden='true'>{transparantie}%</span>
    </div>
    <input
      id='opacity_slider'
      class='opacity_slider'
      type='range'
      min='0'
      max='100'
      step='1'
      value={transparantie}
      style='--fill:{transparantie}%'
      on:input={e => transparantie = +e.target.value}
      on:change={onOpacityChange}>
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
  /* CAS: donkergroen #0A565E, blauwgroen #0C778B */
  .opacity_span{
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1000;
    width: 208px;
    height: auto;
    box-sizing: border-box;
    padding: 11px 14px 13px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    background-color: rgba(255, 255, 255, 0.92);
    -webkit-backdrop-filter: blur(8px) saturate(1.3);
    backdrop-filter: blur(8px) saturate(1.3);
    border: 1px solid rgba(10, 86, 94, 0.12);
    border-radius: 10px;
    box-shadow:
      0 1px 2px rgba(10, 86, 94, 0.06),
      0 4px 14px rgba(10, 86, 94, 0.10);
  }

  .opacity_header{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .opacity_span label{
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.01em;
    line-height: 1;
    color: #0a565e;
  }

  .opacity_value{
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: #0c778b;
  }

  /* 24px hoog = minimale clickable target (WCAG 2.2 SC 2.5.8);
     de zichtbare track is 6px en wordt centraal in die hoogte getekend. */
  .opacity_slider{
    -webkit-appearance: none;
    appearance: none;
    display: block;
    width: 100%;
    height: 24px;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    cursor: pointer;
  }

  .opacity_slider:focus{
    outline: none;
  }

  /* WebKit/Blink — track is één laag, dus de vulling komt uit een gradient op --fill.
     Let op: webkit- en moz-pseudo's mogen NIET in één selectorlijst staan,
     een onbekende selector invalideert daar de hele regel. */
  .opacity_slider::-webkit-slider-runnable-track{
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      #0c778b 0 var(--fill),
      rgba(10, 86, 94, 0.15) var(--fill) 100%
    );
  }

  .opacity_slider::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -5px; /* (6px track - 16px thumb) / 2 */
    border-radius: 50%;
    border: 2px solid #0c778b;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(10, 86, 94, 0.28);
    transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Firefox — heeft een eigen progress-pseudo, dus geen gradient nodig. */
  .opacity_slider::-moz-range-track{
    height: 6px;
    border-radius: 999px;
    background-color: rgba(10, 86, 94, 0.15);
  }

  .opacity_slider::-moz-range-progress{
    height: 6px;
    border-radius: 999px;
    background-color: #0c778b;
  }

  .opacity_slider::-moz-range-thumb{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #0c778b;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(10, 86, 94, 0.28);
    transition: transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  /* Hover alleen op apparaten met een echte cursor — touch triggert hover bij tap. */
  @media (hover: hover) and (pointer: fine){
    .opacity_slider:hover::-webkit-slider-thumb{
      transform: scale(1.12);
    }
    .opacity_slider:hover::-moz-range-thumb{
      transform: scale(1.12);
    }
  }

  .opacity_slider:active::-webkit-slider-thumb{
    transform: scale(0.96);
  }

  .opacity_slider:active::-moz-range-thumb{
    transform: scale(0.96);
  }

  .opacity_slider:focus-visible::-webkit-slider-thumb{
    box-shadow:
      0 1px 3px rgba(10, 86, 94, 0.28),
      0 0 0 3px rgba(12, 119, 139, 0.35);
  }

  .opacity_slider:focus-visible::-moz-range-thumb{
    box-shadow:
      0 1px 3px rgba(10, 86, 94, 0.28),
      0 0 0 3px rgba(12, 119, 139, 0.35);
  }

  @media (prefers-reduced-motion: reduce){
    .opacity_slider::-webkit-slider-thumb{
      transition: none;
    }
    .opacity_slider::-moz-range-thumb{
      transition: none;
    }
  }

  .backgroundMap{
    position: relative;
    height: 100%;
    width: 100%;
  }

</style>
