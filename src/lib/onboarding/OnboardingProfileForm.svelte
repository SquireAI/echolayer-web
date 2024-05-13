<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';

	import OnboardingBackButton from './OnboardingBackButton.svelte';
	import OnboardingButton from './OnboardingButton.svelte';
	import OnboardingFormInput from './OnboardingFormInput.svelte';

	export let onSubmit: (values: any) => Promise<void>;

	let apiError: boolean;
	$: apiError = false;

	let loading: boolean;
	$: loading = false;

	const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

	const schema = z
		.object({
			firstName: z.string().min(1),
			lastName: z.string().min(1),
			email: z.string().email().min(1),
			phone: z.string().regex(phoneRegex, 'Invalid phone number').optional()
		})
		.strip();

	const { form, createSubmitHandler, errors } = createForm({
		extend: validator({ schema }),
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: ''
		}
	});

	const handleSubmit = createSubmitHandler({
		onSubmit: async (values: any) => {
			loading = true;
			try {
				await onSubmit(values);
			} catch (error) {
				apiError = true;
			}
		},
		onError: (errors) => {
			console.log('errors', errors);
		}
	});
</script>

<div class="flex flex-col text-center items-center gap-y-6 w-full py-1">
	<form use:form on:submit|preventDefault class="grid grid-cols-2 gap-6">
		<OnboardingFormInput errorMessage={$errors['firstName'] ? 'First name is required' : null}>
			<input type="text" name="firstName" placeholder="First name" />
		</OnboardingFormInput>

		<OnboardingFormInput errorMessage={$errors['lastName'] ? 'Last name is required' : null}>
			<input type="text" name="lastName" placeholder="Last name" />
		</OnboardingFormInput>

		<OnboardingFormInput errorMessage={$errors['email'] ? 'Work email is required' : null}>
			<input type="email" name="email" placeholder="Work email" />
		</OnboardingFormInput>

		<OnboardingFormInput errorMessage={$errors['phone'] ? 'Phone number is required' : null}>
			<input type="phone" name="phone" placeholder="Phone number" />
		</OnboardingFormInput>

		<div class="col-span-2 flex flex-row w-full gap-6">
			<div>
				<OnboardingBackButton />
			</div>
			<div class="flex-1">
				<OnboardingButton class="w-full h-11" bind:loading handleClick={handleSubmit}>
					Save profile
				</OnboardingButton>
			</div>
			{#if apiError}
				<p class={`text-echolayer-red text-sm mt-2`}>"Failed to save profile, please try again."</p>
			{/if}
		</div>
	</form>
</div>

<style lang="scss">
	input {
		@apply w-full;
	}
</style>
