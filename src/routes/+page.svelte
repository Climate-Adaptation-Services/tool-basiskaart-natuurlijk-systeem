<script>
	import Map from '$lib/components/Map.svelte'
	// import Table from '$lib/components/Table.svelte'
	// import Alert from '$lib/components/Alert.svelte'
	import KansenBedreigingen from '$lib/components/KansenBedreigingen.svelte';
	import Legend from '$lib/components/Legend.svelte';

	export let data

	const dataKansenDreigingen = data.data;
	const metaKansenDreigingen = data.meta;

	console.log(dataKansenDreigingen)
	console.log(metaKansenDreigingen)

	let wMap;
	let hMap;
	let wKansen;
	let hKansen;

	const klimaatDreigingen = [
		{'name':'Wateroverlast', 'elements':['Langdurige neerslag', 'Kortdurend', 'Rivierkwel' , 'Bodemerosie (water)']},
		{'name':'Verdroging', 'elements':['Droogteschade landbouw', 'Verdroging extreme rivierstanden', 'Verdroging grondwaterafh. natuur', 'Natuurbrand', 'Bodemdaling veenoxidatie', 'Bodemzetting zwel &krimp', 'CO2-emissie', 'Bodemerosie (wind)']},
		{'name':'Verzilting', 'elements':['Zoute en brakke kwel']}
	]

	const adaptatieKansen = [
		{'name':'Vasthouden', 'elements':['Bodeminfiltratie', 'Verhogen drainagebasis', 'Verhogen org.stof bodem', 'Peilverhogen opp.- en grondwater']},
		{'name':'Bergen', 'elements':['Inundatie land', 'Vergroten capaciteit oppervlakte-water']},
		{'name':'Afvoeren', 'elements':['Beek- en rivierherstel', 'Stromende berging']},
		{'name':'Landgebruik', 'elements':['Aanpassen teelten nat. vegetatie']}
	]

</script>

<div class='container'>
	<!-- <Alert /> -->

	<div class='side-panel'>
		<div class='legend'>
			<Legend legendWidth={wMap} legendHeight={hMap/2} {dataKansenDreigingen} />
		</div>
		<div class='kansen-bedreigingen'>
			<div class='bedreigingen'>
				<h3>Klimaatdreigingen</h3>
				<div class='kansendreigingen-div' bind:clientWidth={wKansen} bind:clientHeight={hKansen}>
					<KansenBedreigingen w={wKansen} h={hKansen} categorieen={klimaatDreigingen} data={dataKansenDreigingen} meta={metaKansenDreigingen}/>
				</div>
			</div>
			<div class='kansen'>
				<h3>Adaptatiekansen</h3>
				<div class='kansendreigingen-div' style='margin-left:3%' bind:clientWidth={wKansen} bind:clientHeight={hKansen}>
					<KansenBedreigingen w={wKansen} h={hKansen} categorieen={adaptatieKansen} data={dataKansenDreigingen} meta={metaKansenDreigingen}/>
				</div>
			</div>
		</div>
	</div>
	<div class='map' bind:clientWidth={wMap} bind:clientHeight={hMap} >
		<Map mapWidth={wMap} mapHeight={hMap} {dataKansenDreigingen}/>
	</div>
</div>


<style>

.container{
	height:100%;
}
.map, .side-panel{
	float:left;
	height:100%;
}

.side-panel{
	width:55%;
	background-color: rgb(250, 245, 237);
}

.map{
	width:45%;
}

.legend{
	height:40%;
	position: relative;
}

.kansen-bedreigingen{
	text-align: center;
	height:50%;
	padding:10px;
}

.kansendreigingen-div{
	width:97%;
}

.kansen, .bedreigingen{
	float:left;
	width:49%;
	height: 100%;
	/* border-top: 1px solid; */
	display: flex;
	flex-direction: column;
}

.bedreigingen{
	/* border-right: 1px solid; */
}

h3{
	margin-top:0px;
	margin-bottom:1vh;
	color:#635F5D;
}

</style>
