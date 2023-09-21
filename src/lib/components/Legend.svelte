<script>
  import { uniq, map } from 'lodash'
  import { subtypenColors, mapSelection } from '$lib/stores';

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

</script>


<svg class='svg-legend'>
  <g transform='translate({margin.left},{margin.top})'>
    {#each [group1, group2, group3] as group, k}
      {#each group as landschapstype, i}
        <g transform='translate({k*300},{i*100})'>
          <text>{landschapstype}</text>
            {#each landschapstypen[landschapstype] as subtype, j}
              <!-- svelte-ignore a11y-mouse-events-have-key-events -->
              <g on:click={() => mapSelection.set(getBSNSNCode(subtype))}>
                <rect height='1em' width='40px' x=0 y='{j}em' fill={subtypenColors[subtype]}></rect>
                <text y='{j+1}em' x='45px' style="{($mapSelection === getBSNSNCode(subtype)) ? 'font-weight:bold' : ''};cursor:default">{subtype}</text>
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

</style>