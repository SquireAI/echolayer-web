<script lang="ts">
	import { setContext } from 'svelte';
	import {
		ORIGIN_STORE_NAME,
		originStore,
		SELECTED_STORE_NAME,
		selectedStore,
		REPOSITORY_STORE_NAME,
		repositoryStore
	} from '$lib/stores';

	import DarkLayout from '$lib/layouts/dark/DarkLayout.svelte';

	setContext(ORIGIN_STORE_NAME, originStore);
	setContext(SELECTED_STORE_NAME, selectedStore);
	setContext(REPOSITORY_STORE_NAME, repositoryStore);
</script>

<DarkLayout>
	<slot />
</DarkLayout>
