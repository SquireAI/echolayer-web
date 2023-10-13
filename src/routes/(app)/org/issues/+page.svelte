<script lang="ts">
	import { page } from '$app/stores';
	import Bug from 'svelte-material-icons/Bug.svelte';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import Check from 'svelte-material-icons/Check.svelte';
	import Shape from 'svelte-material-icons/Shape.svelte';
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import TabSwitch from '$lib/components/tabs/TabSwitch.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import { EntityRelationshipNames, type ComponentEntity, type Issue } from '$lib/types';
	import { issueStore, componentStore } from '$lib/stores';
	import DetailsButton from '$lib/discovery/components/details/DetailsButton.svelte';

	if ($page.data.issues) {
		issueStore.setIssues($page.data.issues);
	}
	if ($page.data.components) {
		componentStore.setComponents($page.data.components);
	}

	$: issues = $issueStore.entity || [];
	let tabs = ['unresolved', 'resolved'];
	let selected = 0;
	// map from issue public id to whether it's being resolved
	let resolvingMap: { [key: string]: boolean } = {};

	let filteredIssues: Issue[] = [];
	$: selected,
		(filteredIssues = issues.filter((issue: Issue) =>
			selected === 0 ? !issue.resolved : issue.resolved
		));

	const getComponentOwners = (component: ComponentEntity) => {
		return (
			$componentStore.entity
				?.find((c) => c.publicId === component.publicId)
				?.relations.filter((r) => r.relationshipName === EntityRelationshipNames.OWNED_BY)
				.map((r) => r.target) || []
		);
	};

	const updateIssue = async (issue: Issue, isResolved: boolean) => {
		resolvingMap[issue.publicId] = true;
		const updatedIssue = await $page.data.updateIssue(issue.publicId, isResolved);
		issueStore.updateIssue(updatedIssue);
		resolvingMap[issue.publicId] = false;
	};
</script>

<Panels>
	<Navigation slot="nav" />
	<div slot="content" class="bg-white h-full">
		<PanelsHeader title="EchoLayer Issues">
			<div slot="left-action">
				<Bug size={20} />
			</div>
			<div slot="right-action">
				<div class="flex-1">
					<TabSwitch {tabs} bind:selected />
				</div>
			</div>
		</PanelsHeader>

		<table class="w-full table-fixed text-neutral-500">
			<thead>
				<tr class="border-b border-neutral-300 pl-6 w-full uppercase text-left text-xs leading-6">
					<th class="pl-6 font-medium py-2">Entity</th>
					<th class="font-medium py-2">Reported By</th>
					<th class="font-medium py-2">Current Owner(s)</th>
					<th class="font-medium py-2">Issue Created</th>
					<th class="font-medium py-2">Reason</th>
					<th class="font-medium py-2">Action</th>
				</tr>
			</thead>
			<tbody>
				{#if filteredIssues.length === 0}
					<tr>
						<td colspan="6" class="text-center p-8">No issues found!</td>
					</tr>
				{:else}
					{#each filteredIssues as issue (issue.publicId)}
						<tr class="w-fullgap-2 border-l-2 border-neutral-300 group hover:bg-neutral-100">
							<td class="py-2 pl-5 flex flex-row items-center gap-4 font-medium">
								<div class="rounded-sm h-8 w-8 bg-echolayer-blue flex items-center justify-center">
									<Shape size={24} color="white" />
								</div>
								<div class="flex flex-col">
									{issue.component?.name}
									{#if issue.component}
										<span
											class={`${
												getComponentOwners(issue.component).length ? '' : 'text-echolayer-red'
											}`}
										>
											{getComponentOwners(issue.component).length || 'No'} team{`${
												getComponentOwners(issue.component).length == 1 ? '' : 's'
											}`}
										</span>
									{/if}
								</div>
							</td>
							<td class="py-2 text-neutral-800">{issue.metadata.reportedBy || 'N/A'}</td>
							<td class="py-2 text-neutral-800">
								{#if issue.component}
									{#each getComponentOwners(issue.component) as owner}
										<div class="flex flex-row gap-2 items-center">
											{#if owner.metadata.avatarUrl}
												<img
													class="w-5 h-5 rounded-full"
													alt="avatar"
													src={owner.metadata.avatarUrl}
												/>
											{:else}
												<AccountCircle size={24} class="text-neutral-500" />
											{/if}
											{owner.name}
										</div>
									{/each}
								{/if}
							</td>
							<td class="py-2">{new Date(issue.createdAt).toDateString()}</td>
							<td class="py-2">{issue.description}</td>
							<td class="py-2">
								{#if selected === 0}
									<DetailsButton
										label="Resolve"
										onClick={() => updateIssue(issue, true)}
										disabled={!!resolvingMap[issue.publicId]}
										loading={!!resolvingMap[issue.publicId]}
									>
										<span slot="icon" class="text-echolayer-blue"
											><Check width="20" height="20" /></span
										>
									</DetailsButton>
								{:else}
									<DetailsButton
										label="Reopen"
										onClick={() => updateIssue(issue, false)}
										disabled={!!resolvingMap[issue.publicId]}
										loading={!!resolvingMap[issue.publicId]}
									>
										<span slot="icon" class="text-echolayer-blue"
											><Check width="20" height="20" /></span
										>
									</DetailsButton>
								{/if}
							</td>
						</tr>
						<!-- Spacing element -->
						<tr><td class="h-1" /></tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</Panels>
