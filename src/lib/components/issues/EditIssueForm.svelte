<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import type { Issue } from '$lib/types';
	import BugIcon from 'svelte-material-icons/Bug.svelte';
	import Button from '../Button.svelte';
	import SeverityToggle from './SeverityToggle.svelte';
	import IssuesTable from './IssuesTable.svelte';
	import LocationsTable from '../locations/LocationsTable.svelte';

	export let issue: Issue;
	// TODO: pull from issue object to set initial
	let severity = 'low';

	const schema = z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		severity: z.string().min(1)
	});

	const { form, setData, createSubmitHandler } = createForm({
		extend: validator({ schema }),
		initialValues: issue
	});

	const handleSubmit = createSubmitHandler({
		onSubmit: (values) => console.log('Alternative onSubmit', values),
		validate: (values) => {
			console.log('Alternative validate');
			return {};
		},
		onError: (err) => {
			console.log('Alternative onError');
		}
	});

	const handleIgnore = (e) => {
		console.log('ignore');
	};

	const handleSelect = (level: string) => {
		setData('severity', level);
		severity = level;
	};
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
		<Button type="secondary" handleClick={handleIgnore}>Cancel</Button>
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
