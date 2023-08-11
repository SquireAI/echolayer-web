<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import Check from 'svelte-material-icons/Check.svelte';

	export let token: string;
	const HIDE_TOOLTIP_IN_MILLISECONDS = 1500;

	let isCopied: boolean;
	let isCopyError: boolean;
	let isCopiedTooltipVisible: boolean;
	$: isCopied = false;
	$: isCopyError = false;

	async function copyToClipboard() {
		isCopied = false;
		isCopyError = false;
		try {
			await navigator.clipboard.writeText(token);
			isCopied = true;
			showCopiedTooltip();
		} catch (error) {
			isCopyError = true;
		}
	}

	async function showCopiedTooltip() {
		isCopiedTooltipVisible = true;
		setTimeout(() => {
			isCopiedTooltipVisible = false;
		}, HIDE_TOOLTIP_IN_MILLISECONDS);
	}
</script>

<button
	class={`flex w-full h-full gap-x-2 items-center relative justify-center text-center cursor-pointer ${
		isCopied ? 'bg-echolayer-green-900' : 'bg-echolayer-blue'
	} text-white`}
	on:click={copyToClipboard}
>
	<Tooltip content="Copied!" visible={isCopiedTooltipVisible} classes="-top-10" />
	{#if isCopied}
		<Check />
	{:else}
		<span class="select-none font-medium text-sm">Copy</span>
	{/if}
</button>
