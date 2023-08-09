import {SlackApi} from "$lib/api/slack";
import {createDefaultContext} from "$lib/http/context";
import type {PageLoad} from "./$types";
import type {IntegrationsPageData} from "./+page.server";

export type IntegrationsPageHandlers = {
    installSlackHandler: () => Promise<string>
}

export const load = (async ({parent, fetch, data,}): Promise<IntegrationsPageHandlers & IntegrationsPageData> => {
    await parent();
    const {baseHeaders, baseUrl} = data;

    async function installSlackHandler(): Promise<string> {
        return await new SlackApi(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
    }

    return {...data, installSlackHandler}
}) satisfies PageLoad;
