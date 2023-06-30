<script lang="ts">
	import * as PIXI from 'pixi.js';
	import * as d3 from "d3";
	import { onMount } from 'svelte';
	import { data } from "./data";

	let width = 960, height = 600;
	let elemCanvas: HTMLCanvasElement;

	let containerLevel: PIXI.Container; // stage

	let colour = (function() {
			let scale = d3.scaleOrdinal(d3.schemeCategory10);
			return (num) => parseInt(scale(num).slice(1), 16);
	})();

	let simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id((d) => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2));

	function dragstarted(event: DragEvent) {
		console.log(event);
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}

	function dragged(event: DragEvent) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
	}

	function dragended(event: DragEvent) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
	}

	onMount(() => {

		let renderer = PIXI.autoDetectRenderer({antialias: !0, resolution: 1, view: elemCanvas });

		// Containers
		containerLevel = new PIXI.Container();
		let links = new PIXI.Graphics();
		containerLevel.addChild(links);

		data.nodes.forEach((node) => {
			node.gfx = new PIXI.Graphics();
			node.gfx.lineStyle(1.5, 0xFFFFFF);
			node.gfx.beginFill(colour(node.group));
			node.gfx.drawCircle(0, 0, 5);
			containerLevel.addChild(node.gfx);
		})

		d3.select(renderer.view)
			.call(d3.drag()
					.container(renderer.view)
					.subject((event) => simulation.find(event.x, event.y))
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended));

		simulation
				.nodes(data.nodes)
				.on('tick', ticked);

		simulation.force('link')
					.links(data.links);
		
		function ticked() {

			data.nodes.forEach((node) => {
					let { x, y, gfx } = node;
					gfx.position = new PIXI.Point(x, y);
			});

			links.clear();
			links.alpha = 0.6;

			data.links.forEach((link) => {
					let { source, target } = link;
					links.lineStyle(Math.sqrt(link.value), 0x999999);
					links.moveTo(source.x, source.y);
					links.lineTo(target.x, target.y);
			});

			links.endFill();

			renderer.render(containerLevel);
		}

		renderer.render(containerLevel);
	})
	
</script>

<canvas id="app" bind:this={elemCanvas} />
