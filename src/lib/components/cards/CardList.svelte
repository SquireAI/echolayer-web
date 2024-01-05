<script lang="ts">
	import AlertOutlineIcon from 'svelte-material-icons/AlertOutline.svelte';
	import Card from '$lib/components/cards/Card.svelte';
	import type { ComponentEntity, Repository, TeamEntity } from '$lib/types';

	export let entities: ComponentEntity[] | TeamEntity[] | Repository[] = [];
</script>

{#if entities && entities.length > 0}
	<ul class="grid grid-cols-3 gap-4">
		<slot>
			{#each entities as entity (entity.publicId)}
				<li>
					<Card {entity} />
				</li>
			{/each}
		</slot>
	</ul>
{:else}
	<div class="empty h-full flex flex-col justify-center items-center gap-4">
		<span class="text-neutral-300"><AlertOutlineIcon size="46" /></span>
		<div class="text-center">
			<p class="text-neutral-800 font-medium">You have no entities yet.</p>
			<p class="text-neutral-500">Let's get you started.</p>
		</div>
	</div>
{/if}
