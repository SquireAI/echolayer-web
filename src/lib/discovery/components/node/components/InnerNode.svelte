<script lang="ts">
	import type { BaseEntity } from "$lib/types";
	import { toggleSelectedComponent } from "..";

	export let selected: boolean;
	export let component: BaseEntity;

	/**
	 * Yes, this looks silly, but we need to know when `selected` changes its value
	 * and if `selected` goes false, then the callback on the right doesn't fire 🤦
	*/
	$: selected === true || selected === false, toggleSelectedComponent(component, selected);
</script>

<div class="component__node--wrapper">
	<!-- TODO: draw the origin pill in here if this node is the origin -->
	{#if component.isOrigin}
		<div class="flex absolute rounded-md bg-green-200 w-12 h-4 -top-6 left-0">ORIGIN</div>
	{/if}
	<slot />
</div>