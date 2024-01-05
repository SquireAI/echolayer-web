<script lang="ts">
	import { overrideTailwindClasses } from 'tailwind-override';
	export let onClick: (() => void) | undefined = undefined;
	export let classes = '';
</script>

{#if onClick}
	<button
		class={overrideTailwindClasses(
			`border border-neutral-300 px-2.5 py-1 text-sm text-neutral-600 flex flex-row items-center gap-2 rounded-sm ${classes}`
		)}
		on:click={onClick}
	>
		<slot />
	</button>
{/if}
