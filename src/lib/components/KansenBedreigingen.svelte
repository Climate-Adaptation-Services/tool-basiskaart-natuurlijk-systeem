<script>
  import { kansOfDreiging, kansOfDreigingWithValue, mapSelection, mapSelectionWithValue, kansOfDreigingHover } from "$lib/stores";
  import { select } from "d3";
  import { onMount } from "svelte";

  export let w;
  export let h;
  export let categorieen;
  export let data
  export let meta

  function kansOfDreigingNameToCode(name){
    return meta.filter(d => d.effect_kans === name)[0]['code']
  }

  function click(element){
    const kansDreiging = kansOfDreigingNameToCode(element)
    if($mapSelection.length === 0 && $kansOfDreiging === null){
      select('.spinner-item')
        .style('visibility', 'visible')
    }
    setTimeout(() => {
      kansOfDreiging.set([kansOfDreigingNameToCode(element)])
      kansOfDreigingWithValue.set(null)
      const subLandschappen = []
      const subLandschappenWithValue = [[],[]]
      data.forEach(datarow => {
        if(datarow[kansDreiging] === '1'){
          subLandschappenWithValue[0].push(datarow['BKNSN_code'])
          subLandschappen.push(datarow['BKNSN_code'])
        }
        else if(datarow[kansDreiging] === '2'){
          subLandschappenWithValue[1].push(datarow['BKNSN_code'])
          subLandschappen.push(datarow['BKNSN_code'])
        }
      });
      mapSelection.set(subLandschappen)
      mapSelectionWithValue.set(subLandschappenWithValue)
      select('.spinner-item')
        .style('visibility', 'hidden')
    }, 1);
  }

  function infoMouseOver(e, element){    
    kansOfDreigingHover.set(element)
  }

  function infoMouseOut(){
    kansOfDreigingHover.set(null)
  }

  const createClassName = (naam) => naam.replaceAll('/','').replaceAll(' ','').replaceAll('-','').replaceAll(',','').replaceAll('.','')

  // onMount(() => {
  //   categorieen.forEach(categorie => {
  //     categorie.elements.forEach(element => {
  //       const box = document.getElementsByClassName('element_' + createClassName(element))[0].getBoundingClientRect()
  //       console.log(box)
  //       select('.element_' + createClassName(element) + ' .kansimg')
  //         .style('transform', 'translate(-40px,-20px)')
  //     });
  //   });
  // })

</script>

{#each categorieen as categorie}
  <div class='categorie' style='width:{(categorie.name === 'Landgebruik' || categorie.name === 'Verzilting') ? 50 : 100}%'>
    <p class='categoryname'><strong>{categorie.name}</strong></p>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='elements'>
      {#each categorie.elements as element}
        <div class='element element_{createClassName(element)}' style='width:{(w/4)-1}px;
          {($kansOfDreiging && $kansOfDreiging.includes(kansOfDreigingNameToCode(element))) 
            ? ($kansOfDreigingWithValue && $kansOfDreigingWithValue[1].includes(kansOfDreigingNameToCode(element)))
              ? 'background-color:#FFF4E5'
              : 'background-color:#FFE0B1'
            : ""} '
          on:click={() => click(element)}>
          <img class='kansimg' src='./images/info.png' width='17px' style='opacity:0.7' on:mouseover={(e) => infoMouseOver(e, element)} on:mouseout={(e) => infoMouseOut()}/>
          <img src='./images/{element.replaceAll('&', '').replaceAll('/', '')}.png'
          style='width:{w/11}px' alt='Afbeelding van {categorie.name}'/>
          <p class='element-p'>{element}</p>
        </div>
      {/each}
    </div>
  </div>
  {#if categorie.name === 'Landgebruik' && ($kansOfDreiging || $mapSelection.length>0)}
    <div class='legenda-matig-sterk'>
      <p style='margin:0px 0px 10px 0px; color:rgb(100,100,100)'><em>Dreiging/kans speelt:</em></p>
      <div class='matig legenda-item' style='background-color:#FFF4E5'>
        <p>Matig</p>
      </div>
      <div class='sterk legenda-item' style='background-color:#FFD9A2'>
        <p>Sterk</p>
      </div>
    </div>
  {/if} 
{/each}

<style>
  .categorie{
    display: flex;
    flex-direction:column;
    margin-bottom: 1vh;
    /* border: 1px solid steelblue; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: rgb(252, 250, 248);
    padding-top:5px;
    padding-bottom:3px;
    float:left;
  }

  .legenda-matig-sterk{
    float:right;
    background-color: rgb(252, 250, 248);
    width:42%;
    height:100px;
    margin-left:10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding:10px 0px 10px 0px;
    border: 4px solid rgb(150,150,150);
  }

  .legenda-item{
    margin: 0px 40px 0px 40px;
    flex:1;
    height:20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .elements{
    justify-content: space-evenly;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }

  .element{
    flex-grow: 1;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img{
    transition: all 0.3s
  }

  .element:hover{
    /* transform: scale(1.1); */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
    background-color:blanchedalmond;
  }

  .element:hover img{
    /* transform: scale(1.1); */
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
  }


  .element-p{
    font-size:1.5vh;
    margin:0 auto;
    width:100%;
  }

  .categoryname{
    margin:0;
    color:#8E8883;
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

  .kansimg{
    position:absolute;
    transform:translate(-28px,-10px);
  }


</style>