<script lang="ts">
	export let type: 'done' | 'active' | 'next' = 'next';
	export let step: object;
	export let stepIndex = 0;
</script>

<li class="relative md:flex md:flex-1">
	{#if type === 'done'}
		<!-- Completed Step -->
		<a href="/onboarding/{step.slug}" class="group flex w-full items-center">
			<span class="flex items-center px-6 py-3 text-sm font-medium">
				<span
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-stone-400 group-hover:bg-stone-200"
				>
					<svg
						class="h-6 w-6 text-stone-800"
						viewBox="0 0 24 24"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				<span class="ml-4 text-sm font-medium text-stone-400">{step.label}</span>
			</span>
		</a>
	{:else if type === 'active'}
		<!-- Current Step -->
		<a
			href="/onboarding/{step.slug}"
			class="flex items-center px-6 py-3 text-sm font-medium"
			aria-current="step"
		>
			<span
				class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 bg-stone-200 border-stone-200"
			>
				<span class="text-stone-800">{stepIndex + 1}</span>
			</span>
			<span class="ml-4 text-sm font-medium text-stone-300">{step.label}</span>
		</a>
	{:else if type === 'next'}
		<!-- Upcoming Step -->
		<a href="/onboarding/{step.slug}" class="group flex items-center">
			<span class="flex items-center px-6 py-3 text-sm font-medium">
				<span
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-stone-200 group-hover:bg-stone-100 group-hover:border-stone-100"
				>
					<span class="text-stone-400 group-hover:text-stone-800">{stepIndex + 1}</span>
				</span>
				<span class="ml-4 text-sm font-medium text-stone-400 group-hover:text-stone-100"
					>{step.label}</span
				>
			</span>
		</a>
	{/if}
</li>
