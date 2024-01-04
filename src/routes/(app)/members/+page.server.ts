import type { PageServerLoad } from './$types';
import { getHttpContext } from '$lib/http/context';
import type { Organization, Member } from '$lib/types';
import { orgRequired } from '$lib/utils/access';
import { MemberApi } from '$lib/api/member';

export type PageData = {
	members?: Member[];
	org?: Organization;
};

export const load = (async ({ cookies, fetch }): Promise<PageData> => {
	const context = getHttpContext(fetch, cookies);

	const org = await orgRequired(context);

	const memberApi = new MemberApi(context);
	const members = await memberApi.list();

	return {
		...(members && { members }),
		...(org && { org })
	};
}) satisfies PageServerLoad;
