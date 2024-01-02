<script lang="ts">
	import Navigation from '$lib/components/navigation/Navigation.svelte';
	import Panels from '$lib/discovery/panels.svelte';
	import PanelsHeader from '$lib/discovery/components/PanelsHeader.svelte';
	import type { PageData } from './+page.server';
	import Shape from 'svelte-material-icons/Shape.svelte';
	import ComponentsTable from '$lib/components/components/ComponentsTable.svelte';
	import type { ComponentStore } from '$lib/types';
	import { getContext } from 'svelte';
	import { COMPONENT_STORE_NAME } from '$lib/stores';

	export let data: PageData;

	let componentStore: ComponentStore = getContext(COMPONENT_STORE_NAME) as ComponentStore;
	if (data.components) {
		componentStore.setComponents(data.components);
	}
</script>

<Panels>
	<Navigation slot="nav" />
	<div class="content" slot="content">
		<div class="flex flex-col h-screen">
			<PanelsHeader title="Components">
				<span slot="left-action" class="flex">
					<Shape />
				</span>
			</PanelsHeader>
			<div class="flex-1 flex-grow overflow-y-auto overflow-x-hidden min-h-fit">
				<ComponentsTable rows={$componentStore.entity} />
			</div>
		</div>
	</div>
</Panels>
