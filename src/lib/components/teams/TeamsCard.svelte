<script lang="ts">
	import Card from '../cards/Card.svelte';
	import type { Member, TeamEntity } from '$lib/types';
	import CardDetailRow from '../cards/CardDetailRow.svelte';
	import CardLabel from '../cards/CardLabel.svelte';
	import AccountGroupIcon from 'svelte-material-icons/AccountGroup.svelte';

	export let entity: TeamEntity;
	export let subtitle: string | undefined;
	let path: string | undefined = '#';

	$: isActive = (entity: TeamEntity) => entity.isActive;
</script>

<Card title={entity.name} {subtitle} href={path} icon={AccountGroupIcon}>
	<CardDetailRow key="GitHub ID">{entity.extId}</CardDetailRow>
	<CardDetailRow key="Status">
		<CardLabel label={isActive(entity) ? 'Active' : 'Inactive'} />
	</CardDetailRow>
</Card>
