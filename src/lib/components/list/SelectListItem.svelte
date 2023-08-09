<script lang="ts">
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import { goto } from '$app/navigation';

	export let label: any;
	export let disabled = false;
	export let handleClick: () => Promise<void> = async () => {
		return;
	};

	async function clickHandler(): Promise<boolean> {
		if (!disabled) await handleClick();
		return true;
	}
</script>

<div>
	<button
		on:click={clickHandler}
		class={`text-neutral-600 hover:bg-neutral-200 w-full hover:cursor-pointer rounded p-2 flex flex-row gap-3 place-items-center
		${
			disabled
				? ' hover:cursor-default cursor-default bg-transparent hover:bg-transparent text-neutral-200 pointer-events-none'
				: ''
		}`}
		aria-disabled={disabled}
	>
		<div class="bg-white rounded h-9 w-9 flex items-center justify-center">
			<slot name="icon" />
		</div>
		<div class="flex-1 text-left"><p class="text-lg font-normal leading-4">{label}</p></div>
		{#if !disabled}
			<div>
				<ArrowRight size="24" />
			</div>
		{/if}
	</button>
</div>
