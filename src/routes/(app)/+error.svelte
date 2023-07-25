<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import Error404 from "$lib/svgs/404.svg?component";
	import { ErrorMessageTypes, ErrorMessages, getErrorMessage, isErrorMessageType } from "$lib/error";
	import { INVALIDATED_SIGN_IN_PATH, SUPPORT_URL } from "$lib/utils/paths";

	let errorMessage = $page.error?.message;
	let displayErrorMessage = ErrorMessages[ErrorMessageTypes.GENERIC];
	$: displayErrorMessage = (errorMessage && isErrorMessageType(errorMessage) ? getErrorMessage(errorMessage) : displayErrorMessage);
</script>

<div class="grid h-full place-content-center">
	<div class="flex flex-col items-center gap-y-4">
		<Error404 />
		<h2 class="text-center">Whoops!</h2>
		<p class="text-center">Sorry, we can’t find the page you’re looking for.<br />Try going back to the previous page or contact us at <a href={SUPPORT_URL} class="ext-blue-600 dark:text-blue-500 hover:underline">support@echolayer.com</a> on email or Slack for assistance.</p>
		<p class="text-center">Error message: {displayErrorMessage}</p>
		<div class="flex flex-col md:flex-row gap-4 w-full">
			<Button type="primary" full href={INVALIDATED_SIGN_IN_PATH}>Back to home page</Button>
			<Button type="secondary" full href={SUPPORT_URL}>Contact support</Button>
		</div>
</div>
</div>
