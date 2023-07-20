<script>
    import "./AdminLayout.scss";
    import Header from "$lib/Header.svelte";
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
