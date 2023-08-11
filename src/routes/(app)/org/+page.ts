import { SlackApi } from '$lib/api/slack';
import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import type { OrgDetailsPageData } from './+page.server';

export type OrgDetailsPageHandlers = {
	installSlackHandler: () => Promise<string>;
};

export const load = (async ({
	parent,
	fetch,
	data
}): Promise<OrgDetailsPageHandlers & OrgDetailsPageData> => {
	await parent();
	// we're getting the xsrf header from the parent (page.server.ts) since we don't have access to cookies here
	const { baseHeaders, baseUrl } = data;
	async function installSlackHandler(): Promise<string> {
		return await new SlackApi(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
	}
	return { ...data, installSlackHandler };
}) satisfies PageLoad;
