<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import type { MemberStore, RepositoryStore, TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { REPOSITORY_STORE_NAME, TEAM_STORE_NAME } from '$lib/stores';
	import type { HomePageData } from './+page.server';
	import HeroPageHeader from '$lib/components/headers/HeroPageHeader.svelte';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import BackgroundWrapper from '$lib/components/headers/BackgroundWrapper.svelte';
	import CardList from '$lib/components/cards/CardList.svelte';
	import RepositoriesCard from '$lib/components/repositories/RepositoriesCard.svelte';
	import { MEMBER_STORE_NAME } from '$lib/stores/member-store';
	import MembersCard from '$lib/components/members/MembersCard.svelte';
	import TeamsCard from '$lib/components/teams/TeamsCard.svelte';
	import FindHeaderButton from '$lib/components/headers/FindHeaderButton.svelte';

	export let data: HomePageData;
	$: org = data.org;

	let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
	let repositoryStore: RepositoryStore = getContext(REPOSITORY_STORE_NAME) as RepositoryStore;
	let memberStore: MemberStore = getContext(MEMBER_STORE_NAME) as MemberStore;

	if (data.teams) teamStore.setTeams(data.teams);
	if (data.repositories) repositoryStore.setRepositories(data.repositories);
	if (data.members) memberStore.setMembers(data.members);

	let tabs = ['Repositories', 'Teams', 'Members']; // ['Domains', 'Components']
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="bg-neutral-100 divide-y divide-neutral-300 h-screen flex flex-col" slot="content">
		<div class="flex-shrink">
			<BackgroundWrapper>
				<div class="absolute right-4 top-3">
					<FindHeaderButton />
				</div>
				<HeroPageHeader
					title="Welcome back to EchoLayer!"
					description="Great to see you again. Here is a list of all your resources and repositories in our system."
				/>
			</BackgroundWrapper>
		</div>

		<!-- All Objects -->
		<div class="flex-1 flex flex-col">
			<TabBar {tabs} bind:selected />

			<div class="flex-1 overflow-y-auto overflow-x-hidden p-3">
				{#if selected === 0}
					<CardList entities={$repositoryStore.entity}>
						{#each $repositoryStore.entity as entity (entity.publicId)}
							<li>
								<RepositoriesCard {entity} />
							</li>
						{/each}
					</CardList>
				{:else if selected === 1}
					<CardList entities={$teamStore.entity}>
						{#each $teamStore.entity as entity (entity.publicId)}
							<li>
								<TeamsCard {entity} subtitle={org.name} />
							</li>
						{/each}
					</CardList>
				{:else if selected === 2}
					<CardList entities={$memberStore.entity}>
						{#each $memberStore.entity as entity (entity.publicId)}
							<li>
								<MembersCard {entity} subtitle={org.name} />
							</li>
						{/each}
					</CardList>
				{/if}
			</div>
		</div>
	</div>
</Panels>
