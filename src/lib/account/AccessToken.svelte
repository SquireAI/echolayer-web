<script lang="ts">
	import CopyToken from "./CopyToken.svelte";
	export let isNew: boolean;
	export let token: string;
</script>

{#if isNew}
	<div class="sm:w-full lg:w-3/4">
		<div class="flex w-full border border-neutral-600 ">
			<input type="text" value={token} class="border-0 px-2 grow text-sm font-mono leading-9" readOnly />
			<CopyToken token={token} />
		</div>
	</div>
{:else}
	<p class="font-mono">{token}********</p>
{/if}