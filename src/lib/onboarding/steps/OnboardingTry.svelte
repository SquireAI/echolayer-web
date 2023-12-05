<script>
	import TextInput from '$lib/components/TextInput.svelte';
	import SourceRepository from 'svelte-material-icons/SourceRepository.svelte';
	import PartyPopper from 'svelte-material-icons/PartyPopper.svelte';
	import FolderFile from 'svelte-material-icons/FolderFile.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import repos from '$lib/data/demo-repos.json';

	let repo = '';
	let filePath = '';
	let options = repos.map((repo) => {
		return {
			label: repo.name,
			value: repo.name
		};
	});
</script>

<div class="flex-1 flex flex-row justify-center items-center">
	<div class="flex flex-col gap-6 items-center max-w-md mb-10">
		<span class="text-neutral-500"><PartyPopper size="70" slot="icon" /></span>
		<h3>Find the expert by file path.</h3>
		<div class="max-w-sm w-full text-center gap-3 flex flex-col">
			<p>Choose a repository to find your expert:</p>
			<SelectInput bind:value={repo} placeholder="Select repository" {options}>
				<span slot="icon" class="text-neutral-400">
					<SourceRepository size="16" />
				</span>
			</SelectInput>
		</div>
		<div class="max-w-sm w-full text-center gap-3 flex flex-col">
			<p>Choose a direct filepath for a folder or file to find your exact result:</p>
			<TextInput bind:value={filePath} placeholder="/src/folder_name">
				<span slot="icon" class="text-neutral-400">
					<FolderFile size="16" />
				</span>
			</TextInput>
		</div>
	</div>
</div>
