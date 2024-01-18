import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import { GithubApp } from '$lib/api/github-app';
import type { PageData } from './+page.server';
import { OrganizationApi } from '$lib/api/organization';
import type { Organization } from '$lib/types';

export type Handlers = {
	installGithubAppHandler: () => Promise<string>;
	checkGithubAppHandler: () => Promise<string | undefined>;
};

export const load = (async ({ parent, fetch, data }): Promise<PageData & Handlers> => {
	await parent();
	const { baseHeaders, baseUrl } = data;

	async function installGithubAppHandler(): Promise<string> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
	}

	async function checkGithubAppHandler(): Promise<string | undefined> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).check();
	}

	async function createOrgHandler(orgName: string): Promise<Organization> {
		const context = createDefaultContext(fetch, baseHeaders, baseUrl);
		return await new OrganizationApi(context).create({ name: orgName });
	}

	const handlers = {
		installGithubAppHandler,
		checkGithubAppHandler,
		createOrgHandler
	};

	return { ...data, ...handlers };
}) satisfies PageLoad;
