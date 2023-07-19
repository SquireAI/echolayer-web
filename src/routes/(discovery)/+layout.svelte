<script lang="ts">
	import "$lib/discovery/styles/discovery.scss";
	import {setContext} from "svelte";
	import {COMPONENT_STORE_NAME, ORG_STORE_NAME, USER_STORE_NAME, componentStore, organizationStore, userStore} from "$lib/stores";

	setContext(COMPONENT_STORE_NAME, componentStore);
	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
</script>

<div class="app-container">
	<slot />
</div>
