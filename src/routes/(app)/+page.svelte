<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import type { ComponentStore, Issue, IssueStore, RepoStore, TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { COMPONENT_STORE_NAME, REPO_STORE_NAME, TEAM_STORE_NAME } from '$lib/stores';
	import type { HomePageData } from './+page.server';
	import HeroPageHeader from '$lib/components/navigation/HeroPageHeader.svelte';
	import ReposTable from '$lib/components/repos/ReposTable.svelte';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import ComponentsTable from '$lib/components/components/ComponentsTable.svelte';
	import TeamsTable from '$lib/components/teams/TeamsTable.svelte';

	export let data: HomePageData;

	let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
	let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
	let repoStore: RepoStore = getContext(REPO_STORE_NAME) as RepoStore;

	if (data.components) {
		componentStore.setComponents(data.components);
	}
	if (data.teams) {
		teamStore.setTeams(data.teams);
	}
	if (data.repos) {
		repoStore.setRepos(data.repos);
	}

	let tabs = ['Repositories', 'Components', 'Teams'];
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="bg-neutral-100 divide-y divide-neutral-300 h-screen flex flex-col" slot="content">
		<div class="flex-shrink">
			<HeroPageHeader
				title="Welcome back to EchoLayer!"
				description="Great to see you again. Here is a list of all your resources and repositories in our system."
			/>
		</div>

		<!-- Repositories -->
		<div class="flex-1 flex flex-col">
			<TabBar {tabs} bind:selected />

			<div class="flex-1 overflow-y-auto overflow-x-hidden">
				{#if selected === 0}
					<ReposTable rows={$repoStore.entity} />
				{:else if selected === 1}
					<ComponentsTable rows={$componentStore.entity} />
				{:else if selected === 2}
					<TeamsTable rows={$teamStore.entity} />
				{/if}
			</div>
		</div>
	</div>
</Panels>
