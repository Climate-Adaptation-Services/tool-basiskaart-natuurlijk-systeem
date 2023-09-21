<script>
  import BackgroundMap from '$lib/components/BackgroundMap.svelte'
  // import LoadingIcon from '$lib/components/LoadingIcon.svelte'

  export let w;
  export let h;
  export let dataKansenDreigingen

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_GeoJSON.json')
    ])

    return [await response[0].json()]//, await response[2].json(), await response[3].json(), await response[4].json(), await response[5].json(), await response[6].json(), await response[7].json(), await response[8].json()]

	})()


</script>


{#await getData}
  <pre>Loading...</pre>
  <!-- <LoadingIcon /> -->
{:then res}
  <BackgroundMap datajson={res} {dataKansenDreigingen} />
{:catch error}
  <p>An error occurred!</p>
{/await}

<style>

</style>
