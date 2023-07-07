<script>
	import { Edge } from 'svelvet';
</script>

<style lang="scss">
	path {
		stroke: rgb(246, 231, 20);
		stroke-width: 4px;
	}
</style>

<Edge let:path let:destroy edgeClick="{() => alert('Edge clicked')}" step>
	<path d={path} />
	<button on:click={destroy} slot="label">
		<p>Custom Label</p>
	</button>
</Edge>