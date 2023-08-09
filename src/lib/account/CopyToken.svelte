<script lang="ts">
	import WhiteCheckIcon from '$lib/svgs/WhiteCheckIcon.svg?component';
	import CopyIcon from '$lib/svgs/CopyIcon.svg?component';

	export let token: string;

	let isCopied: boolean;
	let isCopyError: boolean;
	$: isCopied = false;
	$: isCopyError = false;

	async function copyToClipboard() {
		isCopied = false;
		isCopyError = false;
		try {
			await navigator.clipboard.writeText(token);
			isCopied = true;
		} catch (error) {
			isCopyError = true;
		}
	}
</script>

{#if isCopied}
	<button
		class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue"
		on:click={copyToClipboard}
	>
		<WhiteCheckIcon />
		<p class="select-none text-white">Copied!</p>
	</button>
{:else if isCopyError}
	<button
		class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue"
		on:click={copyToClipboard}
	>
		<p class="select-none text-white">😕 Could not copy</p>
	</button>
{:else}
	<button
		class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue"
		on:click={copyToClipboard}
	>
		<CopyIcon />
		<p class="select-none text-white">Copy</p>
	</button>
{/if}
