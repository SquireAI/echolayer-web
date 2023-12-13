<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import type { PageData } from './+page.server';
	import DomainsTable from '$lib/components/domains/DomainsTable.svelte';
	import CodeArrayIcon from 'svelte-material-icons/CodeArray.svelte';

	export let data: PageData;
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<!-- Repositories -->
		<div class="flex flex-col h-screen">
			<PanelsHeader title="Domains">
				<span slot="left-action" class="flex">
					<CodeArrayIcon />
				</span>
			</PanelsHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				<DomainsTable rows={data.domains} />
			</div>
		</div>
	</div>
</Panels>
