<script>
  import * as d3 from "d3";
  import TableCell from '$lib/components/TableCell.svelte';
  import { zoomLevel, tableSelection, leafletMap, tileLayers } from '../stores.js';

  export let w;
  export let h;

  $: console.log($tableSelection)

  const waterdiepten = ['0','20','50','200'].reverse()
  const kansen = ['100', '1000', '10000','100000']
  const kansenRange = ['1/30 - 1/300', '1/300 - 1/3.000', '1/3.000 - 1/30.000','1/30.000 - 1/300.000']

  // de overkoepelende key is hier de waterdiepte
  const gevolgbeperking = {
    '0':{
      '100':'Schade voorkomen',
      '1000':'Schade voorkomen',
      '10000':'Schade voorkomen',
      '100000':'Schade voorkomen'
    },
    '20':{
      '100':'Schade voorkomen',
      '1000':'Schade beperking',
      '10000':'Schade beperking',
      '100000':'Acceptabel risico'
    },
    '50':{
      '100':'Schuilen en evacueren',
      '1000':'Schuilen en evacueren',
      '10000':'Schuilen en evacueren',
      '100000':'Acceptabel risico'
    },
    '200':{
      '100':'Schuilen en evacueren',
      '1000':'Schuilen en evacueren',
      '10000':'Schuilen en evacueren',
      '100000':'Schuilen en evacueren'
    }
  }

  const images = {
    '0':'/images/<20cm.png',
    '20':'/images/20-50cm.png',
    '50':'/images/50-200cm.png',
    '200':'/images/>200cm.png'
  }

  const yAxisLabels = {
    '0':'<20cm',
    '20':'20-50cm',
    '50':'50-200cm',
    '200':'>200cm'
  }

  const waterdiepteColors = {
    '0':'#c3e8f0',
    // '20cm':'#83bde8',
    '20':'#a5cff0',
    // '50cm':'#3f89c7',
    '50':'#7ca5d8',
    // '200cm':'#3656a7'
    '200':'#6f7bba'
  }

  // const tableColors = {
  //   'Schade voorkomen':'#89B2BB',
  //   'Schade beperking':'#E8DAB6',
  //   'Schuilen en evacueren':'#b29d95',//'#F3C39F',
  //   'Acceptabel risico':'#A8C9B9'
  // }


  $: rectWidth = w / 5;
  $: rectHeight = rectWidth*0.66;

  $: marginLeft = rectWidth
  const marginTop = 150
  const padding = 0

  function clickRemove(){
    d3.select('.spinner-item')
      .style('visibility', 'visible')

    setTimeout(() => {
      for(const diepte_kans in $tileLayers){
        $tileLayers[diepte_kans].remove()
        $tileLayers[diepte_kans].addTo($leafletMap);
      };
      tableSelection.set(null)
      d3.select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  $: removeVisible = ($tableSelection !== null)
    ? 'visible'
    : 'hidden'


</script>

<div class='div_table'>

  {#if w === undefined}
    <pre>Loading...</pre>
  {:else}

    <svg class='table'>
      <g transform="translate({marginLeft*0.9},{h/2 - 2*rectHeight - 20})">

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <g class='removeselection' visibility={removeVisible} on:click={clickRemove} cursor='pointer'
          transform='translate({1.5*rectWidth}, {-40})'>
          <rect
            width={200}
            height={40}
            rx={20}
            x={-28}
            y={-5}
            stroke='black'
            fill='#f1f1f2'
          />
          <image fill='steelblue' href={'./images/remove.png'}
            transform='translate({-15}, {0}) '
            width={30} height={30}/>
          <text class='textremoveselection' x={20} y={20}>Verwijder selectie</text>
        </g>

        {#each waterdiepten as waterdiepte, i}
          {#each kansen as kans, j}
            <TableCell {rectWidth} {rectHeight} {padding} {gevolgbeperking} {waterdiepte} {waterdiepteColors} {kans} {i} {j} />
          {/each}
          <g>
            <image fill='steelblue' href={images[waterdiepte]}
              transform='translate({-rectWidth*0.9}, {i*rectHeight+1}) '
              width={rectWidth} height={rectHeight}/>
            <g transform='translate(0, {i*rectHeight + 0.5*rectHeight}) rotate(-90)'>
              <text font-size='12' fill='black' text-anchor='middle'>
                {yAxisLabels[waterdiepte]}
              </text>
            </g>
          </g>
        {/each}
        {#each kansen as kans, j}
          <g class='x-labels' transform="translate({rectWidth/2},{4*rectHeight + 3*padding})">
            <text text-anchor='middle' font-size='{w*0.017}'>
              <tspan x={j*(rectWidth+padding)} y={20}>
                {'1x per ' + kans + ' jaar'}
              </tspan>
              <tspan x={j*(rectWidth+padding)} y={40}>
                ({kansenRange[j]})
              </tspan>
            </text>
          </g>
        {/each}

        <text font-size='17' x={-rectWidth/2 + 15} y={-18} text-anchor='middle'>
          Waterdiepte
        </text>
        <text font-size='17' text-anchor='middle' x={2*rectWidth} y={4*rectHeight + 80}>
          Overstromingskans
        </text>
      </g>


    </svg>

  {/if}
</div>

<style>
  .div_table{
    width:100%;
    height:100%;
  }
  svg{
    width:100%;
    height:100%;
  }
  button{
    position:absolute;
  }

</style>
