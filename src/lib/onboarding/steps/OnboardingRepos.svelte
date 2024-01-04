<script lang="ts">
	import { goto } from '$app/navigation';
	import CardList from '$lib/components/cards/CardList.svelte';
	import RepositoriesCard from '$lib/components/repositories/RepositoriesCard.svelte';
	import { REPOSITORY_STORE_NAME } from '$lib/stores';
	import type { Repository, RepositoryStore } from '$lib/types';
	import { ONBOARDING_PATH } from '$lib/utils/paths';
	import { getContext } from 'svelte';

	let columns = ['Repository', 'Default Branch', 'Owner', 'Expert', 'Progress'];

	let repositoryStore: RepositoryStore = getContext(REPOSITORY_STORE_NAME) as RepositoryStore;

	// Check if repos have been scanned and is ready to move to next steps
	const repositoryScanComplete = (repositories: Repository[]) => {
		return repositories.every((repository) => repository.status === 'indexed');
	};

	let isReady: boolean;
	$: isReady = $repositoryStore.entity ? repositoryScanComplete($repositoryStore.entity) : false;
	$: if (isReady) goto(`${ONBOARDING_PATH}/try`);
</script>

<div class="flex-1 px-6 py-6">
	<CardList entities={$repositoryStore.entity}>
		{#each $repositoryStore.entity as entity (entity.publicId)}
			<li>
				<RepositoriesCard {entity} href="#" />
			</li>
		{/each}
	</CardList>
</div>
