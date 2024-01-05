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
	import type { Repository, Location } from '$lib/types';
	import { REPOSITORIES_PATH } from '$lib/utils/paths';
	import LocationsTable from '$lib/components/locations/LocationsTable.svelte';

	export let data: PageData;
	let repository: Repository;
	$: repository = data.repository;
	let locations: Location[] | undefined = [];
	$: locations = data.locations;

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

	let tabs = ['Files']; // ['Tags', 'Domains', 'Components'];
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
						<Stat count={repository.commits || 0} primary="Commits" />
						<Stat count={repository.contributors || 0} primary="Contributors" />
						<Stat count={repository.files || 0} primary="Files" />
					</div>
				</BackgroundWrapper>

				<!-- Tags, Domains and Components found in repo -->
				<div
					class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit border-t border-neutral-300"
				>
					<div class="flex-1 flex flex-col">
						<!-- <TabBar {tabs} bind:selected /> -->

						<div class="flex-1 overflow-y-auto overflow-x-hidden">
							{#if selected === 0}
								<LocationsTable rows={locations} />
							{/if}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</Panels>
