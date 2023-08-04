<script lang="ts">
	import type { AnchorConnectionData, TeamEntity } from '$lib/types';
	import { selectedStore } from "$lib/stores";
  import { Node } from 'svelvet';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import AvatarPlaceholder from '../AvatarPlaceholder.svelte';
	import InputAnchor from '../anchors/InputAnchor.svelte';
	import OutputAnchor from '../anchors/OutputAnchor.svelte';
	import { getNodeId } from '../anchors';
	import InnerNode from './components/InnerNode.svelte';
	import { getNodeSize, toggleSelectedComponent } from '.';

	export let component: TeamEntity;
	export let origin: {x: number, y: number} = {x: 0, y: 0};
	export let outputConnections: AnchorConnectionData[] = [];
	export let inputConnections: AnchorConnectionData[] = [];

	const id = getNodeId(component.publicId);
	const nodeSize = getNodeSize(component.type);

	$: isSelected = component.publicId === $selectedStore.entity?.publicId;
</script>

<Node id={id} let:grabHandle on:nodeReleased={() => toggleSelectedComponent(component, true)} borderRadius={0} borderColor="transparent" borderWidth={1} position={origin} dimensions={nodeSize}>
	<InnerNode component={component}>
		<div use:grabHandle class={`component__node ${isSelected ? "component__node--selected" : ""}`}>
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
						<div class="component__info--icon">
							<AccountMultiple size="24"  />
						</div>
						<div class="component__info--name">
							<p>{component.name}</p>
						</div>
					</div>
				</div>
				<div class="component__node--inner-wrapper component__members--wrapper">
					<div class="component__members">
						<div class="component__members--count">
							<p class="text-neutral-500">{`${component.members.length} member${component.members.length !== 1 ? "s" : ""}`}</p>
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
	</InnerNode>
</Node>
