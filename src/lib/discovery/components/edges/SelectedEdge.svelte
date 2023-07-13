<script>
	import { Edge } from 'svelvet';
</script>

<style lang="scss">
	path {
		@apply stroke-echolayer-blue-100;
		stroke-width: 3px;
		z-index: 1;
	}
	polyline {
		@apply stroke-echolayer-blue-100;
	}
</style>

<Edge let:path width={3} step cornerRadius={4}>
	<defs>
		<!--
			Marker: this element will be bound as the end marker to the path declared below
			The polyline is creating a rounded-end chevron that will be oriented to how the end of the path is oriented.
			The points on the polyline tell the browser how to draw the line. Point 0,0 is the top-left point for an svg
			and x increments to the right and y increments down.

			The path is drawing the marker at its end by referencing the marker by its ID against the `marker-end` attribute.
		-->
		<marker markerWidth="16" markerHeight="14" refX="4" refY="5" viewBox="0 0 16 14" orient="auto" id="marker-end">
			<polyline points="0,7 3,3.5 0,0" fill="none" stroke-width="1" stroke-linecap="round" transform="matrix(1,0,0,1,1,1.5)" stroke-linejoin="round"></polyline>
		</marker>
	</defs>
	<path d={path} marker-end="url(#marker-end)" />
</Edge>