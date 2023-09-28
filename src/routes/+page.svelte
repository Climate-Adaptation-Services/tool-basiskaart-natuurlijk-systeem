<script>
	import Map from '$lib/components/Map.svelte'
	// import Table from '$lib/components/Table.svelte'
	// import Alert from '$lib/components/Alert.svelte'
	import KansenBedreigingen from '$lib/components/KansenBedreigingen.svelte';
	import Legend from '$lib/components/Legend.svelte';

	export let data

	const dataKansenDreigingen = data.data;

	console.log(dataKansenDreigingen)

	let w;
	let h;

</script>

<div class='container'>
	<!-- <Alert /> -->

	<div class='side-panel'>
		<div class='legend'>
			<Legend legendWidth={w} legendHeight={h/2} {dataKansenDreigingen} />
		</div>
		<div class='kansen-bedreigingen'>
			<KansenBedreigingen {w} {h} />
		</div>
	</div>

	<div class='map' bind:clientWidth={w} bind:clientHeight={h} >
		<Map mapWidth={w} mapHeight={h} {dataKansenDreigingen}/>
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
	width:50%;
}

.map{
	width:50%;
}

.legend{
	height:40%;
	position: relative;
}

.kansen-bedreigingen{
	text-align: center;
	height:60%;
}

</style>
