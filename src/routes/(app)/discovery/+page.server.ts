import { ComponentApi } from "$lib/api/component";
import { RelationsGraphApi } from "$lib/api/relationsGraph";
import { TeamApi } from "$lib/api/team";
import { getHttpContext } from "$lib/http/context";
import type { GraphedEntity, OriginAndComponentData, RelationGraphEntity } from "$lib/types";
import { DISCOVERY_HOME_PATH } from "$lib/utils/paths";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, cookies, fetch }): Promise<OriginAndComponentData> => {
    const context = getHttpContext(fetch, cookies);

    const teamApi = new TeamApi(context);
    const graphApi = new RelationsGraphApi(context);
    const componentApi = new ComponentApi(context);

    const teams = await teamApi.list();
    const components = await componentApi.list();

    const originId: string | null = url.searchParams.get('origin');

    let relations: RelationGraphEntity[] = [];
    let origin: GraphedEntity | undefined;

    if(originId) {
        // Find component with ID
        origin = [...components, ...teams].find(component => component.publicId === originId);

        if (origin) {
            relations = await graphApi.list({sourcePublicId: origin?.publicId, depth: 2 });
            relations = relations.filter(
                (relation) => relation.relationshipName !== "hasMember" && relation.relationshipName !== "memberOf"
            );
        } else throw redirect(307, DISCOVERY_HOME_PATH);
    } else throw redirect(307, DISCOVERY_HOME_PATH);

    const { baseHeaders, baseUrl } = context;
    return {
        ...(teams && {teams}),
        ...(components && {components}),
        ...(origin && {origin}),
        ...(relations && {relations}),
        baseHeaders,
        baseUrl,
    };
}) satisfies PageServerLoad;
