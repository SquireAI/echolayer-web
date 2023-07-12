<script lang="ts">
	import type { AnchorConnection, TeamEntity } from '$lib/types';
  import { Node, type Connections } from 'svelvet';
	import TeamIcon from './TeamIcon.svelte';
	import AvatarPlaceholder from './AvatarPlaceholder.svelte';
	import InputAnchor from './anchors/InputAnchor.svelte';
	import OutputAnchor from './anchors/OutputAnchor.svelte';

	export let component: TeamEntity;
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: Connections = [];
	export let inputConnections: Connections = [];

	const id = `node_${component.publicId}`;

	function handleClick(e: CustomEvent) {
		// TODO: set Entity in node as origin in component store
	}

</script>

<Node id={id} let:grabHandle let:selected on:nodeClicked={handleClick} borderRadius={0} borderColor="transparent" borderWidth={1} position={origin} dimensions={{ width: 240, height: 120 }}>
	<div use:grabHandle class={`component__node ${selected ? "component__node--selected" : ""}`}>
		{#if inputConnections.length > 0}
			<div class="input__anchor">
				<InputAnchor parentId={id} selected={selected} anchorConnections={inputConnections} />
			</div>
		{/if}
		{#if outputConnections.length> 0}
			<div class="output__anchor">
				<OutputAnchor parentId={id} selected={selected} anchorConnections={outputConnections} />
			</div>
		{/if}
		<div class="component__node--inner">
			<div class="component__node--inner-wrapper component__info--wrapper">
				<div class="component__info">
					<div class="component__info--icon">
						<TeamIcon />
					</div>
					<div class="component__info--name">
						<p>{component.name}</p>
					</div>
				</div>
			</div>
			<div class="component__node--inner-wrapper component__members--wrapper">
				<div class="component__members">
					<div class="component__members--count">
						<p>{`${component.members.length} member${component.members.length !== 1 ? "s" : ""}`}</p>
					</div>
					<div class="component__members--avatars">
						{#if component.members.length > 0}
							<div class="avatar__list">
								{#each component.members.slice(0, 4) as member (member.publicId)}
									<div class="avatar"><AvatarPlaceholder /></div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</Node>
