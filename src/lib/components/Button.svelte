<script lang="ts">
	import { goto } from "$app/navigation";
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";

	export let href: string | undefined = undefined;
	export let full: boolean | undefined = false;
	export let type: "button" | "primary" | "secondary" | "link" | "special" | "flat" | "grey" = "button";
	let clazz: string = "";
	export { clazz as class };
	export let disabled: boolean = false;
	export let target: HTMLAttributeAnchorTarget = "_self";

	export let handleClick: () => Promise<void> = async () => {};

	const baseButtonClassNames = "inline-flex justify-center font-medium text-sm cursor-pointer text-center rounded leading-4";
	let buttonClasses = `${baseButtonClassNames}`;
	if (type === "button" || type === "primary") {
		buttonClasses = `${buttonClasses} bg-echolayer-blue border radius-4 border-white text-white px-8 py-3 ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "secondary") {
		buttonClasses = `${buttonClasses} bg-white border border-neutral-300 text-black px-8 py-3 ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "link") {
		buttonClasses = `${buttonClasses} bg-transparent hover:underline text-black py-3 ${clazz} ${disabled ? "cursor-not-allowed bg-neutral-500" : "" }`;
	} else if (type === "special") {
		buttonClasses = `${buttonClasses} bg-white border border-neutral-300 text-black p-3 ${clazz} ${disabled ? "cursor-not-allowed bg-neutral-500" : "" }`;
	} else if (type === "grey") {
		buttonClasses = `${buttonClasses} bg-neutral-100 border border-neutral-300 text-black px-3 py-1.5 rounded-sm ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "flat") {
		buttonClasses = `flex flex-row text-sm cursor-pointer font-medium bg-white text-neutral-800 p-2 hover:bg-neutral-200 rounded ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	}

	async function clickHandler(): Promise<boolean> {
		if (!disabled) {
			await handleClick();
			// if there's a link and it's not to open in a new tab / window, pass it to `goto`
			// `goto` can also handle fully-qualified links so long as target isn't `_blank`
			if (href && target !== "_blank") {
				await goto(href);
			}
		}
		// if there's a href that is to open in a new tab / window, we return true so the click event
		// can continue on and let the anchor element change the window location in a new tab / window
		return true;
	}
</script>

{#if !href}
	<button on:click={clickHandler} class={`${buttonClasses} ${full ? "w-full" : ""}`}><slot /></button>
{:else}
	<a href={href} data-sveltekit-preload-data="hover" on:click={clickHandler} class={`${buttonClasses} ${full ? "w-full" : ""}`} target={target}><slot /></a>
{/if}
