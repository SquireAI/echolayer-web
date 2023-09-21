<script lang="ts">
	import SelectListItem from '$lib/components/list/SelectListItem.svelte';
	export let label: string;
	export let isInstalled: boolean;
	export let handleInstall: () => Promise<void>;
</script>

{#if isInstalled}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-green-200 rounded-full px-2 py-0.5">
			<p class="text-green-900 leading-5">Connected</p>
		</div>
	</SelectListItem>
{:else}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
	</SelectListItem>
{/if}
