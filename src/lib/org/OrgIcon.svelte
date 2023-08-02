<script lang="ts">
    import ColorHash from 'color-hash';
    import EchoLayerIconWhite from "$lib/svgs/EchoLayerIconWhite.svg?component";

    export let text: string;

    const colorHash = new ColorHash({ saturation: .8 });
    const hex = colorHash.hex(text);
</script>

<div class={`py-2 px-1.5 rounded-md`} style={`background-color: ${hex}`}>
    <EchoLayerIconWhite />
</div>