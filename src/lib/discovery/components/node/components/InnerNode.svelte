<script lang="ts">
	import type { GraphBaseEntity } from "$lib/types";
	import OriginTag from "./OriginTag.svelte";

	export let component: GraphBaseEntity;

</script>

<div class="component__node--wrapper">
	<!-- TODO: draw the origin pill in here if this node is the origin -->
	{#if component.isOrigin}
		<div class="absolute -top-6 left-0">
			<OriginTag />
		</div>
	{/if}
	<slot />
</div>