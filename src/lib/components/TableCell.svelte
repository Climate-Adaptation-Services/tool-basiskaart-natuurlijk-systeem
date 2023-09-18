<script>
  import { tableSelection, mapSelection, modal, leafletMap, tileLayers } from '../stores.js';
  import * as d3 from "d3";
  import { bind } from 'svelte-simple-modal';
  import AlertPopup from './AlertPopup.svelte';

  export let rectWidth;
  export let rectHeight;
  export let padding;
  export let tableColors;
  export let waterdiepteColors
  export let gevolgbeperking;
  export let waterdiepte;
  export let kans;
  export let i;
  export let j;

  function checkIfInTableSelection(waterdiepte, kans){
    let a = JSON.stringify($tableSelection);
    let b = JSON.stringify([waterdiepte, kans]);
    return a.indexOf(b) > -1;
  }

  function click(){

    d3.select('.spinner-item')
      .style('visibility', 'visible')

    setTimeout(() => {
      if($mapSelection === null){
        // const diepteInt = waterdiepte.split('cm')[0]
        // const kansInt = kans.split('per ')[1].split(' jaar')[0]
        if($tableSelection === null){
          // remove all tileLayers except this one
          for(const kans_diepte in $tileLayers){
            if(waterdiepte + '_' + kans !== kans_diepte){
              $tileLayers[kans_diepte].remove()
            }
          }
          tableSelection.set([[waterdiepte, kans]])
        }else{
          if(checkIfInTableSelection(waterdiepte, kans) === true){
            // remove tableSelection if it was already present
            const newTableSelection = $tableSelection.filter(d => !(waterdiepte === d[0] && kans === d[1]))
            if(newTableSelection.length === 0){
              for(const diepte_kans in $tileLayers){
                $tileLayers[diepte_kans].addTo($leafletMap);
              };
              tableSelection.set(null)
            }else{
              $tileLayers[waterdiepte + '_' + kans].remove()
              tableSelection.set(newTableSelection)
            }
          }else{
            if($tableSelection.length === 15){
              tableSelection.set(null)
            }else{
              // to get the right order of tilelayers on the map, first remove
              // all tileLayers, then add them in the right order
              for(const diepte_kans in $tileLayers){
                $tileLayers[diepte_kans].remove()
              };
              tableSelection.set([...$tableSelection, [waterdiepte, kans]])
              for(const diepte_kans in $tileLayers){
                $tableSelection.forEach(waterdiepteEnKans => {
                  if(waterdiepteEnKans[0] === diepte_kans.split('_')[0] && waterdiepteEnKans[1] === diepte_kans.split('_')[1]){
                    $tileLayers[diepte_kans].addTo($leafletMap);
                  }
                });
              }
            }
          }
        }
      }else{
        modal.set(bind(AlertPopup, { message: "Het is niet mogelijk een vak in de tabel te selecteren op het moment dat een gebied is geselecteerd. Klik ergens op de kaart om een gebied te deselecteren." }))
      }
      d3.select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);

  }

  let opacity;
  let filter;
  $: if($tableSelection !== null){
    let selected = false
    $tableSelection.forEach((waterdiepteEnKans, i) => {
      if(waterdiepteEnKans[0] === waterdiepte && waterdiepteEnKans[1] === kans){
        selected = true
      }
    });
    if(selected === false){
      filter = "grayscale(1)"
      opacity = 0.5
    }else{
      opacity = 1;
      filter = 'grayscale(0)'
    }
  }else if($mapSelection !== null){
    let selected = false
    $mapSelection.forEach((waterdiepteEnKans, i) => {
      if(waterdiepteEnKans[0] === waterdiepte && waterdiepteEnKans[1] === kans){
        selected = true
      }
    });
    if(selected === false){
      filter = "grayscale(1)"
      opacity = 0.5
    }else{
      opacity = 1;
      filter = 'grayscale(0)'
    }
  }else{
    opacity = 1;
    filter = 'grayscale(0)'
  }

</script>

<g transform="translate({j*(rectWidth+padding)},{i*(rectHeight+padding)})"
  cursor='pointer' filter={filter} opacity={opacity}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <rect
    class={'rect_' + waterdiepte + '_' + kans.replaceAll(' ','')}
    width={rectWidth - padding}
    height={rectHeight - padding}
    on:click={click}
    fill={waterdiepteColors[waterdiepte]}
    stroke='black'
    stroke-width='0.3'
  />

</g>

<style>
  text{
    pointer-events: none;
  }
</style>
