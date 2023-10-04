<script>

  export let w;
  export let h;
  export let categorieen;



</script>

{#each categorieen as categorie}
  <div class='categorie'>
    <p class='categoryname'>{categorie.name}</p>
    <!-- <text x={w/2-5} text-anchor='middle'>{categorie.name}</text> -->
    <div class='elements' style=''>
      {#each categorie.elements as element}
        <div class='element' style='width:{(w/3)-1}px'>
          <img src='./images/{categorie.name}.png' style='width:{w/7}px'/>
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
    margin-bottom: 5px;
  }

  .elements{
    justify-content: space-evenly;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;

  }

  .element{
    flex-grow: 1;
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