<script lang="ts">
    export let value: string;
    export let errorMessage: string;

    export let formError = false;

    let classNames =
		'w-full h-8 rounded-sm focus:ring-transparent bg-neutral-50 placeholder-shown:bg-neutral-200 placeholder-shown:text-neutral-400 text-neutral-800 filled:text-neutral-800 sm:text-md border border-neutral-300 px-4';
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

<div class="w-full">
    <input
        type="text"
        id="name"
        bind:value={value}
        class={classNames}
        {...$$restProps}
    />
    {#if formError && errorMessage}
        <p class={`text-echolayer-red text-sm mt-2`}>{errorMessage}</p>
    {/if}
</div>