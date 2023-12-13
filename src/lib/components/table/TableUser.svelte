<script lang="ts">
	import AvatarPlaceholder from '$lib/components/users/AvatarPlaceholder.svelte';

	export let name: string | undefined;
</script>

<div
	class={`tag inline-flex flex-row items-center border bg-white/0 cursor-pointer rounded-full text-green-900 border-green-900 hover:bg-green-900/5`}
>
	<span class="tag-content h-6 inline-flex flex-row items-center">
		<span class="flex justify-center mr-1">
			<AvatarPlaceholder {name} size="24px" />
		</span>
		{#if name}
			<span class="px-2 text-xs font-medium">{name}</span>
		{/if}
	</span>
</div>

<style lang="scss">
	.tag {
		.tag-content {
			span:nth-child(2) {
				padding-left: 0;
			}
		}
	}
</style>
