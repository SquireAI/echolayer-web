<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import OnboardingButton from './OnboardingButton.svelte';
	import OnboardingTextInput from './OnboardingTextInput.svelte';

	export let handleSubmit: (orgName: string) => Promise<void>;

	let errorMessage: string;
	let orgName: string;
	$: orgName = '';

	let formError: boolean;
	$: formError = false;

	let apiError: boolean;
	$: apiError = false;

	let loading: boolean;
	$: loading = false;

	async function handleNameChange(e: Event) {
		const target = e.target as HTMLInputElement;
		orgName = target.value;
	}

	async function handleKeyPress(e: Event): Promise<void> {
		(e as KeyboardEvent).key === 'Enter' && (await onSubmit());
	}

	async function onSubmit() {
		errorMessage = '';
		// Validate form
		if (orgName.trim().length === 0) {
			formError = true;
			errorMessage = 'Please enter an organization name';
			loading = false;
			return;
		}

		// One submission at a time
		if (loading) {
			return;
		}
		loading = true;

		apiError = false;
		try {
			await handleSubmit(orgName);
		} catch (error) {
			apiError = true;
			loading = false;
		}
	}

	let classNames =
		'w-full h-8 rounded-sm focus:ring-transparent focus:bg-neutral-200 filled:bg-neutral-200 text-neutral-900 sm:text-md border border-gray-900 px-4';
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
		<OnboardingTextInput
			bind:value={orgName}
			on:input={handleNameChange}
			on:keyup={handleKeyPress}
			placeholder="Organization name"
			autocomplete="organization"
			bind:errorMessage
		/>
	</div>
	<div class="w-full flex flex-col items-center">
		<OnboardingButton templates="transparent" bind:loading handleClick={onSubmit}>
			Create
		</OnboardingButton>
		{#if apiError}
			<p class={`text-echolayer-red text-sm mt-2`}>
				"Failed to create organization, please try again."
			</p>
		{/if}
	</div>
</div>
