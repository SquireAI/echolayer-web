<script lang="ts">
	import type { HTMLAttributeAnchorTarget } from "svelte/elements";

	export let href: string | undefined = undefined;
	export let full: boolean | undefined = false;
	export let type: "button" | "primary" | "secondary" | "link" | "special" = "button";
	let clazz: string = "";
	export { clazz as class };
	export let disabled: boolean = false;
	export let target: HTMLAttributeAnchorTarget = "_self";
	export let handleClick: () => void = () => {};

	const baseButtonClassNames = "inline-flex justify-center font-medium text-sm py-3 cursor-pointer text-center rounded leading-4";
	let buttonClasses = `${baseButtonClassNames}`;
	if (type === "button" || type === "primary") {
		buttonClasses = `${buttonClasses} bg-echolayer-blue border radius-4 border-white text-white px-8 ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "secondary") {
		buttonClasses = `${buttonClasses} bg-white border border-neutral-300 text-black px-8 ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "link") {
		buttonClasses = `${buttonClasses} bg-transparent hover:underline text-black ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	} else if (type === "special") {
		buttonClasses = `${buttonClasses} bg-white border border-neutral-300 text-black px-3 h-12 ${clazz} ${disabled ? "cursor-not-allowed	bg-neutral-500" : "" }`;
	}

	function clickHandler() {
		if (!disabled) {
			handleClick();
		}
	}
</script>

{#if !href}
	<button on:click={clickHandler} class={`${buttonClasses} ${full ? "w-full" : ""}`}><slot /></button>
{:else}
	<a href={href} on:click={clickHandler} class={`${buttonClasses} ${full ? "w-full" : ""}`} target={target}><slot /></a>
{/if}