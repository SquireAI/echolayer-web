<script lang="ts">
	import { setContext } from 'svelte';
	import {
		SELECTED_STORE_NAME,
		selectedStore,
		REPOSITORY_STORE_NAME,
		repositoryStore
	} from '$lib/stores';

	import DarkLayout from '$lib/layouts/dark/DarkLayout.svelte';

	setContext(SELECTED_STORE_NAME, selectedStore);
	setContext(REPOSITORY_STORE_NAME, repositoryStore);
</script>

<DarkLayout>
	<slot />
</DarkLayout>
