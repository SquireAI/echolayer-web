import { RelationsGraphApi } from "$lib/api/relationsGraph";
import { createDefaultContext } from "$lib/http/context";
import type { GraphedEntity, OriginAndComponentData, RelationGraphEntity } from "$lib/types.js";
import type { PageLoad } from "./$types";

export type DiscoveryPage = Pick<OriginAndComponentData, "components" | "origin" | "relations" | "teams"> & {
	getRelationsGraph: (origin: GraphedEntity) => Promise<RelationGraphEntity[]>;
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

	const getRelationsGraph = async (origin: GraphedEntity): Promise<RelationGraphEntity[]> => {
		const relations = await new RelationsGraphApi(context).list({ sourcePublicId: origin?.publicId, depth: 2 })
		return relations.filter(relation => relation.relationshipName !== "hasMember") || [];
	}

	return {
		...rest,
		getRelationsGraph
	}
}) satisfies PageLoad;
