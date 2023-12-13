<script lang="ts">
	export let onClick: (() => void) | undefined = undefined;
</script>

{#if onClick}
	<button
		class="bg-neutral-100 border border-neutral-300 px-2.5 py-1 text-sm text-neutral-600 flex flex-row items-center gap-2 rounded-sm"
		on:click={onClick}
	>
		<slot />
	</button>
{/if}
