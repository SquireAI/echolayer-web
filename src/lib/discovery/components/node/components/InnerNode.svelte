<script lang="ts">
	import type { GraphBaseEntity } from "$lib/types";
	import { toggleSelectedComponent } from "..";
	import OriginTag from "./OriginTag.svelte";

	export let selected: boolean;
	export let component: GraphBaseEntity;

	/**
	 * Yes, this looks silly, but we need to know when `selected` changes its value
	 * and if `selected` goes false, then the callback on the right doesn't fire 🤦
	*/
	$: selected === true || selected === false, toggleSelectedComponent(component, selected);
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