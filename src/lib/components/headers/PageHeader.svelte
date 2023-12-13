<script lang="ts">
	import ArrowRightIcon from 'svelte-material-icons/ArrowRight.svelte';
	import MagnifyIcon from 'svelte-material-icons/Magnify.svelte';
	import PageHeaderButton from '$lib/components/headers/PageHeaderButton.svelte';
	import { modalStore } from '$lib/stores/modal';
	import FindExpert from '$lib/components/modal/FindExpert.svelte';

	export let title = 'Home';
	export let links: { text: string; href: string; active?: boolean }[] = [];

	const modalRegistry = {
		findExpert: {
			title: 'Find an expert',
			component: FindExpert
		}
	};
</script>

<div class={`panel-header`}>
	<div class="flex-1 flex flex-row items-center">
		<div><slot name="left-action" /></div>
		<div class="mx-3 flex-1 flex flex-col">
			{#if links.length > 0}
				<div class="flex flex-row items-center">
					{#each links as link}
						<a href={link.href}>
							{link.text}
						</a>
						{#if link !== links[links.length - 1]}
							<span class="mx-2">
								<ArrowRightIcon />
							</span>
						{/if}
					{/each}
				</div>
			{:else}
				<div>{title}</div>
			{/if}
		</div>
		<div>
			<slot name="right-action">
				<PageHeaderButton
					onClick={() => {
						modalStore.trigger(modalRegistry.findExpert);
					}}
				>
					<MagnifyIcon size="16px" /> Find
				</PageHeaderButton>
			</slot>
		</div>
	</div>
</div>

<style lang="scss">
	.panel-header {
		@apply flex flex-row items-center w-full text-left;
		@apply px-4 py-2.5;
		@apply leading-8 font-medium;
		@apply border-b border-neutral-300;
		@apply bg-neutral-50;
	}
</style>
