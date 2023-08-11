<script lang="ts">
	import Key from './Key.svelte';
	import AccessToken from './AccessToken.svelte';
	import DeleteToken from './DeleteToken.svelte';

	export let isNew = false;
	export let token = '';
	export let createdDate: string;
	export let prefix: string;
	export let deleteTokenHandler: (prefix: string) => Promise<void>;
</script>

<div
	class={`flex items-center justify-start w-full lg:gap-x-4 rounded-md px-4 py-2 ${
		isNew ? 'bg-echolayer-green-100/20' : 'bg-transparent'
	}`}
>
	<div class="hidden sm:hidden lg:flex flex-col gap-y-3 shrink-0">
		<Key {isNew} />
	</div>
	<div class="flex flex-col grow justify-center">
		<AccessToken {isNew} {createdDate} token={isNew ? token : prefix} />
	</div>
	<DeleteToken {prefix} {deleteTokenHandler} />
</div>
