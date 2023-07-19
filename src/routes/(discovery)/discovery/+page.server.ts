import type { BaseEntity, OriginAndComponentData, RelationGraphEntity} from "$lib/types";
import type { PageServerLoad } from "./$types";
import { getHttpContext } from "$lib/http/context";
import { ComponentApi } from "$lib/api/component";
import { RelationsGraphApi } from "$lib/api/relationsGraph";
import { TeamApi } from "$lib/api/team";

export const load = (async ({ url, cookies, fetch }): Promise<OriginAndComponentData> => {
    const context = getHttpContext(fetch, cookies);

    const teamApi = new TeamApi(context);
    const graphApi = new RelationsGraphApi(context);
    const componentApi = new ComponentApi(context);

    const teams = await teamApi.list();
    const components = await componentApi.list();

    const originId: string | null = url.searchParams.get('origin');

    let relations: RelationGraphEntity[] = [];
    let origin: BaseEntity | undefined;

    if(originId) {
        // Find component with ID
        const origin = [...components, ...teams].find(component => component.publicId === originId);
    
        if(origin) {
            relations = await graphApi.list({ sourceId: origin?.publicId, direction: "downstream" });
        }
    }

    return {
        ...(teams && {teams}),
        ...(components && {components}),
        ...(origin && {origin}),
        ...(relations && {relations}),
    };
}) satisfies PageServerLoad;
