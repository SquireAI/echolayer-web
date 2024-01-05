<script lang="ts">
	import AvatarPlaceholder from '$lib/components/users/AvatarPlaceholder.svelte';

	export let name: string;
	export let secondary: string | undefined = undefined;
</script>

{#if name}
	<div class="pb-2 border-b-2 border-neutral-300 w-48 flex flex-col justify-end">
		<div class="mb-1">
			<AvatarPlaceholder {name} size="40px" />
		</div>
		<div class="text-lg font-medium">{name}</div>
		{#if secondary}
			<div class="text-sm text-neutral-500">{secondary}</div>
		{/if}
	</div>
{/if}
