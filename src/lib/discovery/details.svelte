<script lang="ts">
	import CollapsePanelsHeader from '$lib/discovery/components/CollapsePanelsHeader.svelte';
	import SetOriginButton from '$lib/discovery/components/SetOriginButton.svelte';
	import DetailsJson from '$lib/discovery/components/details/DetailsJson.svelte';
	import DetailsSectionHeader from '$lib/discovery/components/details/DetailsSectionHeader.svelte';
	import DetailsTitle from '$lib/discovery/components/details/DetailsTitle.svelte';
	import { entityDetailsStore, selectedStore, teamStore } from '$lib/stores';
	import { EntityTypes, type DetailProperty, type GraphedEntity } from '$lib/types';
	import DetailsList from './components/details/DetailsList.svelte';
	import MembersList from './components/details/MembersList.svelte';
	import OwnerIcon from './components/details/icons/OwnerIcon.svelte';
	import { getOwners } from './components/details/propertyHelpers';
	import ChangeOwner from '$lib/components/modal/ChangeOwner.svelte';
	import { modalStore } from '$lib/stores/modal';
	import TeamIcon from './components/details/icons/TeamIcon.svelte';
	import WarningIcon from './components/details/icons/WarningIcon.svelte';

	// Panel controls
	export let open: boolean;
	$: entity = $entityDetailsStore.entity;
	let properties: DetailProperty[] = [];

	$: entity?.publicId, (properties = []); // Clear properties when entity changes
	const owners = getOwners(entityDetailsStore, teamStore);
	$: entity?.publicId,
		(properties = $owners.length
			? $owners.map((t) => ({
					title: 'Owner',
					value: t.name,
					fieldIcon: OwnerIcon,
					itemIcon: TeamIcon,
					clickHandler: () => {
						modalStore.trigger({
							title: `Change owner for ${entity?.name}`,
							component: ChangeOwner
						});
					}
			  }))
			: [
					{
						title: 'Owner',
						value: 'No owner assigned',
						fieldIcon: OwnerIcon,
						itemIcon: WarningIcon,
						classes: 'text-echolayer-red-900 font-medium',
						clickHandler: () => {
							modalStore.trigger({
								title: `Change owner for ${entity?.name}`,
								component: ChangeOwner
							});
						}
					}
			  ]);

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

	<div class="content divide-neutral-200 divide-solid divide-y flex flex-col h-full">
		<DetailsTitle>{$entityDetailsStore.entity?.name}</DetailsTitle>
		<div class="flex flex-col gap-4">
			{#if entity?.type === EntityTypes.TEAM}
				<div>
					<MembersList members={entity.members} />
				</div>
			{/if}

			{#if entity?.type === EntityTypes.COMPONENT}
				<div>
					<DetailsSectionHeader label="Properties" />
					<DetailsList {properties} />
				</div>
			{/if}

			{#if hasMetadata($entityDetailsStore.entity)}
				<div>
					<DetailsSectionHeader label="Metadata" />
					<div class="overflow-y-scroll min-h-[120px]">
						<DetailsJson metadata={$entityDetailsStore.entity?.metadata} />
					</div>
				</div>
			{/if}
		</div>
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
