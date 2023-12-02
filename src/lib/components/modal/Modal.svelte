<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { modalStore, type Modal } from '../../stores/modal';

	// Event Dispatcher
	type ModalEvent = {
		backdrop: MouseEvent;
	};
	const dispatch = createEventDispatcher<ModalEvent>();

	// Animation
	/** The open/close animation duration. */
	let duration = 150;
	/** Set the fly transition opacity. */
	let flyOpacity = 0;
	/** Set the fly transition X axis value. */
	let flyX = 0;
	/** Set the fly transition Y axis value. */
	let flyY = 100;

	// Local
	let currentComponent: Modal | undefined;
	let registeredInteractionWithBackdrop = false;

	// Modal Store Subscription
	modalStore.subscribe((modals: Modal[]) => {
		if (!modals.length) {
			return;
		}
		// Set Active Component
		currentComponent = modals[0];
	});

	// Event Handlers
	function onBackdropInteractionBegin(event: Event): void {
		if (!(event.target instanceof Element)) {
			return;
		}
		const classList = event.target.classList;
		if (classList.contains('modal-backdrop') || classList.contains('modal-transition')) {
			registeredInteractionWithBackdrop = true;
		}
	}
	function onBackdropInteractionEnd(event: Event): void {
		if (!(event.target instanceof Element)) {
			return;
		}
		const classList = event.target.classList;
		if (
			(classList.contains('modal-backdrop') || classList.contains('modal-transition')) &&
			registeredInteractionWithBackdrop
		) {
			modalStore.close();
			/** @event {{ event }} backdrop - Fires on backdrop interaction.  */
			dispatch('backdrop', event as MouseEvent);
		}
		registeredInteractionWithBackdrop = false;
	}

	function onClose(): void {
		modalStore.close();
	}

	// A11y
	function onKeyDown(event: KeyboardEvent): void {
		if (!$modalStore.length) {
			return;
		}
		if (event.code === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if $modalStore.length > 0}
	{#key $modalStore}
		<!-- Backdrop -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="modal-backdrop fixed top-0 left-0 right-0 bottom-0 overflow-y-hidden z-[999] bg-black bg-opacity-50"
			on:mousedown={onBackdropInteractionBegin}
			on:mouseup={onBackdropInteractionEnd}
			on:touchstart|passive
			on:touchend|passive
			transition:fade|global={{ duration }}
		>
			<!-- Transition Layer -->
			<div
				class="modal-transition w-full h-fit min-h-full p-4 overflow-y-hidden flex justify-center items-center"
				transition:fly|global={{ duration, opacity: flyOpacity, x: flyX, y: flyY }}
			>
				{#if currentComponent}
					<!-- Modal container -->
					<div
						class={`block overflow-y-auto w-modal space-y-4 shadow-xl bg-white rounded-md`}
						role="dialog"
						aria-modal="true"
						aria-label={$modalStore[0].title ?? ''}
					>
						<!-- Modal component -->
						<svelte:component this={currentComponent.component} />
					</div>
				{/if}
			</div>
		</div>
	{/key}
{/if}
