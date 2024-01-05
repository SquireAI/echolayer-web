import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { ComponentEntity, Domain, Organization } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import domainsData from '$lib/data/demo-domains.json';
import { ComponentApi } from '$lib/api/component';

export type PageData = {
	components?: ComponentEntity[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const componentApi = new ComponentApi(context);
	const components = await componentApi.list();

	return {
		...(components && { components }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
