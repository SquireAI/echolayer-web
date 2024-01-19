<script lang="ts">
	export let severity: string;
	const severityOptions = [
		{
			label: 'Low',
			value: 'low',
			letter: 'L',
			description: 'Not a priority. Keep an eye on it.',
			color: 'bg-yellow-500'
		},
		{
			label: 'Medium',
			value: 'medium',
			letter: 'M',
			description: 'Might be important to have a look at it.',
			color: 'bg-orange-500'
		},
		{
			label: 'High',
			value: 'high',
			letter: 'H',
			description: 'This is serious, please review.',
			color: 'bg-red-600'
		},
		{
			label: 'Critical',
			value: 'critical',
			letter: '!',
			description: 'Must resolved as soon as possible.',
			color: 'bg-red-800'
		}
	];

	export let onSelect = (sev: string) => {
		console.log(sev);
	};
	const handleSelect = (sev: string) => {
		severity = sev;
		onSelect(sev);
	};
</script>

<div class="options grid grid-cols-4">
	{#each severityOptions as option, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="option"
			class:selected={severity === option.value}
			on:click={() => handleSelect(option.value)}
		>
			<div
				class={`text-white font-bold rounded h-8 w-8 flex justify-center items-center mb-2 ${option.color}`}
			>
				{option.letter}
			</div>
			<p class="text-lg">{option.label}</p>
			<p>{option.description}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.options {
		.option {
			@apply flex flex-col;
			@apply p-3;
			@apply items-center justify-center text-center;

			&.selected {
				@apply ring-2 rounded;
				@apply ring-neutral-200;
			}
		}
	}
</style>
