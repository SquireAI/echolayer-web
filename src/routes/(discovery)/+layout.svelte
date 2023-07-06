<script lang="ts">
	import "$lib/discovery/styles/discovery.scss";
	import DiscoveryHeader from "$lib/discovery/components/header.svelte";
</script>

<div class="app-container">
	<nav>NAV</nav>
	<main>
    <div class="content">
			<DiscoveryHeader title="Content" />
			<slot />
		</div>
		<div class="details">
			<DiscoveryHeader title="Details" />
		</div>
	</main>
</div>