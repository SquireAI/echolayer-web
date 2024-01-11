<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import PageHeaderBackButton from '$lib/components/headers/PageHeaderBackButton.svelte';
	import HeroPageHeader from '$lib/components/headers/HeroPageHeader.svelte';
	import BugIcon from 'svelte-material-icons/Bug.svelte';
	import BackgroundWrapper from '$lib/components/headers/BackgroundWrapper.svelte';
	import Stat from '$lib/components/cards/Stat.svelte';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import type { Repository, Location, Issue } from '$lib/types';
	import { ISSUES_PATH, REPOSITORIES_PATH } from '$lib/utils/paths';
	import LocationsTable from '$lib/components/locations/LocationsTable.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;
	let issue: Issue;
	$: issue = data.issue;
	let locations: Location[] | undefined = [];
	$: locations = data.issue.locations;

	let links = [
		{
			href: ISSUES_PATH,
			text: 'Issues'
		},
		{
			href: `${ISSUES_PATH}/${data.issue.publicId}`,
			text: `${data.issue.title}`,
			active: true
		}
	];

	let tabs = ['Files']; // ['Tags', 'Domains', 'Components'];
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		{#if issue}
			<div class="flex flex-col h-screen">
				<PageHeader title="Repositories" {links}>
					<span slot="left-action">
						<PageHeaderBackButton />
					</span>
				</PageHeader>
				<BackgroundWrapper>
					<HeroPageHeader title={issue.title}>
						<div
							slot="logo"
							class="bg-red-700 h-12 w-12 rounded-md flex flex-row items-center justify-center text-white font-sans font-bold text-3xl"
						>
							H
						</div>
					</HeroPageHeader>

					<div class="px-6 pb-8 flex flex-col gap-6">
						<div class="flex flex-row flex-wrap gap-6">
							<Stat count={`High`} primary="Severity" />
							<Stat count={9.2} primary="Score" />
						</div>

						<div class="flex flex-col gap-2">
							<h3 class="font-normal">Description:</h3>
							<p class="max-w-3xl">{issue.description}</p>
						</div>

						<div class="flex flex-row gap-3">
							<Button type="secondary" class="bg-neutral-500">Edit</Button>
							<Button type="secondary" class="bg-neutral-500">Ignore</Button>
							<Button type="primary" class="bg-echolayer">Create a ticket</Button>
							<Button type="primary" class="bg-echolayer">Find an expert</Button>
						</div>
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
