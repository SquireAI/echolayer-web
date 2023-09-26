import { GithubApp } from '$lib/api/github-app';
import { SlackApi } from '$lib/api/slack';
import { createDefaultContext } from '$lib/http/context';
import type { IntegrationInstallStatus } from '$lib/types';
import type { PageLoad } from './$types';

import type { IntegrationsPageData } from './+page.server';

export type IntegrationsPageHandlers = {
	installSlackHandler: () => Promise<string>;
	installGithubAppHandler: () => Promise<string>;
	checkGithubAppHandler: () => Promise<IntegrationInstallStatus>;
};

export const load = (async ({
	parent,
	fetch,
	data
}): Promise<IntegrationsPageHandlers & IntegrationsPageData> => {
	await parent();
	const { baseHeaders, baseUrl } = data;

	async function installSlackHandler(): Promise<string> {
		return await new SlackApi(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
	}

	async function installGithubAppHandler(): Promise<string> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).install();
	}

	async function checkGithubAppHandler(): Promise<IntegrationInstallStatus> {
		return await new GithubApp(createDefaultContext(fetch, baseHeaders, baseUrl)).check();
	}

	return { ...data, installSlackHandler, installGithubAppHandler, checkGithubAppHandler };
}) satisfies PageLoad;
