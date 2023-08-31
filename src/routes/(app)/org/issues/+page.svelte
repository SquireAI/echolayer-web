<script lang="ts">
	import { page } from '$app/stores';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import TabSwitch from '$lib/components/tabs/TabSwitch.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { Issue } from '$lib/types';

	let issues: Issue[] = [];
	$: issues = $page.data?.issues || [];

	let tabs = ['unresolved', 'resolved'];
	let selected = 0;

	let filteredIssues: Issue[] = [];
	$: selected,
		(filteredIssues = issues.filter((issue: Issue) =>
			selected === 0 ? !issue.resolved : issue.resolved
		));
</script>

<Panels>
	<Navigation slot="nav" />
	<div slot="content" class="bg-white h-full">
		<PanelsHeader title="EchoLayer Issues">
			<div slot="right-action">
				<div class="flex-1">
					<TabSwitch {tabs} bind:selected />
				</div>
			</div>
		</PanelsHeader>

		<table class="w-full table-fixed text-neutral-500">
			<thead>
				<tr class="border-b border-neutral-300 p-2 pl-6 w-full uppercase text-left font-normal">
					<th class="pl-6 font-normal">Entity</th>
					<th class="font-normal">Issue Created</th>
					<th class="font-normal">Reason</th>
				</tr>
			</thead>
			<tbody>
				{#if filteredIssues.length === 0}
					<tr>
						<td colspan="3" class="text-center p-8">No issues found!</td>
					</tr>
				{:else}
					{#each filteredIssues as issue (issue.publicId)}
						<tr class="w-fullgap-2 border-l-2 border-neutral-300 group hover:bg-neutral-100">
							<td class="py-2 pl-5">{issue.component?.name}</td>
							<td class="py-2">{new Date(issue.createdAt).toDateString()}</td>
							<td class="py-2">{issue.description}</td>
						</tr>
						<!-- Spacing element -->
						<tr><td class="h-1" /></tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</Panels>
