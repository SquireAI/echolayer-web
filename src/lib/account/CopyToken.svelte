<script lang="ts">
	import Check from 'svelte-material-icons/Check.svelte';

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

<button
	class={`flex w-full h-full gap-x-2 items-center justify-center text-center cursor-pointer ${
		isCopied ? 'bg-echolayer-green-900' : 'bg-echolayer-blue'
	} text-white`}
	on:click={copyToClipboard}
>
	{#if isCopied}
		<Check />
	{:else}
		<span class="select-none font-medium text-sm">Copy</span>
	{/if}
</button>
