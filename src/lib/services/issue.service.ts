import { IssueApi } from '$lib/api/issue';
import type { httpContext } from '$lib/http/context';
import type { Issue } from '$lib/types';

export interface IssueService {
	createIssue: (str: string) => Promise<Issue>;
	updateIssue: (issue: Issue) => Promise<Issue>;
}

export const createIssueService = (context: httpContext): IssueService => {
	const api = new IssueApi(context);
	return {
		createIssue: function (str: string): Promise<Issue> {
			return api.create({ description: str });
		},
		updateIssue: function (issue: Issue): Promise<Issue> {
			return api.update(issue.publicId, issue);
		}
	};
};
