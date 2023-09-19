<script>
  import { uniq, map } from 'lodash'

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

  const subtypenColors = {
    'Strandwal':'#FDCD66',
    'Strandvlakte':'#F2FFD5',
    'Kustduinen':'#FFFF6A',
    'Zeekleivlakte':'#67BCD0',
    'Kreekrug':'#B5D398',
    'Kreekbedding':'#90A2B7',
    'Terp':'#EE666A',
    'Zoetwatergetijdevlakte':'#65B5CB',
    'Zoutwatergetijdevlakte':'#D7EEE1',
    'Laagveenvlakte':'#E1ADF7',
    'Petgaten':'#B267C7',
    'Meerbodem':'#6893AD',
    'Kreekrug':'#67CAB4',
    'Veenrest':'#AA8DBA',
    'Stroomrug oeverwal':'#C0F065',
    'Rivierkom':'#66AC94',
    'Uiterwaard':'#8B7CAA',
    'Overslaggronden':'#BF7C84',
    'Restgeul':'#667DA6',
    'Rivierterras / zand':'#D8E1B5',
    'Rivierterras / klei':'#90B8A8',
    'Rivierduin':'#FFCB62',
    'Stuwwal':'#ED9564',
    'Sandr /spoelzandvlakte of -waaier':'#F0BF65',
    'Daluitspoelingswaaier':'#E1A4A3',
    'Droogdal':'#A17794',
    'Es':'#AB7C6A',
    'Keileemrug':'#E2A2A4',
    'Keileemplateau':'#F8AFB1',
    'Smeltwatervlakte':'#FAC6B1',
    'Dekzandrug':'#FEE2B7',
    'Dekzandvlakte':'#F2E8D9',
    'Stuifzandduin':'#FDFFA7',
    'Beekdal, zand':'#AABBB5',
    'Beekdal, veen':'#AEAED2',
    'Depressie, zand':'#A3C3D1',
    'Depressie, veen':'#7C759A',
    'Hoogveen':'#9466AC',
    'Lossplateau en terrassen':'#E8C3C2',
    'Losshelling':'#E1B9A3',
    'Kalkhelling':'#B8AA8F',
    'Beekdal':'#66AC94',
    'Rivierterras':'#CCA664',
    'Overige afzettingen':'#EF9464'
  }


</script>


<svg class='svg-legend'>


</svg>



<style>
  .svg-legend{
    width:100%;
    height: 100%;
  }

</style>