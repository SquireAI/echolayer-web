<script lang="ts">
	import CollapsePanelsHeader from '$lib/discovery/components/CollapsePanelsHeader.svelte';
	import SetOriginButton from '$lib/discovery/components/SetOriginButton.svelte';
	import DetailsJson from '$lib/discovery/components/details/DetailsJson.svelte';
	import DetailsSectionHeader from '$lib/discovery/components/details/DetailsSectionHeader.svelte';
	import DetailsTitle from '$lib/discovery/components/details/DetailsTitle.svelte';
	import { entityDetailsStore, entityRelationshipStore, selectedStore, teamStore } from '$lib/stores';
	import { EntityTypes, type DetailProperty, type GraphedEntity } from '$lib/types';
	import { onMount } from 'svelte';
	import DetailsList from './components/details/DetailsList.svelte';
	import MembersList from './components/details/MembersList.svelte';
	import OwnerIcon from './components/details/icons/OwnerIcon.svelte';
	import { getTeamOwners } from './components/details/propertyHelpers';

	// Panel controls
	export let open: boolean;
	$: entity = $entityDetailsStore.entity;
	let properties: DetailProperty[] = [];

	$: (entity?.publicId, properties = []) // Clear properties when entity changes
	const owners = getTeamOwners(entityDetailsStore, teamStore, entityRelationshipStore);
	$: (
		entity?.publicId,
		properties = ($owners || []).map(t => ({ title: "Owner", value: t.name, icon: OwnerIcon })) || []
	);

	const hasMetadata = (entity?: GraphedEntity) => {
		if (!entity || !entity.metadata) return false;
		if (Array.isArray(entity.metadata) && !entity.metadata.length) return false;
		if (Object.keys(entity.metadata).length === 0) return false;
		return true;
	};
</script>

<div class="details-panel" class:open>
	<div class="header">
		<CollapsePanelsHeader title="Details" bind:open disabled={!$selectedStore.entity} />
	</div>

	<div class="content divide-neutral-200 divide-solid divide-y flex-1 flex flex-col">
		<DetailsTitle>{$entityDetailsStore.entity?.name}</DetailsTitle>
		{#if entity?.type === EntityTypes.TEAM}
			<MembersList members={entity.members} />
		{/if}

		{#if entity?.type === EntityTypes.COMPONENT}
			<DetailsSectionHeader label="Properties" />
			<DetailsList 
				properties={properties}
			/>
		{/if}

		{#if hasMetadata($entityDetailsStore.entity)}
			<DetailsSectionHeader label="Metadata" />
			<div class="flex-1 overflow-y-scroll basis-0">
				<DetailsJson metadata={$entityDetailsStore.entity?.metadata} />
			</div>
		{/if}
	</div>

	<SetOriginButton {open} />
</div>

<style lang="scss">
	.details-panel {
		@apply w-1/2 h-full top-0;
		@apply flex flex-col absolute;
		left: calc(100% - 120px);
		transition: left 0.1s ease-in-out;
		@apply pointer-events-none;

		.header {
			@apply border-l;
			@apply border-neutral-300;
			@apply pointer-events-auto;
		}

		.content {
			@apply bg-white;
			@apply border-l;
			@apply border-neutral-300;
			@apply invisible;
		}

		&.open {
			left: 50%;

			.content {
				@apply visible;
				@apply pointer-events-auto;
			}
		}
	}
</style>
