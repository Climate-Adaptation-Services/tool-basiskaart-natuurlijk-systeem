<script>

  import { kansOfDreiging, mapSelection } from "$lib/stores";
  import { select } from "d3";
  

  export let w;
  export let h;
  export let categorieen;
  export let data

  function click(element){
    console.log($mapSelection.length, $kansOfDreiging)
    if($mapSelection.length === 0 && $kansOfDreiging === null){
      select('.spinner-item')
        .style('visibility', 'visible')
    }
    setTimeout(() => {
      kansOfDreiging.set(element)
      const subLandschappen = []
      data.forEach(datarow => {
        if(datarow[element] === '1' || datarow[element] === '2'){
          subLandschappen.push(datarow['BKNSN_code'])
        }
      });
      mapSelection.set(subLandschappen)
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }
console.log(categorieen)
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

<!-- <svg class='dreigingen-svg' width={w} height={h}>
  {#each categorieen as categorie, i}
    <g transform='translate(0,{i*h/3+20})'>
      <text x={w/2-5} text-anchor='middle'>{categorie.name}</text>
      {#each categorie.elements as element}
        <text y='1.2em'>{element}</text>
      {/each}
    </g>
  {/each}
</svg> -->


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
    padding-bottom:5px;
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