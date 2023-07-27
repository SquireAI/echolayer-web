<script lang="ts">
	import type { ComponentEntity, TeamEntity } from '$lib/types';
  import { Node, type Connections } from 'svelvet';
	import TeamIcon from './TeamIcon.svelte';
	import ComponentEntityIcon from '$lib/ComponentEntityIcon.svelte';
	import InputAnchor from './anchors/InputAnchor.svelte';
	import OutputAnchor from './anchors/OutputAnchor.svelte';
	import { getNodeId } from './anchors';
	import OriginTag from './details/OriginTag.svelte';

	export let isOrigin: boolean;
	export let component: ComponentEntity;
	export let owners: TeamEntity[] = [];
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: Connections = [];
	export let inputConnections: Connections = [];

	const numOwningTeams = owners.length;

	const id = getNodeId(component.publicId);

	function handleClick(e: CustomEvent) {
		// TODO: set Entity in node as origin in component store
	}

</script>

<Node id={id} let:grabHandle let:selected on:nodeClicked={handleClick} borderRadius={10} borderColor="transparent" borderWidth={1} position={origin} dimensions={{ width: 240, height: 108 }}>
	<div use:grabHandle class={`component__node ${selected ? "component__node--selected " : ""}component__entity`}>
		{#if inputConnections.length > 0}
			<div class="input__anchor">
				<InputAnchor parentId={id} selected={selected} anchorConnections={inputConnections} />
			</div>
		{/if}
		{#if outputConnections.length > 0}
			<div class="output__anchor">
				<OutputAnchor parentId={id} selected={selected} anchorConnections={outputConnections} />
			</div>
		{/if}
		<div class="left-0 -top-7 absolute">
			<OriginTag isHidden={!isOrigin}/>
		</div>
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
</Node>
