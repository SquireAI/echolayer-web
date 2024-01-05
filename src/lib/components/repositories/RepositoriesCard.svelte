<script lang="ts">
	import Card from '../cards/Card.svelte';
	import type { Repository } from '$lib/types';
	import { REPOSITORIES_PATH } from '$lib/utils/paths';
	import CardDetailRow from '../cards/CardDetailRow.svelte';
	import CardLabel from '../cards/CardLabel.svelte';
	import { formatDistance, subDays } from 'date-fns';

	export let entity: Repository;
	export let href: string | undefined;
	let path: string | undefined;
	$: path = href ? href : `${REPOSITORIES_PATH}/${entity.owner}/${entity.name}`;
	$: githubAvatar = (entity: Repository) => `https://github.com/${entity.owner}.png`;
	$: lastIndex = (entity: Repository) =>
		formatDistance(subDays(new Date(entity.updatedAt), 0), new Date(), { addSuffix: true });
</script>

<Card title={entity.name} subtitle={entity.owner} href={path} image={githubAvatar(entity)}>
	<CardDetailRow key="Last Index">{lastIndex(entity)}</CardDetailRow>
	<CardDetailRow key="Status">
		<CardLabel label="Indexed" />
	</CardDetailRow>
</Card>
