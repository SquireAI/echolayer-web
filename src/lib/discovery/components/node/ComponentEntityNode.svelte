<script lang="ts">
	import type { AnchorConnectionData, GraphComponentEntity, TeamEntity } from '$lib/types';
  import { Node } from 'svelvet';
	import AccountMultiple from "svelte-material-icons/AccountMultiple.svelte";
	import InputAnchor from '../anchors/InputAnchor.svelte';
	import OutputAnchor from '../anchors/OutputAnchor.svelte';
	import { getNodeId } from '../anchors';
	import InnerNode from './components/InnerNode.svelte';
	import { getNodeSize, toggleSelectedComponent } from '.';
	import Shape from 'svelte-material-icons/Shape.svelte';

	export let component: GraphComponentEntity;
	export let owners: TeamEntity[] = [];
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: AnchorConnectionData[] = [];
	export let inputConnections: AnchorConnectionData[] = [];

	const numOwningTeams = owners.length;

	const id = getNodeId(component.publicId);
	const nodeSize = getNodeSize(component.type);
	const isSelected = (nodeSelected: boolean): boolean => {
		return nodeSelected || component.isSelected;
	}
</script>

<Node id={id} on:nodeReleased={() => toggleSelectedComponent(component, true)} let:grabHandle let:selected borderRadius={10} borderColor="transparent" borderWidth={1} position={origin} dimensions={nodeSize}>
	<InnerNode component={component}>
		<div use:grabHandle class={`component__node ${isSelected(selected) ? "component__node--selected " : ""}component__entity`}>
			{#if inputConnections.length > 0}
				<div class="input__anchor">
					<InputAnchor parentId={id} selected={isSelected(selected)} anchorConnections={inputConnections} />
				</div>
			{/if}
			{#if outputConnections.length > 0}
				<div class="output__anchor">
					<OutputAnchor parentId={id} selected={isSelected(selected)} anchorConnections={outputConnections} />
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
