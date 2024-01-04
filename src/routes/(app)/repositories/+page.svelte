<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';
	import ReposTable from '$lib/components/repositories/RepositoriesTable.svelte';
	import type { RepositoryStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { REPOSITORY_STORE_NAME } from '$lib/stores';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import CardList from '$lib/components/cards/CardList.svelte';
	import RepositoriesCard from '$lib/components/repositories/RepositoriesCard.svelte';

	export let data: PageData;
	let repositoryStore: RepositoryStore = getContext(REPOSITORY_STORE_NAME) as RepositoryStore;
	if (data.repositories) {
		repositoryStore.setRepositories(data.repositories);
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
				<div class="p-3">
					<CardList entities={$repositoryStore.entity}>
						{#each $repositoryStore.entity as entity (entity.publicId)}
							<li>
								<RepositoriesCard {entity} />
							</li>
						{/each}
					</CardList>
				</div>
			</div>
		</div>
	</div>
</Panels>
