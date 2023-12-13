<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import PageHeaderBackButton from '$lib/components/headers/PageHeaderBackButton.svelte';
	import HeroPageHeader from '$lib/components/headers/HeroPageHeader.svelte';
	import BackgroundWrapper from '$lib/components/headers/BackgroundWrapper.svelte';
	import Stat from '$lib/components/cards/Stat.svelte';
	import TabBar from '$lib/components/tabs/TabBar.svelte';
	import CodeArrayIcon from 'svelte-material-icons/CodeArray.svelte';
	import FilesTable from '$lib/components/files/FilesTable.svelte';
	import ReposTable from '$lib/components/repos/ReposTable.svelte';
	import UserStat from '$lib/components/cards/UserStat.svelte';

	export let data: PageData;

	let links = [
		{
			href: '/domains',
			text: 'Domains'
		},
		{
			href: `/domains/${data.domain.id}`,
			text: `${data.domain.name}`,
			active: true
		}
	];

	let tabs = ['Files', 'Repositories'];
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen">
			<PageHeader title="Repositories" {links}>
				<span slot="left-action">
					<PageHeaderBackButton />
				</span>
			</PageHeader>
			<BackgroundWrapper>
				<HeroPageHeader title={`${data.domain.name}`} description={`${data.domain.description}`}>
					<div
						slot="logo"
						class="bg-echolayer-green-100 h-12 w-12 rounded-md flex flex-row items-center justify-center"
					>
						<CodeArrayIcon color="white" class="w-8 h-8" />
					</div>
				</HeroPageHeader>

				<div class="px-6 pb-8 flex flex-row flex-wrap gap-6">
					<Stat count={123} primary="Commits" secondary="3 sources" />
					<Stat count={16} primary="Contributors" secondary="99 total members" />
					<Stat count={216} primary="Files" secondary="6 last week" />
					<UserStat name="Saumil Patel" secondary="Expert Identified" />
					<UserStat name="@core-team" secondary="Expert Team Identified" />
				</div>
			</BackgroundWrapper>

			<!-- Files, Components and Repositories found in domain -->
			<div
				class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit border-t border-neutral-300"
			>
				<div class="flex-1 flex flex-col">
					<TabBar {tabs} bind:selected />

					<div class="flex-1 overflow-y-auto overflow-x-hidden">
						{#if selected === 0}
							<FilesTable rows={data.files} />
						{:else if selected === 1}
							<ReposTable rows={data.repos} />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</Panels>
