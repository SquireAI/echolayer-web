<script>
	import PageHeaderButton from './PageHeaderButton.svelte';
	import { modalStore } from '$lib/stores/modal';
	import PlusIcon from 'svelte-material-icons/Plus.svelte';
	import AddIssueModal from '../modal/AddIssueModal.svelte';

	const modalRegistry = {
		addIssue: {
			title: 'Add an issue',
			component: AddIssueModal
		}
	};
</script>

<PageHeaderButton
	classes="bg-echolayer-blue-100 text-white font-medium border-0"
	onClick={() => {
		modalStore.trigger(modalRegistry.addIssue);
	}}
>
	<PlusIcon size="16px" /> Add
</PageHeaderButton>
