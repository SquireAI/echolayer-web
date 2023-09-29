import { GithubApp } from '$lib/api/github-app';
import { SlackApi } from '$lib/api/slack';
import { SourceGitlabApi } from '$lib/api/source-gitlab';
import { createDefaultContext } from '$lib/http/context';
import type { IntegrationInstallStatus } from '$lib/types';
import type { PageLoad } from './$types';

import type { IntegrationsPageData } from './+page.server';

export type IntegrationsPageHandlers = {
	installSlackHandler: () => Promise<string>;
	installGithubAppHandler: () => Promise<string>;
	checkGithubAppHandler: () => Promise<IntegrationInstallStatus>;
	installGitlabHandler: (acecssToken: string) => Promise<string>;
	checkGitlabHandler: () => Promise<IntegrationInstallStatus>;
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

	async function installGitlabHandler(accessToken: string): Promise<string> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		await api.install(accessToken);
		return await api.getSecretToken();
	}

	async function checkGitlabHandler(): Promise<IntegrationInstallStatus> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		return await api.check();
	}

	return {
		...data,
		installSlackHandler,
		installGithubAppHandler,
		checkGithubAppHandler,
		installGitlabHandler,
		checkGitlabHandler
	};
}) satisfies PageLoad;
