<script lang="ts">
	import type { AnchorConnectionData, GraphedEntity, TeamEntity } from '$lib/types';
	import { selectedStore } from "$lib/stores";
  import { Node } from 'svelvet';
	import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
	import InputAnchor from '../anchors/InputAnchor.svelte';
	import OutputAnchor from '../anchors/OutputAnchor.svelte';
	import { getNodeId } from '../anchors';
	import InnerNode from './components/InnerNode.svelte';
	import { getNodeSize, toggleSelectedComponent } from '.';
	import Shape from 'svelte-material-icons/Shape.svelte';

	export let component: GraphedEntity;
	export let owners: TeamEntity[] = [];
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: AnchorConnectionData[] = [];
	export let inputConnections: AnchorConnectionData[] = [];

	const numOwningTeams = owners.length;

	const id = getNodeId(component.publicId);
	const nodeSize = getNodeSize(component.type);

	$: isSelected = component.publicId === $selectedStore.entity?.publicId;
</script>

<Node id={id} on:nodeReleased={() => toggleSelectedComponent(component, true)} let:grabHandle borderRadius={10} borderColor="transparent" borderWidth={1} position={origin} dimensions={nodeSize}>
	<InnerNode component={component}>
		<div use:grabHandle class={`component__node ${isSelected ? "component__node--selected " : ""} component__entity`}>
			{#if inputConnections.length > 0}
				<div class="input__anchor">
					<InputAnchor parentId={id} anchorConnections={inputConnections} />
				</div>
			{/if}
			{#if outputConnections.length > 0}
				<div class="output__anchor">
					<OutputAnchor parentId={id} anchorConnections={outputConnections} />
				</div>
			{/if}
			<div class="component__node--inner">
				<div class="component__node--inner-wrapper component__info--wrapper">
					<div class="component__info">
						<div class="component__info--icon component__icon--fill">
							<Shape size="24" color="white" />
						</div>
						<div class="component__info--name">
							<p class="font-medium">{component.name}</p>
						</div>
					</div>
				</div>
				<div class="component__node--inner-wrapper component__members--wrapper">
					<div class="component__members">
						<div class="component__members--count">
							<AccountMultiple class="text-neutral-500" size=16/>
							<p class="font-medium">
								<span class="text-neutral-500">{numOwningTeams === 0 ? "unowned" : numOwningTeams === 1 ? owners[0].name : `${numOwningTeams} teams`}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</InnerNode>
</Node>
