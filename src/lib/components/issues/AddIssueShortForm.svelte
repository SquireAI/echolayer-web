<script lang="ts">
	import TextArea from '../TextArea.svelte';
	import { page } from '$app/stores';
	import PlusIcon from 'svelte-material-icons/Plus.svelte';
	import LoadingIcon from 'svelte-material-icons/Loading.svelte';
	import Button from '../Button.svelte';
	import type { Issue } from '$lib/types';

	let string = '';
	let errorMessage = '';
	let formError = false;
	let result: Issue | undefined = undefined;
	let formSubmitted = false;
	let formCompleted = false;
	$: invalid = string.trim().length < 6;
	$: loading = formSubmitted && !formCompleted;
	$: disabled = invalid || loading || result;

	const getResult = async (context: string) => {
		if (disabled) return;
		if (!$page?.data?.services?.issueService) return;
		const service = $page.data.services.issueService;

		try {
			result = await service.createIssue(context);
		} catch (err: any) {
			formError = true;
			errorMessage = err.body?.message || 'An error occurred while creating the issue';
		}
	};

	const handleSubmit = async (input: string) => {
		if (disabled) return;
		formSubmitted = true;
		await getResult(input);
	};
</script>

<div class="flex-1 flex flex-col">
	{#if !result}
		<div class="relative flex-1 flex flex-row gap-3 items-stretch p-3">
			<div class="flex-1 flex flex-col col-span-8 md:col-span-10">
				<TextArea
					bind:value={string}
					{errorMessage}
					{formError}
					rows={4}
					placeholder="ie.: possible-nginx-h2c-smuggling Security Medium Generic Show more Conditions for Nginx H2C smuggling identified..."
				/>
			</div>
			{#key invalid}
				<div>
					<Button
						type="grey"
						handleClick={() => handleSubmit(string)}
						class={`${
							invalid ? 'text-neutral-400' : 'text-neutral-800'
						} col-span-4 md:col-span-2 h-full px-5`}
					>
						<span class="flex flex-row gap-2 justify-center items-center">
							<PlusIcon
								height="20"
								width="20"
								class={`${invalid ? 'text-neutral-400' : 'text-echolayer-blue'}`}
							/>
							Submit
						</span>
					</Button>
				</div>
			{/key}

			{#if loading}
				<div
					class="absolute top-0 left-0 w-full h-full bg-neutral-300/50 z-10 flex justify-center items-center"
				>
					<span class="animate-spin text-neutral-600"><LoadingIcon size="40px" /></span>
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex flex-row justify-center gap-3 p-3 border-t border-neutral-300">
			{result.title}
		</div>
	{/if}

	{#if formCompleted && result}
		<div class="flex flex-row justify-center gap-3 p-3 border-t border-neutral-300">
			We couldn't process this vulnerability. Please try adding more detail to help us find the
			right context.
		</div>
	{/if}
</div>
