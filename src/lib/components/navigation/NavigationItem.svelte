<script lang="ts">
	import { page } from '$app/stores';

	export let name: string;
	export let href: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
	export let SolidIcon: any;
	export let OutlineIcon: any;
	export let reload: true | '' | 'off' | null | undefined = undefined;
	export let disabled = false;

	$: isActive = $page.url.pathname === href;
</script>

<div>
	<svelte:element this={href ? 'a' : 'button'} 
		class={`hover:bg-gray-200 w-full hover:cursor-pointer rounded-md p-3 
		${isActive ? 'bg-gray-200 text-neutral-800' : 'text-neutral-400'}
		${
			disabled
				? ' hover:cursor-default cursor-default bg-transparent hover:bg-transparent text-neutral-200 pointer-events-none'
				: ''
		}
		flex flex-row gap-3 place-items-center`}
		{href}
		on:click={onClick}
		data-sveltekit-reload={reload}
		aria-disabled={disabled}
	>
		{#if isActive}
			<svelte:component this={SolidIcon} width={20} height={20} />
		{:else}
			<svelte:component this={OutlineIcon} width={20} height={20} />
		{/if}
		<p class="text-md font-medium leading-4">{name}</p>
	</svelte:element>

</div>
