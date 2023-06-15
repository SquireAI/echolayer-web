<script lang="ts">
	import '../app.scss';
	import { setContext } from "svelte";
	import { writable } from 'svelte/store';
	import Header from '../lib/Header.svelte';
	import Footer from '../lib/Footer.svelte';
	import type { User } from '../types';

	
	const user = writable<User>({ "name": "Foo Bar" });

	setContext("user", user);
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
