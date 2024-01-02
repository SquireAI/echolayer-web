<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import PageHeaderBackButton from '$lib/components/headers/PageHeaderBackButton.svelte';
	import HeroPageHeader from '$lib/components/headers/HeroPageHeader.svelte';
	import SourceRepositoryMultipleIcon from 'svelte-material-icons/SourceRepositoryMultiple.svelte';
	import BackgroundWrapper from '$lib/components/headers/BackgroundWrapper.svelte';
	import Stat from '$lib/components/cards/Stat.svelte';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import ComponentsTable from '$lib/components/components/ComponentsTable.svelte';
	import type { ComponentStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { COMPONENT_STORE_NAME } from '$lib/stores';
	import TagsTable from '$lib/components/tags/TagsTable.svelte';
	import DomainsTable from '$lib/components/domains/DomainsTable.svelte';
	import { REPOSITORIES_PATH } from '$lib/utils/paths';

	export let data: PageData;
	$: repository = data.repository;

	// let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
	// if (data.components) {
	// 	componentStore.setComponents(data.components);
	// }

	let links = [
		{
			href: REPOSITORIES_PATH,
			text: 'Repositories'
		},
		{
			href: `${REPOSITORIES_PATH}/${data.repository.owner}/${data.repository.name}`,
			text: `${data.repository.owner} / ${data.repository.name}`,
			active: true
		}
	];

	let tabs = ['Domains']; // ['Tags', 'Domains', 'Components'];
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		{#if data.repository}
			<div class="flex flex-col h-screen">
				<PageHeader title="Repositories" {links}>
					<span slot="left-action">
						<PageHeaderBackButton />
					</span>
				</PageHeader>
				<BackgroundWrapper>
					<HeroPageHeader
						title={`${repository.owner} / ${repository.name}`}
						description={repository.description}
					>
						<div
							slot="logo"
							class="bg-neutral-400 h-12 w-12 rounded-md flex flex-row items-center justify-center"
						>
							<SourceRepositoryMultipleIcon class="w-8 h-8 text-neutral-50" />
						</div>
					</HeroPageHeader>

					<div class="px-6 pb-8 flex flex-row flex-wrap gap-6">
						<Stat count={repository.commits || 0} primary="Commits" secondary="3 sources" />
						<Stat
							count={repository.contributors || 0}
							primary="Contributors"
							secondary="99 total members"
						/>
						<Stat count={repository.files || 0} primary="Files" secondary="6 last week" />
						<Stat
							count={repository.domains || 0}
							primary="Domains"
							secondary="10 total in organization"
						/>
					</div>
				</BackgroundWrapper>

				<!-- Tags, Domains and Components found in repo -->
				<div
					class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit border-t border-neutral-300"
				>
					<div class="flex-1 flex flex-col">
						<TabBar {tabs} bind:selected />

						<div class="flex-1 overflow-y-auto overflow-x-hidden">
							{#if selected === 0}
								<DomainsTable rows={data.domains} />
								<!-- {:else if selected === 1}
									<ComponentsTable rows={$componentStore.entity} /> -->
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</Panels>
