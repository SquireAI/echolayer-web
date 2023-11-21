<script lang="ts">
	export let first = false;
</script>

<td class:first class="py-3 text-neutral-800 text-sm">
	<slot />
</td>

<style lang="scss">
	td {
		&.first {
			@apply border-l-2 border-neutral-300 pl-5;
		}
	}
</style>
