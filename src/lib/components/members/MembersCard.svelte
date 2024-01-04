<script lang="ts">
	import Card from '../cards/Card.svelte';
	import type { Member } from '$lib/types';
	import CardDetailRow from '../cards/CardDetailRow.svelte';
	import CardLabel from '../cards/CardLabel.svelte';

	export let entity: Member;
	export let subtitle: string | undefined;
	let path: string | undefined = '#';

	$: isActive = (entity: Member) => entity.isActive;
	$: githubAvatar = (entity: Member) => `https://github.com/${entity.name}.png`;
</script>

<Card title={entity.name} {subtitle} href={path} image={githubAvatar(entity)}>
	<CardDetailRow key="GitHub ID">{entity.extId}</CardDetailRow>
	<CardDetailRow key="Status">
		<CardLabel label={isActive(entity) ? 'Active' : 'Inactive'} />
	</CardDetailRow>
</Card>
