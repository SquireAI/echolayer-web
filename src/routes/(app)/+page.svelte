<script lang="ts">
	import Panels from '$lib/discovery/panels.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import EchoLayerLogo from '$lib/EchoLayerLogo.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconBox from '$lib/components/IconBox.svelte';
	import Key from 'svelte-material-icons/Key.svelte';
	import HelpCircle from 'svelte-material-icons/HelpCircle.svelte';
	import ScriptTextOutline from 'svelte-material-icons/ScriptTextOutline.svelte';
	import AlertCircleIcon from 'svelte-material-icons/AlertCircle.svelte';
	import { API_KEYS_PATH, NOTION_GETTING_STARTED_DOCS, SUPPORT_URL } from '$lib/utils/paths';
	import TabTitle from '$lib/components/tabs/TabTitle.svelte';
	import TabSwitch from '$lib/components/tabs/TabSwitch.svelte';
	import type { ComponentStore, Issue, IssueStore, TeamStore } from '$lib/types';
	import { getContext } from 'svelte';
	import {
		COMPONENT_STORE_NAME,
		ISSUE_STORE_NAME,
		TEAM_STORE_NAME,
		homeTabStore
	} from '$lib/stores';
	import EntityList from '$lib/discovery/components/entities/EntityList.svelte';
	import type { HomePageData } from './+page.server';

	export let data: HomePageData;

	let tabs = ['teams', 'components'];
	let tabTitles = ['Team Catalog', 'Component Catalog'];
	let selected = 0;

	let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
	let teamStore: TeamStore = getContext(TEAM_STORE_NAME) as TeamStore;
	let issueStore: IssueStore = getContext(ISSUE_STORE_NAME) as IssueStore;

	if (data.components) {
		componentStore.setComponents(data.components);
	}
	if (data.teams) {
		teamStore.setTeams(data.teams);
	}
	if (data.issues) {
		issueStore.setIssues(data.issues);
	}
	let issues: Issue[] = [];
	$: issues = data.issues || [];
	$: hasIssues = issues && issues.length > 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div
		class="bg-neutral-100 grid grid-cols-1/3-2/3 divide-neutral-300 divide-x h-screen"
		slot="content"
	>
		<div class="flex flex-col">
			<div class="p-6 pt-16 flex flex-col items-stretch gap-8">
				<div class="flex flex-col gap-4 items-start">
					<EchoLayerLogo />
					<h1 class="text-2xl leading-6 font-medium text-neutral-800">Welcome to EchoLayer!</h1>
					<p class="text-md text-neutral-400">
						Select a team, person, or object to view connections and more information. Home lets you
						access your recent or favorite components, and some tips on how to use EchoLayer better.
					</p>
				</div>
				<div class="flex flex-col gap-4">
					<h3 class="text-md font-normal text-neutral-800">Stats</h3>
					<dl class="flex flex-col divide-y divide-neutral-200">
						{#if $teamStore.entity}
							<div class="flex flex-row items-center rounded py-3">
								<div class="flex-1 truncate text-sm font-medium text-neutral-500">Teams</div>
								<div class="text-sm font-semibold tracking-tight text-neutral-900">
									{$teamStore.entity.length}
								</div>
							</div>
						{/if}
						{#if $componentStore.entity}
							<div class="flex flex-row items-center rounded py-3">
								<div class="flex-1 truncate text-sm font-medium text-neutral-500">Components</div>
								<div class="text-sm font-semibold tracking-tight text-neutral-900">
									{$componentStore.entity.length}
								</div>
							</div>
						{/if}
						{#if issues}
							<div class="flex flex-row items-center rounded py-3">
								<div
									class="flex-1 flex flex-row items-center gap-1 truncate text-sm font-medium {hasIssues
										? 'text-echolayer-yellow-900'
										: 'text-neutral-500'}"
								>
									Issues
									{#if hasIssues}<AlertCircleIcon />{/if}
								</div>
								<div
									class="text-sm font-semibold tracking-tight {hasIssues
										? 'text-echolayer-yellow-900'
										: 'text-neutral-900'}"
								>
									{issues.length}
								</div>
							</div>
						{/if}
					</dl>
				</div>
				<div class="flex flex-col gap-4">
					<h3 class="text-md font-normal text-neutral-800">Tips</h3>
					<Button
						type="flat"
						class="leading-6 items-center justify-start gap-2"
						full={true}
						href={API_KEYS_PATH}
					>
						<IconBox Icon={Key} />
						View API keys panel
					</Button>
					<Button
						type="flat"
						class="leading-6 items-center justify-start gap-2"
						full={true}
						href={NOTION_GETTING_STARTED_DOCS}
					>
						<IconBox Icon={ScriptTextOutline} />
						Read our documentation
					</Button>
					<Button
						type="flat"
						class="leading-6 items-center justify-start gap-2"
						full={true}
						href={SUPPORT_URL}
					>
						<IconBox Icon={HelpCircle} />
						Contact support for any help
					</Button>
				</div>
			</div>
		</div>

		<div class="h-screen flex flex-col p-6 pt-24 gap-4">
			<div class="flex flex-row items-center">
				<div class="title flex-1">
					<TabTitle tabs={tabTitles} bind:selected={$homeTabStore.entity} />
				</div>
				<div class="flex-1">
					<TabSwitch {tabs} bind:selected={$homeTabStore.entity} />
				</div>
			</div>
			<div class="flex-1 flex flex-col items-stretch overflow-y-auto overflow-x-hidden min-h-fit">
				<div
					class="content-block flex-1"
					class:selected={'teams' === tabs[$homeTabStore.entity || 0]}
				>
					<EntityList entities={$teamStore.entity} />
				</div>
				<div
					class="content-block flex-1"
					class:selected={'components' === tabs[$homeTabStore.entity || 0]}
				>
					<EntityList entities={$componentStore.entity} />
				</div>
			</div>
		</div>
	</div>
</Panels>

<style lang="scss">
	.content-block {
		@apply hidden;

		&.selected {
			@apply block;
		}
	}
</style>
