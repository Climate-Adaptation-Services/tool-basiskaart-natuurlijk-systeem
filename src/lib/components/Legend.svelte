<script>
  import { uniq, map } from 'lodash'
  import { subtypenColors, mapSelection, clickLocation } from '$lib/stores';
  import { select } from 'd3';
    import { Circle } from 'svelte-loading-spinners';

  export let legendWidth;
  export let legendHeight;
  export let dataKansenDreigingen

  // const subtypen = uniq(map(dataKansenDreigingen, 'Sublandschap'))
  
  const landschapstypen = {
    'Strandwallen en binnenduinrand':['Strandwal', 'Strandvlakte', 'Kustduinen'],
    'Zeekleipolders': ['Zeekleivlakte', 'Kreekrug', 'Kreekbedding', 'Terp', 'Zoetwatergetijdevlakte'],
    'Laagveen': ['Laagveenvlakte', 'Petgaten'],
    'Droogmakerijen en IJsselmeerpolders': ['Meerbodem', 'Kreekrug', 'Veenrest'],
    'Rivierengebied':['Stroomrug, oeverwal', 'Rivierkom', 'Uiterwaard', 'Overslaggronden', 'Restgeul'],
    'Rivierterrassen': ['Rivierterras / zand', 'Rivierterras / klei', 'Rivierduin', 'Restgeul'],
    'Stuwwallen': ['Stuwwal', 'Sandr /spoelzandvlakte of -waaier', 'Daluitspoelingswaaier', 'Droogdal', 'Es'],
    'Keileemgebied': ['Keileemrug', 'Keileemplateau', 'Smeltwatervlakte'],
    'Dekzandgebied': ['Dekzandrug', 'Dekzandvlakte', 'Stuifzandduin', 'Es', 'Beekdal, zand', 'Beekdal, veen', 'Depressie, zand', 'Depressie, veen', 'Laagveenvlakte'],
    'Voormalige hoogvenen': ['Hoogveen', 'Depressie, veen', 'Dekzandrug'],
    'Heuvelland en lossgebied': ['Lossplateau en terrassen', 'Losshelling', 'Kalkhelling', 'Beekdal', 'Droogdal', 'Rivierterras', 'Overige afzettingen']
  }

  const margin = {top:30, bottom:0, left:30, right:0}

  const group1 = Object.keys(landschapstypen).slice(0,4)
  const group2 = Object.keys(landschapstypen).slice(4,8)
  const group3 = Object.keys(landschapstypen).slice(8)

  function getBSNSNCode(subtype){
    return dataKansenDreigingen.filter(d => d['Sublandschap'] === subtype)[0]['BKNSN_code'];
  }

  function getYPosition(group, i){
    let yPos = 0
    for(let j=0;j<i;j++){
      yPos += landschapstypen[group[j]].length
    }
    return yPos*14 + i*35
  }

  const createClassName = (subtype) => subtype.replaceAll('/','').replaceAll(' ','').replaceAll('-','').replaceAll(',','')

  function mouseover(subtype, i, j){
    select('.rect-' + createClassName(subtype) + '-' + i + '-' + j)
      .style('fill', 'steelblue')
  }

  function mouseout(subtype, i, j){
    select('.rect-' + createClassName(subtype) + '-' + i + '-' + j)
    .style('fill', 'white')
  }

  function clickRemove(){
    select('.spinner-item')
      .style('visibility', 'visible')

    setTimeout(() => {
      mapSelection.set(null)
      clickLocation.set(null)
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  function click(subtype){
    if($mapSelection === null){
      select('.spinner-item')
      .style('visibility', 'visible')
    }
    setTimeout(() => {
      mapSelection.set(getBSNSNCode(subtype))
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

</script>

<div class='removeselection'>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg cursor='pointer' class='svgremoveselection' on:click={() => clickRemove()} style='visibility:{($mapSelection) ? 'visible' : 'hidden'}'>
    <!-- <rect width='60px' height='70px' stroke='black' fill='none'></rect> -->
    <!-- <circle cx='25' cy='25' r=20 fill='white'></circle> -->
    <path d='M20 10, L40,30, M20 30, L40 10' stroke='black' fill="black" stroke-linecap="round" stroke-width='6'></path>
    <text x='30' y='50' fill='darkred' text-anchor='middle'>Verwijder</text>
    <text x='30' y='65' fill='darkred' text-anchor='middle'>selectie</text>
  </svg>
</div>
<svg class='svg-legend' viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet">
  <rect width='100%' height='100%' fill='white' on:click={() => clickRemove()}></rect>
  <g transform='translate({margin.left},{margin.top})'>
    {#each [group1, group2, group3] as group, k}
      {#each group as landschapstype, i}
        <g transform='translate({k*300},{getYPosition(group, i)})'>
          <text class='hoofdtype'>{landschapstype}</text>
            {#each landschapstypen[landschapstype] as subtype, j}
              <!-- svelte-ignore a11y-mouse-events-have-key-events -->
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <g on:click={() => click(subtype)} cursor='pointer' on:mouseover={() => mouseover(subtype,i,j)} on:mouseout={() => mouseout(subtype,i,j)}>
                <rect class='rect-{createClassName(subtype)}-{i}-{j}' height='1em' width='250px' x=0 y='{j+0.5}em' fill='white' stroke='{($mapSelection === getBSNSNCode(subtype)) ? 'red' : 'none'}' stroke-width='3' opacity='0.3'></rect>
                <rect height='1em' width='40px' x=0 y='{j+0.5}em' fill={subtypenColors[subtype]}></rect>
                <text y='{j+1.34}em' x='45px' style="{($mapSelection === getBSNSNCode(subtype)) ? 'font-weight:bold' : ''}">{subtype}</text>
              </g>
            {/each}
        </g>
      {/each}
    {/each}
  </g>
</svg>

<!-- on:mouseout={() => mapSelection.set(null)}> -->


<style>
  .svg-legend{
    width:100%;
    height: 100%;
  }

  .svgremoveselection{
    width:100%;
    height: 100%;
  }

  .hoofdtype{
    font-size: 14px;
    font-weight: bold;
  }

  .removeselection{
    position:absolute;
    right:10px;
    top:10px;
    z-index: 10000;
    opacity:0.8;
    width:60px;
    height:100px;
  }

</style>