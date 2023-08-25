import { IssueApi } from '$lib/api/issue';
import { createDefaultContext } from '$lib/http/context';
import type { Issue } from '$lib/types';
import type { PageLoad } from './$types';

export type IssuePageHandlers = {
	updateIssue: (issueId: string, resolve: boolean) => Promise<Issue>;
    issues: Issue[];
};

export const load = (async ({
	parent,
	fetch,
	data
}): Promise<IssuePageHandlers> => {
	await parent();
	const { baseHeaders, baseUrl } = data;
    const issues = await new IssueApi(createDefaultContext(fetch, baseHeaders, baseUrl)).list()

	async function updateIssue(issueId: string, resolve: boolean): Promise<Issue> {
		return await new IssueApi(createDefaultContext(fetch, baseHeaders, baseUrl)).update(issueId, { resolve });
	}

	return { ...data, issues, updateIssue };
}) satisfies PageLoad;
