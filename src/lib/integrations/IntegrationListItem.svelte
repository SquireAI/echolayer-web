<script lang="ts">
	import SelectListItem from '$lib/components/list/SelectListItem.svelte';
	import type { IntegrationInstallStatus } from '$lib/types';
	import Alert from 'svelte-material-icons/Alert.svelte';
	export let label: string;
	export let installStatus: IntegrationInstallStatus = undefined;
	export let errors: string[] = [];
	export let handleInstall: () => Promise<void>;
</script>

{#if installStatus === 'connected'}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-green-200 rounded-full px-2 py-0.5">
			<p class="text-green-900 leading-5">Connected</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</SelectListItem>
{:else if installStatus === 'pending'}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-orange-200 rounded-full px-2 py-0.5">
			<p class="text-orange-900 leading-5">Pending...</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</SelectListItem>
{:else if installStatus === 'disconnected'}
	<SelectListItem {label} handleClick={handleInstall} classes="bg-echolayer-red-100">
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-echolayer-red rounded-full px-2 py-0.5">
			<p class="text-white leading-5">Disconnected</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
			{#if errors.length > 0}
				{#each errors as error}
					<p class="text-echolayer-red leading-5 font-normal">
						<Alert size="16" class="inline" />
						{error}
					</p>
				{/each}
			{/if}
		</div>
	</SelectListItem>
{:else}
	<SelectListItem {label} handleClick={handleInstall}>
		<slot name="icon" slot="icon" />
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</SelectListItem>
{/if}
