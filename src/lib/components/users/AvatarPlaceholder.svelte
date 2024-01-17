<script lang="ts">
	import AccountIcon from 'svelte-material-icons/Account.svelte';

	export let size = '35px';
	export let name = '';
	$: userInitials = getInitials(name);

	const slugify = (str: string) => {
		str = str.trim();
		str = str.replace(/^\s+|\s+$/g, '');
		str = str.toLowerCase();
		str = str.replace(/[^a-z0-9 -]/g, '');
		str = str.replace(/\s+/g, '-');
		str = str.replace(/-+/g, '-');
		return str;
	};
	const getInitials = (name: string) => {
		if (!name || name === '') return 'EL';
		name = slugify(name);
		if (name.startsWith('@')) name = name.substring(1);
		// Name with dashes
		else if (name.indexOf('-') >= 0) {
			return name
				.split('-')
				.map((part) => part[0])
				.join('')
				.substring(0, 2)
				.toUpperCase();
		}
		// Name with underscores
		else if (name.indexOf('_') >= 0) {
			return name
				.split('_')
				.map((part) => part[0])
				.join('')
				.substring(0, 2)
				.toUpperCase();
		}
		// Name with spaces
		if (name.indexOf(' ') >= 0) {
			return name
				.split(' ')
				.map((part) => part[0])
				.join('')
				.substring(0, 2)
				.toUpperCase();
		}
		// Use 2 first letters
		else {
			return name.substring(0, 2).toUpperCase();
		}
	};

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
	class="wrapper flex items-center justify-center rounded-full"
	style="--color:{color};--fontColor:{fontColor};--size:{size}"
	class:auto-color={userInitials}
	class:bg-neutral-300={!userInitials}
>
	{#if userInitials}
		<span class="text">{userInitials}</span>
	{:else}
		<AccountIcon />
	{/if}
</div>

<style lang="scss">
	.auto-color {
		background-color: var(--color);
		color: var(--fontColor);
	}
	.wrapper {
		width: var(--size);
		height: var(--size);

		.text {
			font-size: calc(var(--size) / 2.2);
			line-height: calc(var(--size) / 2.2);
		}
	}
</style>
