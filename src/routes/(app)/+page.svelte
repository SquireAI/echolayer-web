<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import type { ComponentStore, Issue, IssueStore, RepoStore, TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { COMPONENT_STORE_NAME, REPO_STORE_NAME, TEAM_STORE_NAME } from '$lib/stores';
	import type { HomePageData } from './+page.server';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import PageHeader from '$lib/discovery/components/PageHeader.svelte';
	import CubeIcon from 'svelte-material-icons/Cube.svelte';
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

	let tabs = ['Repositories', 'Components', 'Teams', 'Members'];
	let selected = 0;

	let repoColumns = ['Repository', 'Default Branch', 'Owner', 'Knowledge Owner'];
	let componentColumns = ['Component', 'Owner', 'Knowledge Owner'];
	let teamColumns = ['Team', 'Default Branch', 'Owner', 'Knowledge Owner'];
	let memberColumns = ['Member', 'Default Branch', 'Owner', 'Knowledge Owner'];
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="bg-neutral-100 divide-y h-screen flex flex-col" slot="content">
		<div class="flex-shrink">
			<PageHeader
				title="Welcome back to EchoLayer!"
				description="Great to see you again. Here is a list of all your resources and repositories in our system."
			/>
		</div>

		<!-- Repositories -->
		<div class="flex flex-col">
			<!--			<PanelsHeader title="All entities">-->
			<!--				<span slot="left-action" class="flex">-->
			<!--					<CubeIcon />-->
			<!--				</span>-->
			<!--			</PanelsHeader>-->

			<TabBar {tabs} bind:selected />

			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				{#if selected === 0}
					<ReposTable columns={repoColumns} rows={$repoStore.entity} />
				{:else if selected === 1}
					<ComponentsTable columns={componentColumns} rows={$componentStore.entity} />
				{:else if selected === 2}
					<TeamsTable columns={teamColumns} rows={$teamStore.entity} />
				{:else if selected === 3}
					<ReposTable columns={memberColumns} rows={$repoStore.entity} />
				{/if}
			</div>
		</div>
	</div>
</Panels>
