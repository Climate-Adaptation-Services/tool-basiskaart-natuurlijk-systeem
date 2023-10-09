<script>

  import { kansOfDreiging, mapSelection } from "$lib/stores";

  export let w;
  export let h;
  export let categorieen;
  export let data

  function click(element){
    kansOfDreiging.set(element)
    const subLandschappen = []
    data.forEach(datarow => {
      if(datarow[element] === '1' || datarow[element] === '2'){
        subLandschappen.push(datarow['BKNSN_code'])
      }
    });
    mapSelection.set(subLandschappen)
  }


</script>

{#each categorieen as categorie}
  <div class='categorie'>
    <p class='categoryname'>{categorie.name}</p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='elements'>
      {#each categorie.elements as element}
        <div class='element' style='width:{(w/3)-1}px' on:click={() => click(element)}>
          <img src='./images/{categorie.name}.png' style='width:{w/7}px' alt='Afbeelding van {categorie.name}'/>
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
    border: 1px solid steelblue;
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
    transform: scale(1.1); /* Scale the image to 1.1 times its original size on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow on hover */
  }


  .element-p{
    font-size:11px;
    margin:0 auto;
    width:100%;
  }


  .categoryname{
    margin:0;
  }

</style>