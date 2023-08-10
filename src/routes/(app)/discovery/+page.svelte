<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Canvas from '$lib/discovery/canvas.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Details from '$lib/discovery/details.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import {
		componentStore,
		entityRelationshipStore,
		originStore,
		selectedStore,
		teamStore
	} from '$lib/stores';
	import type { DiscoveryPage } from './+page';
	import { writable } from 'svelte/store';
	import { updateQueryParameters } from '$lib/discovery/utils';
	import SitemapOutline from 'svelte-material-icons/SitemapOutline.svelte';
	import type { RelationGraphEntity } from '$lib/types';

	export let data: DiscoveryPage;

	const { teams, origin, selected, components, relations, getRelationsGraph } = data;
	const isDetailsPanelOpen = writable<boolean>(false);

	/**
	 * Filters out relations invilving members
	 * @param relations
	 */
	function getNonMemberRelations(relations: RelationGraphEntity[]) {
		const componentIds = components?.map((component) => component.publicId) || [];
		const teamIds = teams?.map((team) => team.publicId) || [];
		const idArray = componentIds.concat(teamIds);
		const graphedIds = new Set<string>(idArray);
		return relations.filter((relation) => {
			return graphedIds.has(relation.sourcePublicId) && graphedIds.has(relation.targetPublicId);
		});
	}

	/**
	 * Gets the new downstream relations for the next selected origin.
	 * Replaces the relations currently set in the entity relations store.
	 */
	async function updateRelationsOnOriginChange() {
		const nextOrigin = $originStore.entity;
		if (!nextOrigin) {
			return;
		}
		const relations = await getRelationsGraph(nextOrigin);
		entityRelationshipStore.setEntityRelationships(getNonMemberRelations(relations));
	}

	// when originStore updates, fetch the new downstream relations
	$: $originStore, updateRelationsOnOriginChange();

	// if the origin or selected node update in our stores, we update the query params in the URL in the user's browser
	$: $originStore || $selectedStore,
		updateQueryParameters({
			originPublicId: $originStore.entity?.publicId,
			selectedPublicId: $selectedStore.entity?.publicId
		});

	// Toggle the details panel open / closed if there's a node selected or not, respectively
	$: $selectedStore.entity, isDetailsPanelOpen.set($selectedStore.entity !== undefined);

	// Set pageload defaults in stores
	if (components) {
		componentStore.setComponents(components);
	}
	if (teams) {
		teamStore.setTeams(teams);
	}
	if (origin) {
		originStore.setEntity(origin);
	}
	if (selected) {
		selectedStore.setEntity(selected);
	} else {
		selectedStore.setEntity(origin);
	}
	if (relations) {
		entityRelationshipStore.setEntityRelationships(getNonMemberRelations(relations));
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<PanelsHeader title="Connections">
			<span slot="left-action" class="flex">
				<SitemapOutline />
			</span>
		</PanelsHeader>
		{#if $originStore.entity && $entityRelationshipStore.entity}
			<div class="canvas">
				<Canvas
					components={$componentStore.entity}
					relations={$entityRelationshipStore.entity}
					teams={$teamStore.entity}
					origin={$originStore.entity}
				/>
			</div>
		{/if}

		<Details slot="details" open={$isDetailsPanelOpen} />
	</div>
</Panels>

<style lang="scss">
	.canvas {
		height: calc(100vh - 55px);
		@apply bg-white;
	}
</style>
