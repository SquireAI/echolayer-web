<script lang="ts">
	import Card from '$lib/components/cards/Card.svelte';
	import CardList from '$lib/components/cards/CardList.svelte';
	import type { ComponentEntity } from '$lib/types';

	export let entities: ComponentEntity[] = [];
</script>

<CardList {entities}>
	{#each entities as entity (entity.publicId)}
		<li>
			<Card {entity} />
		</li>
	{/each}
</CardList>
