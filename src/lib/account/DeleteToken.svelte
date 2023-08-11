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
		isDeleteError = false;
		isDeleting = true;
		try {
			await deleteTokenHandler(prefix);
		} catch (error) {
			isDeleteError = true;
		} finally {
			isDeleting = false;
		}
	}
</script>

<button
	class="flex items-center shrink-0 gap-1 bg-white py-1 px-2.5 border-neutral-300 border-2"
	on:click={deleteAccessToken}
	disabled={isDeleting && !isDeleteError}
>
	<span class="text-echolayer-red"><DeleteForeverOutline size="20" /></span>
	<span class={`select-none font-medium ${isDeleteError ? 'text-echolayer-red' : 'text-black'}`}>
		{isDeleteError ? 'Retry' : isDeleting ? 'Deleting...' : 'Delete'}
	</span>
</button>
