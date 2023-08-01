<script lang="ts">
	import { page } from '$app/stores';

	export let name: string;
	export let href: string;
	export let SolidIcon: any;
	export let OutlineIcon: any;
	export let reload: true | "" | "off" | null | undefined = undefined;

	$: isActive = $page.url.pathname === href;
</script>

<div>
	<a class={`hover:bg-gray-200 w-full hover:cursor-pointer rounded-md p-3 
		${
			isActive ? 'bg-gray-200 text-neutral-800' : 'text-neutral-400'
		}
		flex flex-row gap-3 place-items-center`} {href} data-sveltekit-reload={reload}>
		{#if isActive}
			<svelte:component this={SolidIcon} width={20} height={20} />
		{:else}
			<svelte:component this={OutlineIcon} width={20} height={20} />
		{/if}
		<p class="text-md font-medium leading-4">{name}</p>
	</a>
</div>
