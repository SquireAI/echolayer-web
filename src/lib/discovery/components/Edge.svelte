<script lang="ts">
	import { ANCHOR_EDGE_NAMES_CONTEXT_KEY } from '$lib/types';
	import { getContext } from 'svelte';
	import { Edge } from 'svelvet';
	import { camelCaseToTitleCase } from '../utils';

	export let selected: boolean = false;
	let label = "";
	$: {
		const id: string = (getContext("edge") as any).id;
		const anchors = id.split("+");
		const context = getContext(ANCHOR_EDGE_NAMES_CONTEXT_KEY) as any;
		const rawLabel = context[anchors[0]] || context[anchors[1]] || "oh no";
		label = camelCaseToTitleCase(rawLabel);
	}
	
</script>

<style lang="scss">
	path {
		&.edge__path {
			@apply stroke-neutral-500;
			stroke-width: 3px;
			z-index: 1;
			&--selected {
				@apply stroke-echolayer-blue-100;
			}
		}
		
	}
	polyline {
		&.path__end-marker {
			@apply stroke-neutral-500;
			&--selected {
				@apply stroke-echolayer-blue-100;
			}
		}
		
	}
</style>

<Edge let:path width={3} step straight cornerRadius={4}>
	<defs>
		<!--
			Marker: this element will be bound as the end marker to the path declared below
			The polyline is creating a rounded-end chevron that will be oriented to how the end of the path is oriented.
			The points on the polyline tell the browser how to draw the line. Point 0,0 is the top-left point for an svg
			and x increments to the right and y increments down.

			The path is drawing the marker at its end by referencing the marker by its ID against the `marker-end` attribute.
		-->
		<marker markerWidth="16" markerHeight="14" refX="4" refY="5" viewBox="0 0 16 14" orient="auto" id="marker-end">
			<polyline class={`path__end-marker ${selected ? "path__end-marker--selected" : ""}`} points="0,7 3,3.5 0,0" fill="none" stroke-width="1" stroke-linecap="round" transform="matrix(1,0,0,1,1,1.5)" stroke-linejoin="round"></polyline>
		</marker>
	</defs>
	<path class={`edge__path ${selected ? "edge__path--selected" : ""}`} d={path} marker-end="url(#marker-end)" />
	<span slot="label" class={`font-sans p-1 bg-white ${selected ? "text-echolayer-blue-100" : "text-neutral-500"}`}>{label}</span>
</Edge>