<script>
	import { Edge } from 'svelvet';
</script>

<style lang="scss">
	path {
		@apply stroke-echolayer-blue-100;
		stroke-width: 3px;
	}
</style>

<Edge let:path animate color="red" width={3} step cornerRadius={4}>
	<defs>
		<marker markerWidth="16" markerHeight="14" refX="4" refY="5" viewBox="0 0 16 14" orient="auto" id="SvgjsMarker1069">
			<polyline points="0,7 3,3.5 0,0" fill="none" stroke-width="1" stroke="hsl(227, 71%, 57%)" stroke-linecap="round" transform="matrix(1,0,0,1,1,1.5)" stroke-linejoin="round"></polyline>
		</marker>
	</defs>
	<path d={path} marker-end="url(#SvgjsMarker1069)" />
</Edge>