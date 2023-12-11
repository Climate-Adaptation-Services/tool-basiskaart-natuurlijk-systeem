<script>
  import { uniq, map } from 'lodash'
  import { mapSelection, clickLocation, kansOfDreiging, mapSelectionWithValue, kansOfDreigingWithValue } from '$lib/stores';
  import { select } from 'd3';
  import { Circle } from 'svelte-loading-spinners';
  import { legendText } from '$lib/noncomponents/landschapstypeInfo.js'

  export let legendWidth;
  export let legendHeight;
  export let dataKansenDreigingen

  // const subtypen = uniq(map(dataKansenDreigingen, 'Sublandschap'))
  
  const landschapstypen = {
    'Strandwallen en binnenduinrand':[
      {name:'Strandwal', code:'Bd1'}, 
      {name:'Strandvlakte', code:'Bd2'},
      {name:'Kustduinen', code:'Bd3'}
    ],
    'Zeekleipolders': [
      {name:'Zeekleivlakte', code:'Zk2'},
      {name:'Kreekrug', code:'Zk3'},
      {name:'Kreekbedding', code:'Zk4'},
      {name:'Zoetwatergetijdenafzetting', code:'Zk6'},
      {name:'Zoutwatergetijdenafzetting', code:'Zk7'}
    ],
    'Laagveen': [
      {name:'Laagveenvlakte', code:'Lv1'},
      {name:'Petgaten', code:'Lv2'}
    ],
    'Droogmakerijen en IJsselmeerpolders': [
      {name:'Meerbodem', code:'Dr1'},
      {name:'Kreekrug', code:'Dr2'},
      {name:'Veenrest', code:'Dr3'}
    ],
    'Overig': [
      {name:'Terp', code:'At'},
      {name:'Antropogeen element', code:'A'},
      {name:'Water', code:'W'}
    ],
    'Rivierengebied':[
      {name:'Stroomrug oeverwal', code:'Rg1'},
      {name:'Rivierkom', code:'Rg2'},
      {name:'Uiterwaard', code:'Rg3'},
      {name:'Overslaggronden', code:'Rg4'},
      {name:'Restgeul', code:'Rg5'}
    ],
    'Rivierterrassen': [
      {name:'Rivierterras zand', code:'Rt1'},
      {name:'Rivierterras klei', code:'Rt2'},
      {name:'Rivierduin', code:'Rt3'},
      {name:'Restgeul', code:'Rt4'}
    ],
    'Stuwwallen': [
      {name:'Stuwwal', code:'Sw1'},
      {name:'Smeltwaterafzettingen sandr', code:'Sw2'},
      {name:'Daluitspoelingswaaier', code:'Sw3'},
      {name:'Droogdal', code:'Sw4'},
      {name:'Droogdal met veen', code:'Sw4v'},
      {name:'Droogdal met keileem', code:'Sw4x'},
      {name:'Es', code:'Sw5'}
    ],
    'Keileemgebied': [
      {name:'Grondmorenerug', code:'Kl1'},
      {name:'Grondmorene plateau -vlakte', code:'Kl2'},
      {name:'Pingoruines en periglaciale laagten', code:'Kl3'}
    ],
    'Dekzandgebied': [
      {name:'Dekzandrug', code:'Dz1'},
      {name:'Dekzandvlakte', code:'Dz2'},
      {name:'Stuifzandduin en bijbehorende vlaktes', code:'Dz3'},
      {name:'Es', code:'Dz4'},
      {name:'Beekdal zand/leem', code:'Dz5'},
      {name:'Beekdal veen', code:'Dz6'},
      {name:'Depressie zand', code:'Dz7'},
      {name:'Depressie veen', code:'Dz8'},
      {name:'Laagveenvlakte', code:'Dz9'}
    ],
    'Voormalige hoogvenen': [
      {name:'Hoogveen', code:'Hv1'},
      {name:'Depressie', code:'Hv3'},
      {name:'Ontgonnen hoogveen', code:'Hv2'}
    ],
    'Heuvelland en lossgebied': [
      {name:'Lossplateau', code:'Lg1'},
      {name:'Losshelling', code:'Lg2'},
      {name:'Kalkhelling', code:'Lg3'},
      {name:'Beekdal', code:'Lg5'},
      {name:'Droogdal', code:'Lg6'},
      {name:'Rivierterras', code:'Lg7'},
      {name:'Overige afzettingen', code:'Lg8'}
    ]
  }

  const margin = {top:20, bottom:0, left:30, right:0}

  const group1 = Object.keys(landschapstypen).slice(0,5)
  const group2 = Object.keys(landschapstypen).slice(5,9)
  const group3 = Object.keys(landschapstypen).slice(9)

  function getYPosition(group, i){
    let yPos = 0
    for(let j=0;j<i;j++){
      yPos += landschapstypen[group[j]].length
    }
    return yPos*14 + i*35
  }

  const createClassName = (subtypeNaam) => subtypeNaam.replaceAll('/','').replaceAll(' ','').replaceAll('-','').replaceAll(',','')

  function mouseover(subtype, i, j){
    if(!$mapSelection.includes(subtype.code)){
      select('.rect-' + createClassName(subtype.name) + '-' + i + '-' + j)
      .attr('fill', '#e3eefc')
    }
  }

  function mouseout(subtype, i, j){
    if(!$mapSelection.includes(subtype.code)){
      select('.rect-' + createClassName(subtype.name) + '-' + i + '-' + j)
      .attr('fill', 'white')
    }
  }

  function clickRemove(){
    select('.spinner-item')
      .style('visibility', 'visible')

    setTimeout(() => {
      mapSelection.set([])
      kansOfDreiging.set(null)
      clickLocation.set(null)
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  function click(subtype){
    if($mapSelection === []){
      select('.spinner-item')
      .style('visibility', 'visible')
    }
    setTimeout(() => {
      const kansenEnDreigingen = []
      const kansenEnDreigingenWithValue = [[],[]]
      const subtypeData = dataKansenDreigingen.filter(d => d['BKNSN_code'] === subtype.code)[0]
      for(const key in subtypeData){
        if(subtypeData[key] === '1'){
          kansenEnDreigingen.push(key)
          kansenEnDreigingenWithValue[0].push(key)
        }
        if(subtypeData[key] === '2'){
          kansenEnDreigingen.push(key)
          kansenEnDreigingenWithValue[1].push(key)
        } 
      }
      kansOfDreiging.set(kansenEnDreigingen)
      kansOfDreigingWithValue.set(kansenEnDreigingenWithValue)
      mapSelection.set([subtype.code])
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  function infoMouseOver(e, landschapstype){
    select('.legend-text')
      .html(legendText)

    select('.legend-title')
      .html(landschapstype)

    select('.legend-tooltip')
      .style('visibility', 'visible')
      .style('left', 10 + e.clientX + 'px')
      .style('top', 10 + e.clientY + 'px')
  }

  function infoMouseOut(){
    select('.legend-tooltip').style('visibility', 'hidden')
  }

</script>

<div class='removeselection' style='visibility:{($mapSelection.length > 0) ? 'visible' : 'hidden'}'>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <svg cursor='pointer' class='svgremoveselection' on:click={() => clickRemove()} >
    <!-- <rect width='60px' height='70px' stroke='black' fill='none'></rect> -->
    <!-- <circle cx='25' cy='25' r=20 fill='white'></circle> -->
    <path d='M20 10, L40,30, M20 30, L40 10' stroke='black' fill="black" stroke-linecap="round" stroke-width='6'></path>
    <text x='30' y='50' fill='darkred' text-anchor='middle'>Verwijder</text>
    <text x='30' y='65' fill='darkred' text-anchor='middle'>selectie</text>
  </svg>
</div>
<div class='legend-tooltip' style='visibility: hidden;'>
  <h4 class='legend-title'></h4>
  <p class='legend-text'></p>
</div>
<svg class='svg-legend' viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet">
  <rect width='100%' height='100%' fill='white' on:click={() => clickRemove()}></rect>
  <g transform='translate({margin.left},{margin.top})'>
    {#each [group1, group2, group3] as group, k}
      {#each group as landschapstype, i}
        <g transform='translate({k*300},{getYPosition(group, i)})'>
          <text class='hoofdtype'>{landschapstype}</text>
          <image href='/images/info.png' width='18px' x='-23' y='-14' opacity='0.7' on:mouseover={(e) => infoMouseOver(e, landschapstype)} on:mouseout={(e) => infoMouseOut()}/>
          {#each landschapstypen[landschapstype] as subtype, j}
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <g on:click={() => click(subtype)} cursor='pointer' on:mouseover={() => mouseover(subtype,i,j)} on:mouseout={() => mouseout(subtype,i,j)}>
              <rect class='rect-{createClassName(subtype.name)}-{i}-{j}' height='1em' width='250px' x=0 y='{j+0.5}em'
                fill='{($mapSelection.includes(subtype.code)) 
                  ? ($mapSelectionWithValue[1].includes(subtype.code)) 
                    ? '#FFF4E5'
                    : '#FFD9A2'
                  : 'white'}'>
              </rect>
              <rect height='1em' width='40px' x=0 y='{j+0.5}em' fill={dataKansenDreigingen.filter(d => d['BKNSN_code'] === subtype.code)[0]['kleur']}></rect>
              <text y='{j+1.34}em' x='45px' style="{($mapSelection.includes(subtype.code)) ? 'font-weight:bold' : ''}">{subtype.name}</text>
            </g>
          {/each}
        </g>
      {/each}
    {/each}
  </g>
</svg>

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
    color:#635F5D
  }

  .removeselection{
    position:absolute;
    right:-30px;
    bottom:-30px;
    z-index: 10000;
    opacity:0.8;
    width:60px;
    height:70px;
    background-color: white;
  }

  .legend-tooltip{
    position: fixed;
    background-color: #FFF4E5;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    font-size: 16px;
    width:600px;
    padding:20px 40px 20px 40px;
    z-index: 1000;
  }

</style>