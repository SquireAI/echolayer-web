<script lang="ts">
	import { selectedStore } from '$lib/stores';
	import { type ComponentEntity, EntityTypes, type Repo, type TeamEntity } from '$lib/types';
	import { DISCOVERY_PATH } from '$lib/utils/paths';
	import AccountGroup from 'svelte-material-icons/AccountGroup.svelte';
	import Database from 'svelte-material-icons/Database.svelte';

	export let entity: TeamEntity | ComponentEntity | Repo | undefined;
</script>

{#if entity}
	<a href={`${DISCOVERY_PATH}?origin=${entity.publicId}`} class="entity">
		{#if entity.type === EntityTypes.TEAM}
			<div>
				<span class="icon bg-echolayer-blue">
					<AccountGroup />
				</span>
			</div>
			<div class="flex-1 flex-col gap-1">
				<p class="text-sm font-medium">{entity.name}</p>
				<p class="text-xs font-medium">{entity.members?.length} members</p>
			</div>
		{:else if entity.type === EntityTypes.COMPONENT}
			<div>
				<span class="icon bg-echolayer-yellow">
					<Database />
				</span>
			</div>
			<div class="flex-1 flex-col gap-1">
				<p class="text-sm font-medium">{entity.name}</p>
			</div>
		{:else if entity.type === EntityTypes.REPO}
			<div>
				<span class="icon bg-echolayer-yellow">
					<Database />
				</span>
			</div>
			<div class="flex-1 flex-col gap-1">
				<p class="text-sm font-medium">{entity.name}</p>
			</div>
		{/if}
	</a>
{/if}

<style lang="scss">
	.entity {
		@apply w-full px-2 py-2 flex flex-row gap-2 items-center rounded-md;

		&:hover {
			@apply bg-neutral-200;
		}

		.icon {
			@apply block p-1 rounded-sm text-white;
		}
	}
</style>
