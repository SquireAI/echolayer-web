import type { PageServerLoad } from "./$types";
import { getHttpContext } from "$lib/http/context";
import { ComponentApi } from "$lib/api/component";
import { TeamApi } from "$lib/api/team";
import type { TeamAndComponentData } from "$lib/types";

export const load = (async ({ cookies, fetch }): Promise<TeamAndComponentData> => {
    const context = getHttpContext(fetch, cookies);

    const teamApi = new TeamApi(context);
    const componentApi = new ComponentApi(context);

    const teams = await teamApi.list();
    const components = await componentApi.list();

    return {
        ...(teams && {teams}),
        ...(components && {components}),
    };
}) satisfies PageServerLoad;
