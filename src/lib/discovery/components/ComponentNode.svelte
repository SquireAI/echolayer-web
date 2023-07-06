<script lang="ts">
	import type { Component } from '$lib/types';
  import { Node } from 'svelvet';

	export let component: Component;

	function handleClick(e: CustomEvent) {
		const { detail } = e;
		detail.node.set.bgColor('red');
	}

</script>

<Node id="55" let:selected on:nodeClicked="{handleClick}" borderRadius={10} borderColor="#d4d4d4" borderWidth={1} dimensions={{ width: 240, height: 100 }}>
  <!-- <div use:grabHandle class:selected class="my-component">
    <span>{title}</span>
  </div> -->
	<div class="component__node">
		<div class="component__node--inner">
			<div class="component__info">
				<div class="component__info--icon"></div>
				<div class="component__info--name">
					<p>{component.name}</p>
				</div>
			</div>
			<div class="component__members">
				<div class="component__members--count">
					<p>6 members</p>
				</div>
				<div class="component__members--avatars">
					<div class="avatar__list">
						<div class="avatar"></div>
						<div class="avatar"></div>
						<div class="avatar"></div>
						<div class="avatar"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Node>

<!-- <style lang="scss">
	:root > [class*="svelvet-node"] {
		--node-border-radius: "10px";
		--prop-border-radius: "10px";
	}
</style> -->
