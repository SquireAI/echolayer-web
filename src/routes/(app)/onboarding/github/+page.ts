import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import { GithubApp } from '$lib/api/github-app';
import type { Organization, Repository } from '$lib/types';

export type PageData = {
	org?: Organization;
};

export type Handlers = {
	installGithubAppHandler: () => Promise<string>;
	checkGithubAppHandler: () => Promise<string | undefined>;
};

export const load = (async ({ parent, fetch, data }): Promise<PageData & Handlers> => {
	await parent();
	const { baseHeaders, baseUrl, org } = data;

	async function installGithubAppHandler(): Promise<string> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
	}

	async function checkGithubAppHandler(): Promise<string | undefined> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).check();
	}

	const handlers = {
		installGithubAppHandler,
		checkGithubAppHandler
	};

	return {
		...handlers,
		...(org && { org })
	};
}) satisfies PageLoad;
