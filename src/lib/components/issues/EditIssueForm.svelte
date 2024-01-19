<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import type { Issue } from '$lib/types';
	import Button from '../Button.svelte';
	import SeverityToggle from './SeverityToggle.svelte';
	import LocationsTable from '../locations/LocationsTable.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { ISSUES_PATH } from '$lib/utils/paths';
	import { page } from '$app/stores';

	const {
		services: { issueService }
	} = $page.data;
	export let issue: Issue;
	let severity: string;

	const onSubmit = async (values: any) => {
		const cleanedValues = schema.parse(values);
		const res = await issueService.updateIssue(cleanedValues);
		if (res) goto(`${ISSUES_PATH}/${issue.publicId}`);
	};

	const schema = z
		.object({
			publicId: z.string().min(1),
			title: z.string().min(1),
			description: z.string().min(1),
			severity: z.string().min(1)
		})
		.strip();

	const { form, setData, createSubmitHandler } = createForm({
		extend: validator({ schema }),
		initialValues: issue
	});

	const handleSubmit = createSubmitHandler({
		onSubmit,
		validate: (values) => {
			console.log(values);
			console.log('Alternative validate');
			return {};
		},
		onError: (err) => {
			console.log('Alternative onError');
		}
	});

	const handleCancel = async () => goto(ISSUES_PATH);

	const handleSelect = (level: string) => {
		setData('severity', level);
		severity = level;
	};

	onMount(() => {
		// Set default severity
		handleSelect(issue?.severity ? issue.severity : 'low');
	});
</script>

<form use:form class="flex flex-col justify-start gap-4">
	<div class="field">
		<input type="text" name="title" />
	</div>
	<div class="field">
		<SeverityToggle bind:severity onSelect={handleSelect} />
	</div>
	<div class="field">
		<textarea name="description" rows="12" />
	</div>
	<div class="field">
		<h3>Relevant Files</h3>
		<LocationsTable rows={issue.issueLocations} />
	</div>
	<div class="field flex flex-row gap-2 justify-end">
		<Button type="secondary" handleClick={handleCancel}>Cancel</Button>
		<Button type="primary" handleClick={handleSubmit}>Save</Button>
	</div>
</form>

<style lang="scss">
	form {
		.field {
			@apply max-w-3xl;

			input,
			textarea {
				border: 1px solid #ccc;
				@apply py-3 px-4;
				@apply rounded;
				@apply w-full;
			}
		}
	}
</style>
