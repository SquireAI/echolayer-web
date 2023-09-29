import { GithubApp } from '$lib/api/github-app';
import { SlackApi } from '$lib/api/slack';
import { SourceGitlabApi } from '$lib/api/source-gitlab';
import { createDefaultContext } from '$lib/http/context';
import type { IntegrationInstallStatus, IntegrationStatus } from '$lib/types';
import type { PageLoad } from './$types';

import type { GitlabIntegrationsPageData } from './+page.server';

export type GitlabIntegrationsPageHandlers = {
	installGitlabHandler: (acecssToken: string) => Promise<void>;
	checkGitlabHandler: () => Promise<IntegrationStatus>;
	getGitlabSecretTokenHandler: () => Promise<string>;
	updateGitlabAccessTokenHandler: (accessToken: string) => Promise<void>;
};

export const load = (async ({
	parent,
	fetch,
	data
}): Promise<GitlabIntegrationsPageHandlers & GitlabIntegrationsPageData> => {
	await parent();
	const { baseHeaders, baseUrl } = data;

	async function installGitlabHandler(accessToken: string): Promise<void> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		await api.install(accessToken);
	}

	async function getGitlabSecretTokenHandler(): Promise<string> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		return await api.getSecretToken();
	}

	async function checkGitlabHandler(): Promise<IntegrationStatus> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		return await api.check();
	}

	async function updateGitlabAccessTokenHandler(accessToken: string): Promise<void> {
		const api = new SourceGitlabApi(createDefaultContext(fetch, baseHeaders, baseUrl));
		await api.updateAccessToken(accessToken);
	}

	return {
		...data,
		installGitlabHandler,
		checkGitlabHandler,
		updateGitlabAccessTokenHandler,
		getGitlabSecretTokenHandler
	};
}) satisfies PageLoad;
