<script>
	import PageHeaderButton from './PageHeaderButton.svelte';
	import { modalStore } from '$lib/stores/modal';
	import FindExpert from '$lib/components/modal/FindExpert.svelte';
	import MagnifyIcon from 'svelte-material-icons/Magnify.svelte';

	const modalRegistry = {
		findExpert: {
			title: 'Find an expert',
			component: FindExpert
		}
	};
</script>

<PageHeaderButton
	classes="bg-echolayer-blue-100 text-white font-medium border-0 shadow"
	onClick={() => {
		modalStore.trigger(modalRegistry.findExpert);
	}}
>
	<MagnifyIcon size="16px" /> Find
</PageHeaderButton>
