import { browser } from "$app/environment";
import type { LeveledNodeLayout, NodeMetadataTuple } from "$lib/types";
import { page } from "$app/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export function getAvatarInitials(fullName: string): string {
	return fullName.trim().split(/\s+/).map((part) => part[0]).join("").toUpperCase();
};

export function setOriginOnNodeLayout(nodeLayout: LeveledNodeLayout, originPublicId: string): LeveledNodeLayout {
	return nodeLayout.map((row) => {
		return row.map(([publicId, nodeMetadata]) => {
			const metadata = {...nodeMetadata, node: {...nodeMetadata.node, isOrigin: (originPublicId === publicId ? true : false) }}
			return <NodeMetadataTuple>[publicId, metadata];
		})
	});
}

/**
 * Resposible for updating the query parameters of the URL the user sees in their browser. It will add / update / remove the
 * "origin" and "selected" query parameter keys and their values as the state of the origin and selected nodes updates in the
 * graph. The function figures out the new current path and appends it to the URL
 */
export function updateQueryParameters({ originPublicId, selectedPublicId }: { originPublicId?: string, selectedPublicId?: string}) {
	if (!browser) {
			return;
	}
	const ORIGIN_KEY = "origin";
	const SELECTED_KEY = "selected";
	const searchParams: URLSearchParams = get(page).url.searchParams;
	if (searchParams.has(ORIGIN_KEY) && originPublicId === undefined) {
			get(page).url.searchParams.delete(ORIGIN_KEY);
	}
	if (searchParams.has(SELECTED_KEY) && selectedPublicId === undefined) {
			get(page).url.searchParams.delete(SELECTED_KEY);
	}
	if (originPublicId !== undefined) {
			get(page).url.searchParams.set(ORIGIN_KEY, originPublicId);
	}
	if (selectedPublicId !== undefined) {
			get(page).url.searchParams.set(SELECTED_KEY, selectedPublicId);
	}
	goto(`?${get(page).url.searchParams.toString()}`);
}
