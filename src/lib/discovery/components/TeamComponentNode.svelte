<script lang="ts">
	import type { TeamEntity } from '$lib/types';
  import { Node } from 'svelvet';
	import { getAvatarInitials } from '../utils';
	import TeamIcon from './TeamIcon.svelte';
	import AvatarPlaceholder from './AvatarPlaceholder.svelte';

	export let component: TeamEntity;
	export let origin: {x: number, y: number} = {x: 0, y: 0}

	function handleClick(e: CustomEvent) {
		console.log("here");
		const { detail } = e;
		console.log(detail);
		// detail.node.set.bgColor('red');
	}

</script>

<Node id={component.publicId} let:grabHandle let:selected on:nodeClicked={handleClick} borderRadius={10} borderColor="transparent" borderWidth={1} position={origin} dimensions={{ width: 240, height: 112 }}>
  <!-- <div use:grabHandle class:selected class="my-component">
    <span>{title}</span>
  </div> -->
	<div use:grabHandle class={`component__node ${selected ? "component__node--selected" : ""}`}>
		<div class="component__node--inner">
			<div class="component__info">
				<div class="component__info--icon">
					<TeamIcon />
				</div>
				<div class="component__info--name">
					<p>{component.name}</p>
				</div>
			</div>
			<div class="component__members">
				<div class="component__members--count">
					<p>{`${component.members.length} member${component.members.length !== 1 ? "s" : ""}`}</p>
				</div>
				<div class="component__members--avatars">
					{#if component.members.length > 0}
						<div class="avatar__list">
							{#each component.members as member (member.publicId)}
								<div class="avatar"><AvatarPlaceholder /></div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</Node>
