<script lang="ts">
	import Button from "$lib/components/Button.svelte";

	export let handleSubmit: (orgName: string) => Promise<void>;

	let orgName: string;
	$: orgName = "";

	let formError: boolean;
	$: formError = false;

	let apiError: boolean;
	$: apiError = false;

	async function handleNameChange(e: Event) {
		const target = e.target as HTMLInputElement;
		orgName = target.value;
	}

	async function handleKeyPress(e: KeyboardEvent): Promise<void> {
		e.key === "Enter" && await onSubmit();
	}

	async function onSubmit() {
		apiError = false;
		if (orgName.trim().length === 0) {
			formError = true;
			return;
		}
		try {
			await handleSubmit(orgName);
		} catch (error) {
			apiError = true;
		}
	}

	let classNames = "w-full h-8 rounded-sm focus:ring-transparent focus:bg-neutral-200 filled:bg-neutral-200 text-neutral-900 sm:text-md border border-gray-900 px-4";
	$: if (formError && !orgName) {
		classNames = `${classNames} bg-neutral-200 border-echolayer-red focus:border-echolayer-red`;
	} else {
		if (orgName.trim().length === 0) {
			classNames = `${classNames} bg-neutral-100`;
		} else {
			classNames = `${classNames} bg-neutral-200`;
		}
	}
</script>

<div class="flex flex-col overflow-hidden text-center items-center gap-y-6 w-full">
	<div class="w-full">
		<input type="text" id="name" placeholder="Organization name" autocomplete="organization" bind:value={orgName} on:input={handleNameChange} on:keyup={handleKeyPress} class={classNames}/>
		{#if formError && !orgName}
			<p class={`text-echolayer-red text-sm mt-2`}>Please enter an organization name.</p>
		{/if}
	</div>
	<div class="w-full">
		<Button type="primary" handleClick={onSubmit} full>
			Create organization
		</Button>
		{#if apiError}
			<p class={`text-echolayer-red text-sm mt-2`}>"Failed to create organization, please try again."</p>
		{/if}
	</div>
</div>