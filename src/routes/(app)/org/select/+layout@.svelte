<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import DiscoveryLayout from '$lib/layouts/discovery/DiscoveryLayout.svelte';
	/**
	 * This layout is needed so that when the selected org changes,
	 * the (app) related layout(s) will re-render, calling the appropriate API's,
	 * and setting the proper context for future calls.
	 */
</script>

<DiscoveryLayout>
	<slot />
</DiscoveryLayout>
<Modal />
