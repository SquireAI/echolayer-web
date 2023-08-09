<script lang="ts">
	import DeleteIcon from '$lib/svgs/DeleteIcon.svg?component';

	export let prefix: string;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;

	let isDeleting: boolean;
	let isDeleteError: boolean;
	$: isDeleting = false;
	$: isDeleteError = false;

	async function deleteAccessToken() {
		isDeleting = true;
		try {
			await deleteTokenHandler(prefix);
		} catch (error) {
			isDeleteError = true;
		}
	}
</script>

{#if isDeleting}
	<div class="flex items-center shrink-0 cursor-pointer">
		<DeleteIcon />
		<p class="text-red-700 select-none">Deleting...</p>
	</div>
{:else if isDeleteError}
	<div class="flex items-center shrink-0 cursor-pointer">
		<p class="text-red-700 select-none">Could not delete</p>
	</div>
{:else}
	<button class="flex items-center shrink-0 cursor-pointer" on:click={deleteAccessToken}>
		<DeleteIcon />
		<p class="text-red-700 select-none">Delete</p>
	</button>
{/if}
