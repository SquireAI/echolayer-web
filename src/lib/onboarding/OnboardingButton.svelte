<script lang="ts">
	import { goto } from '$app/navigation';
	import { overrideTailwindClasses } from 'tailwind-override';
	import type { HTMLAttributeAnchorTarget } from 'svelte/elements';
	import Loader from '$lib/components/Loader.svelte';

	export let href: string | undefined = undefined;
	export let templates = '';
	let clazz = '';
	export { clazz as class };
	export let disabled = false;
	export let loading: boolean | undefined = undefined;
	export let target: HTMLAttributeAnchorTarget = '_self';

	export let handleClick: () => Promise<void> = async () => {
		return;
	};

	async function clickHandler(): Promise<boolean> {
		if (!disabled && !loading) {
			// Call parent
			await handleClick();
			if (href && target !== '_blank') await goto(href);
		}
		return true;
	}

	$: buttonClasses = overrideTailwindClasses(
		`button ${templates} ${clazz} ${disabled ? 'cursor-not-allowed bg-neutral-500' : ''}`
	);
</script>

{#if !href}
	<button on:click={clickHandler} class={buttonClasses} {disabled}>
		{#if loading}
			<Loader classes="mr-2" />
			Loading
		{:else}
			<slot />
		{/if}
	</button>
{:else}
	<a
		{href}
		data-sveltekit-preload-data="hover"
		on:click={clickHandler}
		class={buttonClasses}
		{target}
	>
		<slot />
	</a>
{/if}

<style lang="scss">
	.button {
		@apply flex flex-row items-center justify-center;
		@apply bg-white text-black rounded-lg px-6 py-3 mb-1 shadow;
		@apply text-sm font-semibold text-center;
		@apply transition-all duration-300 ease-in-out;

		&.light {
			@apply bg-gradient-to-br from-neutral-50 to-neutral-500;
		}

		&.small {
			@apply px-3 py-1;
			@apply text-xs;
		}

		&.dark {
			@apply bg-gradient-to-br from-neutral-800 to-neutral-900;
			@apply text-white;
			@apply ring-2 ring-neutral-100 ring-opacity-20;
		}

		&.transparent {
			@apply bg-neutral-500;
			@apply bg-opacity-10;
			@apply text-white;
			@apply ring-1 ring-neutral-100 ring-opacity-20;
			@apply backdrop-blur;

			&:hover {
				@apply bg-opacity-30;
				@apply ring-opacity-20;
			}
		}

		&.highlight {
			@apply ring-4 ring-neutral-500 ring-opacity-20;

			&:hover {
				@apply ring-4 ring-neutral-500 ring-opacity-50;
			}
		}

		&.borderless {
			@apply border-0 ring-0;
		}

		&.pill {
			@apply rounded-full;
		}

		// &.hasIcon {
		//     .icon {
		//         @apply transition-all duration-300 ease-in-out;
		//         @apply pl-1;
		//         @apply pr-1;
		//     }

		//     &:hover {
		//         .icon {
		//             @apply pl-2;
		//             @apply pr-0;
		//         }
		//     }
		// }
	}
</style>
