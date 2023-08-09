<script lang="ts">
	import EntityListItem from '$lib/discovery/components/entities/EntityListItem.svelte';
	import Shape from 'svelte-material-icons/Shape.svelte';
	import type { GraphedEntity } from '$lib/types';

	export let entities: GraphedEntity[] = [];
</script>

{#if entities && entities.length > 0}
	<div class="component-list">
		{#each entities as entity (entity.publicId)}
			<EntityListItem {entity} />
		{/each}
	</div>
{:else}
	<div class="empty">
		<span class="text-neutral-300"><Shape size="46" /></span>
		<div class="text-center">
			<p class="text-neutral-800 font-medium">You have no entities yet.</p>
			<p class="text-neutral-500">Let's get you started.</p>
		</div>
	</div>
{/if}

<style lang="scss">
	.component-list {
		@apply h-full flex flex-col gap-4 items-stretch;
	}

	.empty {
		@apply h-full flex flex-col justify-center items-center gap-4;
	}
</style>
