<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import type { PageData } from './+page.server';
	import PageHeader from '$lib/components/navigation/PageHeader.svelte';
	import PageHeaderBackButton from '$lib/components/navigation/PageHeaderBackButton.svelte';

	export let data: PageData;

	let links = [
		{
			href: '/repos',
			text: 'Repositories'
		},
		{
			href: `/repos/${data.repo.organization}/${data.repo.name}`,
			text: `${data.repo.organization} / ${data.repo.name}`,
			active: true
		}
	];
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<!-- Repositories -->
		<div class="flex flex-col h-screen">
			<PageHeader title="Repositories" {links}>
				<span slot="left-action" class="flex">
					<PageHeaderBackButton />
				</span>
			</PageHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit" />
		</div>
	</div>
</Panels>
