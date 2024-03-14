<script lang="ts">
	import Check from 'svelte-material-icons/Check.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import type { Organization, SelectedOrganizationStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { SELECTED_ORG_STORE_NAME } from '$lib/stores';
	import OrgIcon from './OrgIcon.svelte';

	export let organization: Organization;
	export let handleSelect: (publicId: string) => void;

	const orgStore = getContext(SELECTED_ORG_STORE_NAME) as SelectedOrganizationStore;

	$: isActive = $orgStore.entity?.publicId === organization.publicId;

	const isSingular = organization.members.length === 1;
</script>

<button on:click={() => handleSelect(organization.publicId)}>
	<span
		class={`
        flex flex-row justify-between items-center px-2 rounded-md
        ${
					isActive
						? 'bg-stone-500 bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 ease-in-out'
						: 'hover:cursor-pointer hover:bg-gray-200'
				}
    `}
	>
		<span class="flex flex-row gap-2 items-center py-2">
			<OrgIcon text={organization.publicId} />
			<div
				class={`flex flex-col items-start 
                ${isActive ? 'text-white' : 'text-stone-400'}
            `}
			>
				<p class="font-medium leading-5">
					{organization.name}
				</p>
				<p class="text-sm">
					{organization.members.length}
					{isSingular ? 'member' : 'members'}
				</p>
			</div>
		</span>
		{#if isActive}
			<Check height="24" width="24" class={'text-stone-200'} />
		{:else}
			<ArrowRight height="24" width="24" class="text-neutral-400" />
		{/if}
	</span>
</button>
