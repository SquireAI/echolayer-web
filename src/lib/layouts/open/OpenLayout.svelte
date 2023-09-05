<script>
	import './OpenLayout.scss';
	import Header from '$lib/Header.svelte';
</script>

<div class="app-container">
	<div
		class="app-container--left bg-cover bg-center hidden md:block md:absolute top-0 left-0 lg:left-[10%] w-[500px] h-[290px]"
		style="background-image: url('/assets/echoLayer_graphic_left.png')"
	/>
	<div
		class="app-container--right bg-cover bg-center hidden md:block md:absolute bottom-0 right-0 lg:right-[10%] w-[500px] h-[290px]"
		style="background-image: url('/assets/echoLayer_graphic_right.png')"
	/>
	<header>
		<Header />
	</header>

	<main>
		<div class="main__content--left" />
		<div class="main__content">
			<slot />
		</div>
		<div class="main__content--right" />
	</main>
</div>
