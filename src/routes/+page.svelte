<script>
	import Map from '$lib/components/Map.svelte'
	import Table from '$lib/components/Table.svelte'
	import Alert from '$lib/components/Alert.svelte'

	let w;
	let h;

</script>

<div class='container'>
	<Alert />
	<div class='map' bind:clientWidth={w} bind:clientHeight={h} >
		<Map {w} {h} />
	</div>
	<div class='table'>
		<Table {w} {h} />
	</div>
</div>


<style>

.container{
	height:100%;
}
.map, .table{
	float:left;
	width:50%;
	height:100%;
}

</style>
