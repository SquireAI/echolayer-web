<script lang="ts">
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';

	export let label: any;
	export let disabled = false;
	export let classes = '';
	export let handleClick: () => Promise<void> = async () => {
		return;
	};

	async function clickHandler(): Promise<boolean> {
		if (!disabled) await handleClick();
		return true;
	}
</script>

<div class={`flex flex-col ${classes}`}>
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
		<div class="flex flex-row gap-3 place-items-center w-full">
			<div class="bg-white rounded h-9 w-9 flex items-center justify-center">
				<slot name="icon" />
			</div>
			<div class="flex-1 text-left"><p class="text-lg font-normal leading-4">{label}</p></div>
			{#if !disabled}
				{#if $$slots.right}
					<slot name="right" />
				{:else}
					<div>
						<ArrowRight size="24" />
					</div>
				{/if}
			{/if}
		</div>
	</button>
	<div class="px-2">
		<slot name="footnote" />
	</div>
</div>
