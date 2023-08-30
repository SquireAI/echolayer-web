<script lang="ts">
	import FuzzySearch from 'fuzzy-search';

	import { ERROR_TIMEOUT_MILLISECONDS } from '$lib/constants';
	import DetailsButton from '$lib/discovery/components/details/DetailsButton.svelte';
	import { getOwners } from '$lib/discovery/components/details/propertyHelpers';
	import {
		RELATIONS_SERVICE_CONTEXT_NAME,
		type RelationsService
	} from '$lib/relations/relations.service';
	import { entityDetailsStore, teamStore } from '$lib/stores';
	import { modalStore } from '$lib/stores/modal';
	import {
		EntityRelationshipNames,
		type ComponentEntity,
		type RelationEntity,
		type TeamEntity
	} from '$lib/types';
	import { getContext, onMount } from 'svelte';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import Alert from 'svelte-material-icons/Alert.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import Magnify from 'svelte-material-icons/Magnify.svelte';
	import TextInput from '../TextInput.svelte';

	$: owners = getOwners(entityDetailsStore, teamStore);
	$: currentOwner = $owners[0];

	const relationsService = getContext(RELATIONS_SERVICE_CONTEXT_NAME) as RelationsService;

	let filter = '';
	let selectedOwner: string | undefined;
	let filteredTeams: TeamEntity[] = [];
	let processing = false;
	$: filteredTeams = new FuzzySearch(
		$teamStore.entity?.filter((t) => t.publicId !== currentOwner.publicId) || [],
		['name'],
		{ caseSensitive: false }
	).search(filter);

	const handleSelect = async (ownerPublicId: string) => {
		processing = true;
		try {
			selectedOwner = ownerPublicId;
			const ownerRelation = ($entityDetailsStore.entity as ComponentEntity)?.relations?.find(
				(relation: RelationEntity) => relation.relationshipName === EntityRelationshipNames.OWNED_BY
			);
			if (ownerRelation) {
				await relationsService.updateRelations(ownerRelation?.publicId, undefined, ownerPublicId);
			} else {
				await relationsService.createRelations(
					($entityDetailsStore.entity as ComponentEntity).publicId,
					ownerPublicId,
					EntityRelationshipNames.OWNED_BY
				);
			}
			window.location.reload();
		} catch (error: any) {
			processing = false;
		}
	};
</script>

<div class="">
	<div class="flex flex-row justify-between items-center gap-4 min-w-[500px] md:min-w-[750px] p-4">
		<h2 class="text-lg">Change owner for {$entityDetailsStore.entity?.name}</h2>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div
		class={`pl-3 py-2 pr-2 h-12 border-l-4 ${
			currentOwner
				? 'border-echolayer-blue-100 bg-echolayer-blue-100/5'
				: 'border-echolayer-red bg-echolayer-red/5 text-echolayer-red-900'
		}`}
	>
		<div class="flex flex-row justify-start items-center gap-2 h-full">
			{#if currentOwner}
				<AccountMultiple size="24" />
				<span>
					{currentOwner.name} is the current owner.
				</span>
			{:else}
				<Alert size="24" />
				<span>
					There is no owner for this entity. It is strongly recommended to assign an owner.
				</span>
			{/if}
		</div>
	</div>
	<div class="border-b border-t border-neutral-300 p-3 grid grid-cols-12 align-items-start gap-3">
		<div class="flex flex-col col-span-12">
			<TextInput bind:value={filter} placeholder="Filter by name...">
				<span slot="icon" class="text-neutral-400">
					<Magnify size="16" />
				</span>
			</TextInput>
		</div>
	</div>
	<div class="bg-netural-50 p-3 border-neutral-300 border-b bg-neutral-50">
		<h3 class="text-sm text-neutral-500">Select owner...</h3>
	</div>
	<div class="overflow-y-scroll h-64 min-w-[500px] md:min-w-[750px]">
		{#if !filteredTeams.length}
			<div class="w-full items-center text-center pt-4">
				<span class="w-full text-neutral-400"> No team found </span>
			</div>
		{/if}
		{#each filteredTeams as team}
			<div class="flex flex-row justify-between items-center gap-4 p-4 w-full">
				<div class="flex flex-row justify-start items-center gap-2 h-full">
					<AccountMultiple size="24" />
					<span>
						{team.name}
					</span>
				</div>
				<DetailsButton
					label="Select"
					onClick={() => {
						handleSelect(team.publicId);
					}}
					disabled={processing}
					loading={processing && selectedOwner === team.publicId}
				>
					<span slot="icon" class="text-echolayer-blue"><Check width="20" height="20" /></span>
				</DetailsButton>
			</div>
		{/each}
	</div>
</div>
