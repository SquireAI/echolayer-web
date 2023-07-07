<script lang="ts">
	import type { ComponentEntity, TeamEntity } from '$lib/types';
  import { Node } from 'svelvet';
	import TeamIcon from './TeamIcon.svelte';
	import AvatarPlaceholder from './AvatarPlaceholder.svelte';
	import ComponentEntityIcon from '$lib/ComponentEntityIcon.svelte';

	export let component: ComponentEntity;
	export let owners: TeamEntity[];
	export let origin: {x: number, y: number} = {x: 0, y: 0}

	const numMemberOwners = owners.reduce((acc, team) => acc += team.members.length, 0);
	const numOwningTeams = owners.length;

	function handleClick(e: CustomEvent) {
		// TODO: set Entity in node as origin in component store
	}

</script>

<Node id={component.publicId} let:grabHandle let:selected on:nodeClicked={handleClick} borderRadius={10} borderColor="transparent" borderWidth={1} position={origin} dimensions={{ width: 240, height: 124 }}>
	<div use:grabHandle class={`component__node ${selected ? "component__node--selected " : ""}component__entity`}>
		<div class="component__node--inner">
			<div class="component__info">
				<div class="component__info--icon component__icon--fill">
					<ComponentEntityIcon />
				</div>
				<div class="component__info--name">
					<p>{component.name}</p>
				</div>
			</div>
			<div class="component__members">
				<div class="component__members--count">
					<TeamIcon />
					<p>
						<span>{`${numMemberOwners} member${numMemberOwners !== 1 ? "s" : ""}`}</span>
						<span>&rarr;</span>
						<span>{`${numOwningTeams} team${numOwningTeams !== 1 ? "s": ""}`}</span>
					</p>

				</div>
			</div>
		</div>
	</div>
</Node>
