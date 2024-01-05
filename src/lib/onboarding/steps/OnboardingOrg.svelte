<script lang="ts">
	import { goto } from '$app/navigation';
	import { ONBOARDING_PATH } from '$lib/utils/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		goto(`${ONBOARDING_PATH}/github`);
	});
</script>
