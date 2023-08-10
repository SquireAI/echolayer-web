<script lang="ts">
	import DeleteForeverOutline from 'svelte-material-icons/DeleteForeverOutline.svelte';

	export let prefix: string;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;

	let isDeleting: boolean;
	let isDeleteError: boolean;
	$: isDeleting = false;
	$: isDeleteError = false;

	async function deleteAccessToken() {
		if (isDeleting) {
			return;
		}
		isDeleting = true;
		try {
			await deleteTokenHandler(prefix);
		} catch (error) {
			isDeleteError = true;
		}
	}
</script>

{#if isDeleting}
	<div class="text-red-700 flex items-center shrink-0 cursor-pointer">
		<DeleteForeverOutline />
		<span class="select-none">Deleting...</span>
	</div>
{:else if isDeleteError}
	<div class="text-red-700 flex items-center shrink-0 cursor-pointer">
		<p class="select-none">Could not delete</p>
	</div>
{:else}
	<button
		class="text-red-700 flex items-center shrink-0 cursor-pointer"
		on:click={deleteAccessToken}
	>
		<DeleteForeverOutline />
		<p class="select-none">Delete</p>
	</button>
{/if}
