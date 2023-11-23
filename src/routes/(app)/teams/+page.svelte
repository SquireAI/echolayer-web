<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import { onMount } from 'svelte';
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content" />
</Panels>
