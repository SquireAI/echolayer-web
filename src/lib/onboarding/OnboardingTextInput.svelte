<script lang="ts">
	export let value: string;
	export let errorMessage = '';

	export let formError = false;
</script>

<div class="w-full">
	<input
		type="text"
		id="name"
		bind:value
		class={`input focus:outline-none ring-0 focus:border-neutral-500`}
		class:error={formError && errorMessage}
		{...$$restProps}
	/>
	{#if formError && errorMessage}
		<p class="text-red-500 text-sm mt-2">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	.input {
		@apply bg-neutral-700 w-full;
		@apply border border-neutral-300 border-opacity-10 rounded-md;
		@apply text-neutral-200 text-sm;
		@apply py-2 px-3;
		@apply placeholder-neutral-400 placeholder-opacity-50;

		&.error {
			@apply border-red-500 border-opacity-50;
			@apply ring-2 ring-red-500 ring-opacity-10;
		}
	}
</style>
