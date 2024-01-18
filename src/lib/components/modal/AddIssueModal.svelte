<script lang="ts">
	import { modalStore } from '$lib/stores/modal';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import AccountMultipleIcon from 'svelte-material-icons/AccountMultiple.svelte';
	import FindContextForm from '../context/FindContextForm.svelte';
	import FindPathForm from '../context/FindPathForm.svelte';
	import AddIssueShortForm from '../issues/AddIssueShortForm.svelte';
</script>

<div>
	<div
		class="flex flex-row justify-between items-center gap-4 min-w-[500px] md:min-w-[750px] max-w-lg p-4"
	>
		<div class="flex-col">
			<h2 class="text-lg mb-3 font-normal">Add an Issue</h2>
			<p class="text-neutral-500">
				Paste your vulnerability details for augmentation and assignment to the right expert.
			</p>
		</div>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div class="border-b border-t border-neutral-300">
		<AddIssueShortForm />
	</div>
</div>
