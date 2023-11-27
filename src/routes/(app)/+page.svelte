<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import type { ComponentStore, Issue, IssueStore, RepoStore, TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { COMPONENT_STORE_NAME, REPO_STORE_NAME, TEAM_STORE_NAME } from '$lib/stores';
	import EntityList from '$lib/discovery/components/entities/EntityList.svelte';
	import type { HomePageData } from './+page.server';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import PageHeader from '$lib/discovery/components/PageHeader.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';

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
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="bg-neutral-100 divide-x h-screen flex flex-col" slot="content">
		<div>
			<PageHeader
				title="Welcome back to EchoLayer!"
				description="Great to see you again. Here is a list of all your resources and repositories in our system."
			/>
		</div>

		<div class="h-screen flex-1 flex flex-col">
			<PanelsHeader title="Repositories">
				<span slot="left-action" class="flex">
					<SourceRepositoryMultipleIcon />
				</span>
			</PanelsHeader>
			<div
				class="flex-1 flex flex-col items-stretch overflow-y-auto overflow-x-hidden min-h-fit p-3"
			>
				<!-- load repos here -->
			</div>
		</div>

		<div class="flex flex-row">
			<div class="h-screen flex-1 flex flex-col border-neutral-200 border-r">
				<PanelsHeader title="Components" />
				<div
					class="flex-1 flex flex-col items-stretch overflow-y-auto overflow-x-hidden min-h-fit p-3"
				>
					<div class="content-block flex-1">
						<EntityList entities={$componentStore.entity} />
					</div>
				</div>
			</div>

			<div class="h-screen flex-1 flex flex-col">
				<PanelsHeader title="Teams" />
				<div
					class="flex-1 flex flex-col items-stretch overflow-y-auto overflow-x-hidden min-h-fit p-3"
				>
					<div class="content-block flex-1">
						<EntityList entities={$teamStore.entity} />
					</div>
				</div>
			</div>
		</div>
	</div>
</Panels>
