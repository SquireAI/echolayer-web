<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/headers/PageHeader.svelte';
	import PageHeaderBackButton from '$lib/components/headers/PageHeaderBackButton.svelte';
	import HeroPageHeader from '$lib/components/headers/HeroPageHeader.svelte';
	import BackgroundWrapper from '$lib/components/headers/BackgroundWrapper.svelte';
	import type { Issue } from '$lib/types';
	import { ISSUES_PATH } from '$lib/utils/paths';
	import EditIssueForm from '$lib/components/issues/EditIssueForm.svelte';

	export let data: PageData;
	let issue: Issue;
	$: issue = data.issue;

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

	let tabs = ['Files'];
	let selected = 0;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen bg-neutral-25">
			<PageHeader title="Repositories" {links}>
				<span slot="left-action">
					<PageHeaderBackButton />
				</span>
			</PageHeader>

			{#if issue}
				<div class="flex-1 flex flex-col overflow-y-auto overflow-x-hidden min-h-fit">
					<BackgroundWrapper>
						<HeroPageHeader
							title="New Issue"
							description="Make the final changes to your augmented vulnerability before it is sent to your team for resolution."
						>
							<div slot="logo" />
						</HeroPageHeader>
					</BackgroundWrapper>

					<div class="flex-1 flex-grow px-6 pb-6">
						<EditIssueForm {issue} />
					</div>
				</div>
			{/if}
		</div>
	</div>
</Panels>
