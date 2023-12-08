<script>
  import { kansOfDreiging, mapSelection } from "$lib/stores";
  import { select } from "d3";
  
  export let w;
  export let h;
  export let categorieen;
  export let data
  export let meta

  function kansOfDreigingNameToCode(name){
    return meta.filter(d => {
      console.log(d.effect_kans, name)
      return d.effect_kans === name
    })[0]['code']
  }

  function click(element){
    const kansDreiging = kansOfDreigingNameToCode(element)
    if($mapSelection.length === 0 && $kansOfDreiging === null){
      select('.spinner-item')
        .style('visibility', 'visible')
    }
    setTimeout(() => {
      kansOfDreiging.set(element)
      const subLandschappen = []
      data.forEach(datarow => {
        if(datarow[kansDreiging] === '1' || datarow[kansDreiging] === '2'){
          subLandschappen.push(datarow['BKNSN_code'])
        }
      });
      mapSelection.set(subLandschappen)
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }
</script>

{#each categorieen as categorie}
  <div class='categorie'>
    <p class='categoryname'>{categorie.name}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='elements'>
      {#each categorie.elements as element}
        <div class='element' style='width:{(w/4)-1}px' on:click={() => click(element)}>
          <img src='./images/{element.replaceAll('&', '').replaceAll('/', '')}.png'style='width:{w/9}px; {(element === $kansOfDreiging) ? 'transform: scale(1.3); box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); border:2px solid' : ""}' alt='Afbeelding van {categorie.name}'/>
          <p class='element-p'>{element}</p>
        </div>
      {/each}
    </div>
  </div>
{/each}


<style>
  .categorie{
    width:100%;
    display: flex;
    flex-direction:column;
    margin-bottom: 1.5vh;
    /* border: 1px solid steelblue; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: white;
    padding-top:5px;
    padding-bottom:3px;
  }

  .elements{
    justify-content: space-evenly;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

  }

  .element{
    flex-grow: 1;
    cursor: pointer;
    transition: all 0.3s

  }

  .element:hover img{
    transform: scale(1.3);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }


  .element-p{
    font-size:1.5vh;
    margin:0 auto;
    width:100%;
  }


  .categoryname{
    margin:0;
  }

</style>