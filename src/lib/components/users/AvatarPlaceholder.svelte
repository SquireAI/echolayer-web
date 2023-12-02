<script lang="ts">
	import AccountIcon from 'svelte-material-icons/Account.svelte';

	export let name = '';
	$: userInitials =
		name
			.trim()
			.split(' ')
			.map((part) => part[0])
			.join('')
			.toUpperCase() || '';

	const stringToColor = (str: string) => {
		let hash = 0;
		str.split('').forEach((char) => {
			hash = char.charCodeAt(0) + ((hash << 5) - hash);
		});
		let color = '';
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xff;
			color += value.toString(16).padStart(2, '0');
		}
		return color;
	};

	const isLight = (color: string) => {
		let hexColor = parseInt(color);
		let r = hexColor >> 16;
		let g = (hexColor >> 8) & 255;
		let b = hexColor & 255;
		let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
		return hsp > 127.5;
	};

	$: color = `#${stringToColor(name)}`;
	$: fontColor = isLight(stringToColor(name)) ? '#000' : '#fff';
</script>

<div
	class="flex items-center justify-center w-8 h-8 rounded-2xl"
	style="--color:{color};--fontColor:{fontColor}"
	class:auto-color={userInitials}
	class:bg-neutral-300={!userInitials}
>
	{#if userInitials}
		<span>{userInitials}</span>
	{:else}
		<AccountIcon />
	{/if}
</div>

<style lang="scss">
	.auto-color {
		background-color: var(--color);
		color: var(--fontColor);
	}
</style>
