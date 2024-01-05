<div class="back">
	<slot />
</div>

<style lang="scss">
	.back {
		background-image: url('/assets/echoLayer_graphic_faded.png'), url('/assets/grid.png');
		background-position: right top, left -80px;
		background-repeat: no-repeat, repeat-x;
		background-size: 758px 450px, 300px 300px;
		@apply bg-neutral-25;
	}
</style>
