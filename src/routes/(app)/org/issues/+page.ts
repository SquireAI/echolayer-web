import { ComponentApi } from '$lib/api/component';
import { IssueApi } from '$lib/api/issue';
import { createDefaultContext } from '$lib/http/context';
import type { ComponentEntity, Issue } from '$lib/types';
import type { PageLoad } from './$types';

export type IssuePageHandlers = {
	updateIssue: (issueId: string, resolve: boolean) => Promise<Issue>;
	issues: Issue[];
	components: ComponentEntity[];
};

export const load = (async ({ parent, fetch, data }): Promise<IssuePageHandlers> => {
	await parent();
	const { baseHeaders, baseUrl } = data;
	const issues = await new IssueApi(createDefaultContext(fetch, baseHeaders, baseUrl)).list();
	const components = await new ComponentApi(
		createDefaultContext(fetch, baseHeaders, baseUrl)
	).list();

	async function updateIssue(issueId: string, resolved: boolean): Promise<Issue> {
		return await new IssueApi(createDefaultContext(fetch, baseHeaders, baseUrl)).update(issueId, {
			resolved
		});
	}

	return { ...data, issues, components, updateIssue };
}) satisfies PageLoad;
