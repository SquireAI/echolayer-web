<script lang="ts">
	import { originStore } from '$lib/stores';
	import type { GraphedEntity } from '$lib/types';
	import OriginTag from './OriginTag.svelte';

	export let component: GraphedEntity;
	$: isOrigin = $originStore.entity?.publicId === component.publicId;
</script>

<div class="component__node--wrapper">
	<!-- TODO: draw the origin pill in here if this node is the origin -->
	{#if isOrigin}
		<div class="absolute -top-6 left-0">
			<OriginTag />
		</div>
	{/if}
	<slot />
</div>
