<script lang="ts">
	import '../../app.scss';
	import { setContext } from "svelte";
	import Header from '../../lib/Header.svelte';
	import { ORG_STORE_NAME, USER_STORE_NAME, organizationStore, userStore } from '$lib/stores';

	setContext(USER_STORE_NAME, userStore);
	setContext(ORG_STORE_NAME, organizationStore);
</script>

<div class="app-container">
	<header>
		<Header />
	</header>

	<main>
		<div class="main__content--left"></div>
		<div class="main__content">
			<slot />
		</div>
		<div class="main__content--right"></div>
	</main>
</div>
