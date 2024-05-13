<script lang="ts">
	export let errorMessage: string | null = null;
</script>

<div class="onboarding-form-field">
	<slot />

	{#if errorMessage}
		<p class="text-red-500 text-sm mt-1 text-left italic">* {errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	.onboarding-form-field {
		:global(input) {
			@apply bg-neutral-700 w-full;
			@apply border border-neutral-300 border-opacity-10 rounded-md;
			@apply text-neutral-200 text-sm;
			@apply py-2 px-3;
			@apply placeholder-neutral-400 placeholder-opacity-50;
		}
	}
</style>
