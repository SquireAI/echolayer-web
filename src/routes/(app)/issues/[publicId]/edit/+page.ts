import { createDefaultContext } from '$lib/http/context';
import { createIssueService } from '$lib/services/issue.service';
import type { PageLoad } from './$types';

export const load = (async ({ data, fetch, parent }) => {
	await parent();
	const { baseHeaders, baseUrl, org, issue } = data;

	return {
		org,
		issue
	};
}) satisfies PageLoad;
