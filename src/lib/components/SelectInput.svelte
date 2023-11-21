<script lang="ts">
	import MenuDown from 'svelte-material-icons/MenuDown.svelte';

	interface Option {
		value: string;
		label: string;
	}

	export let value: string;
	export let placeholder = 'Select...';
	export let options: Option[] = [];
	export let errorMessage = '';

	export let formError = false;

	let classNames = `form-select w-full rounded-sm py-1.5 focus:ring-transparent bg-neutral-50 placeholder-shown:bg-neutral-50 placeholder-shown:text-neutral-400 text-neutral-500 filled:text-neutral-800 sm:text-sm border border-neutral-300 px-2 ${
		$$slots['icon'] ? 'pl-9' : ''
	}`;
	$: if (formError && errorMessage) {
		classNames = `${classNames} bg-neutral-200 border-echolayer-red focus:border-echolayer-red`;
	} else {
		if (value.trim().length === 0) {
			classNames = `${classNames} bg-neutral-100`;
		} else {
			classNames = `${classNames} bg-neutral-200`;
		}
	}
</script>

<div class="w-full relative">
	<div class="absolute left-3 top-1/2 transform -translate-y-1/2">
		<slot name="icon" />
	</div>
	<select name="name" bind:value class={classNames} {...$$restProps}>
		<option value="" disabled selected>{placeholder}</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	<div class="absolute right-1 top-1/2 transform -translate-y-1/2 text-neutral-500">
		<MenuDown size="18" />
	</div>
	{#if formError && errorMessage}
		<p class="text-echolayer-red text-sm mt-2">{errorMessage}</p>
	{/if}
</div>

<style lang="scss">
	select {
		-moz-appearance: none;
		-webkit-appearance: none;

		option[value=''][disabled] {
			display: none;
		}
	}
</style>
