<script lang="ts">
	import '../app.scss';
	import { setContext } from "svelte";
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
	import { createUserStore } from '$lib/stores/user-store';
	import { createOrgStore } from '$lib/stores/org-store';

	/** @type {import('./$types').PageData} */
	export let data;

	const userStore = createUserStore();
	const organizationStore = createOrgStore();

	setContext("user", userStore);
	setContext("org", organizationStore);
</script>

<div class="app-container">
	<header>
		<Header />
	</header>

	<main>
		<div class="main--left"></div>
		<div class="main__content"><slot /></div>
		<div class="main--right"></div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
