<script lang="ts">
	import OrgIcon from '$lib/org/OrgIcon.svelte';
	import { SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import type { SelectedOrganizationStore } from '$lib/types';
	import { ONBOARDING_PATH, ORGS_SELECT_PATH } from '$lib/utils/paths';
	import { getContext } from 'svelte';

	const orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;
	$: organization = $orgStore.entity;
</script>

<a href={`${ONBOARDING_PATH}${ORGS_SELECT_PATH}`}>
	<span
		class={`flex flex-row justify-between items-center px-1.5 rounded-lg bg-neutral-500 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 ease-in-out`}
	>
		<span class="flex flex-row gap-2 items-center h-9">
			{#if organization}
				<OrgIcon text={organization.publicId} />
				<p class="font-medium leading-5">
					{organization.name}
				</p>
			{:else}
				<span class="block h-6 w-6 bg-neutral-400 rounded-lg" />
				<p class="font-medium leading-5">Select organization</p>
			{/if}
		</span>
	</span>
</a>
