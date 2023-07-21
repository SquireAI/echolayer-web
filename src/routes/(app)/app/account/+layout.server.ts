import {getHttpContext, type httpContext} from "$lib/http/context";
import {orgRequired} from "$lib/utils/access";
import type {LayoutServerLoad} from "./$types";
export const load = (async ({ cookies, fetch, parent }): Promise<void> => {
    await parent();
    const context: httpContext = getHttpContext(fetch, cookies);

    // Check if user has an organization
    const org = await orgRequired(context);
}) satisfies LayoutServerLoad;
