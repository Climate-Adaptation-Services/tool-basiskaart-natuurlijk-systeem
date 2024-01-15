<script>
  import BackgroundMap from '$lib/components/BackgroundMap.svelte'
  import LoadingIcon from '$lib/components/LoadingIcon.svelte'

  export let w;
  export let h;
  export let dataKansenDreigingen

  const getData = (async () => {
		const response = await Promise.all([
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaaa.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaab.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaac.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaad.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaae.json'),
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/BKNSN_2023_xaaaf.json'),
      
      fetch('https://raw.githubusercontent.com/Climate-Adaptation-Services/BNS-data/main/TOP10NL_Plaats-topo.json'),
    ])

    return [await response[0].json(), await response[1].json(), await response[2].json(), await response[3].json(), await response[4].json(), await response[5].json(), await response[6].json()]

	})()


</script>


{#await getData}
  <pre>Loading...</pre>
  <LoadingIcon />
{:then res}
  <BackgroundMap datajson={res} {dataKansenDreigingen} />
{:catch error}
  <p>An error occurred!</p>
{/await}

<style>

</style>
