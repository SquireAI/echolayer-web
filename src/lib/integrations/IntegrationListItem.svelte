<script lang="ts">
	import SelectListItem from '$lib/components/list/SelectListItem.svelte';
	import type { IntegrationInstallStatus } from '$lib/types';
	export let label: string;
	export let installStatus: IntegrationInstallStatus = undefined;
	export let handleInstall: () => Promise<void>;
</script>

{#if installStatus === 'connected'}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-green-200 rounded-full px-2 py-0.5">
			<p class="text-green-900 leading-5">Connected</p>
		</div>
	</SelectListItem>
{:else if installStatus === 'pending'}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-orange-200 rounded-full px-2 py-0.5">
			<p class="text-orange-900 leading-5">Pending...</p>
		</div>
	</SelectListItem>
{:else}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
	</SelectListItem>
{/if}
