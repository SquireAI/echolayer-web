<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import AccountGroupIcon from 'svelte-material-icons/AccountGroup.svelte';
	import type { TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { TEAM_STORE_NAME } from '$lib/stores';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import CardList from '$lib/components/cards/CardList.svelte';
	import TeamsCard from '$lib/components/teams/TeamsCard.svelte';

	export let data: PageData;
	$: org = data.org;
	let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
	if (data.teams) {
		teamStore.setTeams(data.teams);
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen">
			<PageHeader title="Teams">
				<span slot="left-action" class="flex">
					<AccountGroupIcon />
				</span>
			</PageHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				<div class="p-3">
					<CardList entities={$teamStore.entity}>
						{#each $teamStore.entity as entity (entity.publicId)}
							<li>
								<TeamsCard {entity} subtitle={org.name} />
							</li>
						{/each}
					</CardList>
				</div>
			</div>
		</div>
	</div>
</Panels>
