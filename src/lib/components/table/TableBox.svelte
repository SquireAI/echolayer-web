<td class="py-3 text-neutral-800 text-sm">
	<slot />
</td>

<style lang="scss">
	td {
		&:first-child {
			@apply border-l-2 border-neutral-300 pl-5;
		}

		&:last-child {
			width: 0.1%;
			white-space: nowrap;
			@apply pr-5;
		}
	}
</style>
