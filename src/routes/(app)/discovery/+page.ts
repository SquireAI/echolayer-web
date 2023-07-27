import { RelationsGraphApi } from "$lib/api/relationsGraph";
import { createDefaultContext } from "$lib/http/context";
import type { BaseEntity, OriginAndComponentData, RelationGraphEntity } from "$lib/types.js";
import type { PageLoad } from "./$types";

export type DiscoveryPage = Pick<OriginAndComponentData, "components" | "origin" | "relations" | "teams"> & {
	getRelationsGraph: (origin: BaseEntity) => Promise<RelationGraphEntity[]>;
}

/**
 * Provides a function to the page that has the proper HTTP context to make API requests
 * to get the new downstream relations for a given source node.
 * Also passes along the data from the parent page.server.ts load function.
 */
export const load = (async ({ data, fetch, parent }) => {
	await parent();
	const { baseHeaders, baseUrl, ...rest } = data;
	const context = createDefaultContext(fetch, baseHeaders, baseUrl);

	const getRelationsGraph = async (origin: BaseEntity): Promise<RelationGraphEntity[]> => {
		return await new RelationsGraphApi(context).list({ sourcePublicId: origin?.publicId, direction: "downstream" })
	}

	return {
		...rest,
		getRelationsGraph
	}
}) satisfies PageLoad;
