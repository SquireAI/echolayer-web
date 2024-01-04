<script lang="ts">
	import { modalStore } from '$lib/stores/modal';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import AccountMultipleIcon from 'svelte-material-icons/AccountMultiple.svelte';
	import FindContextForm from '../context/FindContextForm.svelte';
	import FindPathForm from '../context/FindPathForm.svelte';

	let currentForm: string | null = null;
</script>

<div>
	<div
		class="flex flex-row justify-between items-center gap-4 min-w-[500px] md:min-w-[750px] max-w-lg p-4"
	>
		<div class="flex-col">
			<h2 class="text-lg mb-3 font-normal">Find an Expert</h2>
			<p class="text-neutral-500">
				Enter your vulnerability details, error details or any diagnotic information about your
				source code and EchoLayer will identify the files involved and the team members with the
				most context.
			</p>
		</div>
		<button on:click={() => modalStore.close()}>
			<CloseIcon width="20" height="20" />
		</button>
	</div>
	<div class="border-b border-t border-neutral-300">
		{#if !currentForm}
			<div class="flex flex-row flex-1 justify-around p-6">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => (currentForm = 'path')}
					class="max-w-[250px] flex flex-col cursor-pointer items-center text-center space-y-2 hover:ring rounded-lg ring-neutral-200 py-4 px-6 my-4"
				>
					<AccountMultipleIcon height="40" width="40" class="text-neutral-400" />
					<p class="text-lg">Find by Path</p>
					<p>Find an expert based on a file or folder path within your repository.</p>
				</div>

				<div class="border-r border-neutral-100" />

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => (currentForm = 'context')}
					class="max-w-[250px] flex flex-col cursor-pointer items-center text-center space-y-2 hover:ring rounded-lg ring-neutral-200 py-4 px-6 my-4"
				>
					<AccountMultipleIcon height="40" width="40" class="text-neutral-400" />
					<p class="text-lg">Find by Context</p>
					<p>
						Find an expert based context about a problem in the code such as vulnerabities, errors,
						domains, categories etc.
					</p>
				</div>
			</div>
		{:else}
			{#if currentForm == 'path'}
				<FindPathForm />
			{/if}
			{#if currentForm == 'context'}
				<FindContextForm />
			{/if}
		{/if}
	</div>
</div>
