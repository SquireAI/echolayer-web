<script lang="ts">
	import SelectListItem from '$lib/components/list/SelectListItem.svelte';
	import type { IntegrationInstallStatus } from '$lib/types';
	import Alert from 'svelte-material-icons/Alert.svelte';
	import OnboardingSelectListItem from './OnboardingSelectListItem.svelte';
	export let label: string;
	export let installStatus: IntegrationInstallStatus = undefined;
	export let errors: string[] = [];
	export let disabled = false;
	export let handleInstall: () => Promise<void>;
</script>

{#if installStatus === 'connected'}
	<OnboardingSelectListItem {label} handleClick={handleInstall} {disabled}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-green-200 bg-opacity-10 rounded-full px-2 py-0.5">
			<p class="text-green-300 leading-5">Connected</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</OnboardingSelectListItem>
{:else if installStatus === 'pending'}
	<OnboardingSelectListItem {label} handleClick={handleInstall} {disabled}>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-orange-200 bg-opacity-10 rounded-full px-2 py-0.5">
			<p class="text-orange-300 leading-5">Pending...</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</OnboardingSelectListItem>
{:else if installStatus === 'disconnected'}
	<OnboardingSelectListItem
		{label}
		handleClick={handleInstall}
		classes="bg-echolayer-red-100"
		{disabled}
	>
		<slot name="icon" slot="icon" />
		<div slot="right" class="bg-red-500 bg-opacity-10 rounded-full px-2 py-0.5">
			<p class="text-stone-200 leading-5">Disconnected</p>
		</div>
		<div slot="footnote">
			<slot name="footnote" />
			{#if errors.length > 0}
				{#each errors as error}
					<p class="text-red-500 leading-5 font-normal">
						<Alert size="16" class="inline" />
						{error}
					</p>
				{/each}
			{/if}
		</div>
	</OnboardingSelectListItem>
{:else}
	<OnboardingSelectListItem {label} handleClick={handleInstall} {disabled}>
		<slot name="icon" slot="icon" />
		<div slot="footnote">
			<slot name="footnote" />
		</div>
	</OnboardingSelectListItem>
{/if}
