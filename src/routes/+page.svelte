<script>
	import Map from '$lib/components/Map.svelte'
	// import Table from '$lib/components/Table.svelte'
	// import Alert from '$lib/components/Alert.svelte'
	import KansenBedreigingen from '$lib/components/KansenBedreigingen.svelte';
	import Legend from '$lib/components/Legend.svelte';

	export let data

	const dataKansenDreigingen = data.data;

	console.log(dataKansenDreigingen)

	let wMap;
	let hMap;
	let wKansen;
	let hKansen;

	const klimaatDreigingen = [
		{'name':'Wateroverlast', 'elements':['Langdurige neerslag', 'Kortdurend', 'Rivierkwel	bodemerosie']},
		{'name':'Verdroging', 'elements':['Droogteschade landbouw', 'Verdroging extreme rivierstanden', 'Verdroging grondwaterafh. natuur', 'Natuurbrand', 'Bodemdaling veenoxidatie', 'Bodemzetting zwel &krimp', 'CO2-emissie']},
		{'name':'Verzilting', 'elements':['Zoute en brakke kwel']}
	]

	const adaptatieKansen = [
		{'name':'Vasthouden', 'elements':['Bodeminfiltratie', 'Verhogen drainagebasis', 'Verhogen org.stof bodem', 'Peilverhogen opp.- en grondwater']},
		{'name':'Bergen', 'elements':['Inundatie land', 'Vergroten capaciteit oppervlakte-water']},
		{'name':'Afvoeren', 'elements':['Beek- en rivierherstel', 'Stromende berging']},
		{'name':'Landgebruik', 'elements':['Aanpassen teelten/ nat. vegetatie']}
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
					<KansenBedreigingen w={wKansen} h={hKansen} categorieen={klimaatDreigingen} data={dataKansenDreigingen}/>
				</div>
			</div>
			<div class='kansen'>
				<h3>Adaptatiekansen</h3>
				<div class='kansendreigingen-div' bind:clientWidth={wKansen} bind:clientHeight={hKansen}>
					<KansenBedreigingen w={wKansen} h={hKansen} categorieen={adaptatieKansen} data={dataKansenDreigingen}/>
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
	height:60%;
}

.kansendreigingen-div{
	width:97%;
}

.kansen, .bedreigingen{
	float:left;
	width:49%;
	height: 100%;
	border-top: solid;
	display: flex;
	flex-direction: column;
}

.bedreigingen{
	border-right: solid;
}

h3{
	margin-top:5px;
}

</style>
