<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';
	import ReposTable from '$lib/components/repos/ReposTable.svelte';
	import type { RepoStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { REPO_STORE_NAME } from '$lib/stores';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';

	export let data: PageData;
	let repoStore: RepoStore = getContext(REPO_STORE_NAME) as RepoStore;
	if (data.repos) {
		repoStore.setRepos(data.repos);
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen">
			<PageHeader title="Repositories">
				<span slot="left-action" class="flex">
					<SourceRepositoryMultipleIcon />
				</span>
			</PageHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				<ReposTable rows={$repoStore.entity} />
			</div>
		</div>
	</div>
</Panels>
