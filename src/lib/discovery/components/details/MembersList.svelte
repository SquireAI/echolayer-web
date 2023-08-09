<script lang="ts">
	import type { Member } from '$lib/types';
	import DetailsSection from './DetailsSection.svelte';

	export let members: Member[] = [];
</script>

<DetailsSection label="Members">
	<div slot="content" class="list">
		{#each members as member}
			<span class="row">{member.name}</span>
		{/each}
	</div>
</DetailsSection>

<style lang="scss">
	.list {
		@apply flex-1 flex flex-col;

		.row {
			@apply py-2 px-3;
			@apply border-l-4;
		}
	}
</style>
