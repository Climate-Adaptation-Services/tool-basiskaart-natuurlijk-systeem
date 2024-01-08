<script>
  import { kansOfDreiging, kansOfDreigingWithValue, mapSelection, mapSelectionWithValue } from "$lib/stores";
  import { select } from "d3";
  import { kansdreigingInfo } from '$lib/noncomponents/kansendreigingenInfo.js'
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
    console.log('ello')
    select('.legend-text')
      .html(kansdreigingInfo[element])

    select('.legend-title')
      .html(element)

    select('.legend-tooltip')
      .style('visibility', 'visible')
      .style('left', 15 + e.clientX + 'px')
      .style('top', -150 + e.clientY + 'px')
  }

  function infoMouseOut(){
    select('.legend-tooltip').style('visibility', 'hidden')
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
  <div class='categorie'>
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
          <img class='kansimg' src='./images/info.png' width='20px' style='opacity:0.7' on:mouseover={(e) => infoMouseOver(e, element)} on:mouseout={(e) => infoMouseOut()}/>
          <img src='./images/{element.replaceAll('&', '').replaceAll('/', '')}.png'
          style='width:{w/11}px' alt='Afbeelding van {categorie.name}'/>
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
    margin-bottom: 1vh;
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
    transform:translate(-48px,-20px);
  }


</style>