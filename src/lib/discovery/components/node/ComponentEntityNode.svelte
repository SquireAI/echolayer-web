<script lang="ts">
	import type { GraphComponentEntity, TeamEntity } from '$lib/types';
  import { Node, type Connections } from 'svelvet';
	import TeamIcon from '../TeamIcon.svelte';
	import ComponentEntityIcon from '$lib/ComponentEntityIcon.svelte';
	import InputAnchor from '../anchors/InputAnchor.svelte';
	import OutputAnchor from '../anchors/OutputAnchor.svelte';
	import { getNodeId } from '../anchors';
	import InnerNode from './components/InnerNode.svelte';
	import { getNodeSize, toggleSelectedComponent } from '.';

	export let component: GraphComponentEntity;
	export let owners: TeamEntity[] = [];
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: Connections = [];
	export let inputConnections: Connections = [];

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
							<ComponentEntityIcon />
						</div>
						<div class="component__info--name">
							<p>{component.name}</p>
						</div>
					</div>
				</div>
				<div class="component__node--inner-wrapper component__members--wrapper">
					<div class="component__members">
						<div class="component__members--count">
							<TeamIcon />
							<p>
								<span>{`${numOwningTeams} team${numOwningTeams !== 1 ? "s": ""}`}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</InnerNode>
</Node>
