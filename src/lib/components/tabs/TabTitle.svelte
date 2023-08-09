<script lang="ts">
	export let tabs = [];
	export let selected = 0;
</script>

<div class="title">
	{#each tabs as tab}
		<span class="content" class:selected={tab === tabs[selected]}>
			<h2>{tab}</h2>
		</span>
	{/each}
</div>

<style lang="scss">
	.content {
		@apply hidden;

		&.selected {
			@apply block;
		}
	}

	.title {
		h2 {
			@apply text-lg font-medium;
		}
	}
</style>
