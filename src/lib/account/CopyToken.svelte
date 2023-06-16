<script lang="ts">
	import WhiteCheckIcon from "$lib/svgs/WhiteCheckIcon.svg?component";
	import CopyIcon from "$lib/svgs/CopyIcon.svg?component";
	
	export let token: string;

	let isCopied: boolean;
	let isCopyError: boolean;
	$: isCopied = false;
	$: isCopyError = false

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
	<div class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue" on:click={copyToClipboard}>
		<WhiteCheckIcon />
		<p class="select-none text-white">Copied!</p>
	</div>
{:else if isCopyError}
	<div class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue" on:click={copyToClipboard}>
		<p class="select-none text-white">😕 Could not copy</p>
	</div>
{:else}
	<div class="flex px-2 gap-x-2 items-center cursor-pointer shrink-0 bg-echolayer-blue" on:click={copyToClipboard}>
		<CopyIcon />
		<p class="select-none text-white">Copy</p>
	</div>
{/if}