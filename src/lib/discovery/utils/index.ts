import { browser } from "$app/environment";
import type { LeveledNodeLayout, NodeMetadataTuple, OriginStore, SelectedStore } from "$lib/types";
import { navigating, page } from "$app/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

export const URL_SEARCH_PARAMS_KEYS = {
	ORIGIN: "origin",
	SELECTED: "selected",
} as const;

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
	const { ORIGIN, SELECTED } = URL_SEARCH_PARAMS_KEYS;
	const searchParams: URLSearchParams = get(page).url.searchParams;
	let isSearchParamsModified = false;
	if (searchParams.has(ORIGIN) && originPublicId === undefined) {
			get(page).url.searchParams.delete(ORIGIN);
			isSearchParamsModified = true;
	}
	if (searchParams.has(SELECTED) && selectedPublicId === undefined) {
			get(page).url.searchParams.delete(SELECTED);
			isSearchParamsModified = true;
	}
	if (originPublicId !== undefined && searchParams.get(ORIGIN) !== originPublicId) {
			get(page).url.searchParams.set(ORIGIN, originPublicId);
			isSearchParamsModified = true;
	}
	if (selectedPublicId !== undefined && searchParams.get(SELECTED) !== selectedPublicId) {
			get(page).url.searchParams.set(SELECTED, selectedPublicId);
			isSearchParamsModified = true;
	}
	const navType = get(navigating)?.type;
	if (isSearchParamsModified && navType !== "popstate") {
		goto(`?${get(page).url.searchParams.toString()}`);
	}
}

export function debounceUpdateQueryParams(originStore: OriginStore, selectedStore: SelectedStore): () => void {
	let timer: NodeJS.Timeout;
	const debounce = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			updateQueryParameters({ originPublicId: get(originStore).entity?.publicId, selectedPublicId: get(selectedStore).entity?.publicId })
		}, 100);
	}
	return debounce;
}
