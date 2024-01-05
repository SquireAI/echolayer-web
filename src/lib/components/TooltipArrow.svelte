<script lang="ts">
	export let content: string;
</script>

<div class="tooltip-wrapper">
	<slot />
	<div class="tooltip">
		{content}
		<i />
	</div>
</div>

<style lang="scss">
	.tooltip-wrapper {
		@apply inline-block relative text-center;

		&:hover {
			.tooltip {
				@apply visible;
			}
		}

		.tooltip {
			@apply invisible absolute inline-block z-[999] px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-md shadow-md w-full max-w-[150px];
			top: calc(100% + 8px);
			left: 50%;
			transform: translate(-50%, 0);
			box-sizing: border-box;

			i {
				position: absolute;
				bottom: 98%;
				left: 50%;
				margin-left: -12px;
				width: 24px;
				height: 12px;
				overflow: hidden;
			}

			i::after {
				content: '';
				position: absolute;
				width: 12px;
				height: 12px;
				left: 50%;
				transform: translate(-50%, 50%) rotate(45deg);
				background-color: #000;
				box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
			}
		}
	}
</style>
