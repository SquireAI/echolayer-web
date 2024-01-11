<script lang="ts">
	export let count: number | string;
	export let primary: string;
	export let secondary: string | undefined = undefined;
</script>

{#if count && primary}
	<div class="pb-2 border-b-2 border-neutral-300 w-48 flex flex-col justify-end">
		<div class="text-3xl font-semibold">{count}</div>
		<div class="text-lg font-medium">{primary}</div>
		{#if secondary}
			<div class="text-sm text-neutral-500">{secondary}</div>
		{/if}
	</div>
{/if}
