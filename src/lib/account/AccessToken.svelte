<script lang="ts">
	import { formatDistance, subDays } from 'date-fns';
	import CopyToken from './CopyToken.svelte';
	export let isNew: boolean;
	export let token: string;
	export let createdDate: string;

	function getFormattedDate(date: string): string {
		return formatDistance(subDays(new Date(date), 0), new Date(), { addSuffix: true });
	}
</script>

<div class="w-full">
	{#if isNew}
		<div class="flex w-full border border-neutral-300 h-8">
			<div class="w-16">
				<CopyToken {token} />
			</div>
			<input
				type="text"
				value={token}
				class="border-0 px-2 text-sm w-full font-mono leading-9"
				readOnly
			/>
		</div>
	{:else}
		<p class="font-mono text-neutral-500">{token}********</p>
		<span class="text-neutral-500">
			Added {getFormattedDate(createdDate)}
		</span>
	{/if}
</div>
