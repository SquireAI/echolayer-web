<script lang="ts">
	import { formatDistance, subDays } from "date-fns"
	import Key from "./Key.svelte";
	import AccessToken from "./AccessToken.svelte";
	import DeleteToken from "./DeleteToken.svelte";

	export let isNew: boolean = false;
	export let token: string = "";
	export let createdDate: string;
	export let prefix: string;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;

	function getFormattedDate(date: string): string {
		return formatDistance(
			subDays(new Date(date), 0), new Date(), { addSuffix: true }
		);
	}
</script>

<div class="flex w-full px-6 pb-6 pt-3 gap-x-4 lg:gap-x-12 border-b border-neutral-700">
	<div class="hidden sm:hidden lg:flex flex-col gap-y-3 shrink-0">
		<Key isNew={isNew} />
		<div class={`border-2 ${isNew ? "border-echolayer-blue text-echolayer-blue" : "border-black text-black"} border-solid rounded-3xl leading-6 flex justify-center select-none`}>KEY</div>
	</div>
	<div class="flex flex-col grow gap-y-3 justify-center">
		<AccessToken isNew={isNew} token={isNew ? token : prefix} />
		<p class={isNew ? "text-echolayer-blue" : "text-black"}>Added {getFormattedDate(createdDate)}</p>
	</div>
	<DeleteToken prefix={prefix} deleteTokenHandler={deleteTokenHandler} />
</div>