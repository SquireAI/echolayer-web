<script lang="ts">
	import { page } from '$app/stores';
	import Bug from 'svelte-material-icons/Bug.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import TabSwitch from '$lib/components/tabs/TabSwitch.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { Issue } from '$lib/types';
	import { issueStore, componentStore } from '$lib/stores';
	import IssuesTable from '$lib/components/issues/IssuesTable.svelte';
	import CreateHeaderButton from '$lib/components/headers/CreateHeaderButton.svelte';

	if ($page.data.issues) issueStore.setIssues($page.data.issues);

	$: issues = $issueStore.entity || [];
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
	<div slot="content" class=" h-full">
		<PanelsHeader title="Issues">
			<div slot="left-action">
				<Bug size={20} />
			</div>
			<div slot="right-action">
				<CreateHeaderButton />
			</div>
		</PanelsHeader>

		<IssuesTable rows={filteredIssues} />
	</div>
</Panels>
