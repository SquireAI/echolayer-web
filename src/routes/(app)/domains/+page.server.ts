import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Domain, Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import domainsData from '$lib/data/demo-domains.json';

export type PageData = {
	domains?: Domain[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const domains = domainsData;

	return {
		...(domains && { domains }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
