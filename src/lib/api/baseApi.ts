import type { httpContext } from '$lib/http/context';
import urlJoin from 'url-join';
import { HttpClient } from '../http/httpClient';

export const ENDPOINT = {
	organization: 'organization',
	component: 'component',
	componentType: 'component-type',
	relations: 'relations',
	relationsGraph: 'relations/graph',
	member: 'member',
	team: 'team',
	owner: 'owner',
	issue: 'issue',
	repository: 'repository',
	slack: 'slack-client',
	githubApp: 'source/github',
	invitationUser: 'invitation/user',
	invitationOrg: 'invitation/org',
	sourceGitlab: 'source/gitlab',
	auth: 'auth',
	apiKey: 'auth/api-key',
	user: 'user',
	root: ''
} as const;
export type EndpointType = (typeof ENDPOINT)[keyof typeof ENDPOINT];

export type FetchBody = {
	[key: string]: string | number | boolean | Array<FetchBodyValue>;
};
export type FetchBodyValue = string | number | boolean;

export abstract class BaseApi<T> {
	protected httpClient: HttpClient;
	protected endpoint: EndpointType = '';

	constructor(context: httpContext) {
		this.initializeVariables();
		const httpContext = { ...context };
		httpContext.baseUrl = urlJoin(context.baseUrl, this.endpoint);
		this.httpClient = new HttpClient(httpContext);
	}

	abstract initializeVariables(): void;
	public async list(queryParams?: FetchBody): Promise<T[]> {
		const resp = await this.httpClient.fetchGET('/', queryParams);
		return resp.json() as Promise<T[]>;
	}
	public async get(publicId: string): Promise<T> {
		const resp = await this.httpClient.fetchGET(publicId);
		return resp.json() as Promise<T>;
	}
	public async create(data?: FetchBody): Promise<T> {
		const resp = await this.httpClient.fetchPOST('', undefined, data);
		return resp.json() as Promise<T>;
	}
	public async update(publicId: string, data: FetchBody): Promise<T> {
		const resp = await this.httpClient.fetchPATCH(publicId, undefined, data);
		return resp.json() as Promise<T>;
	}
	public async delete(publicId: string): Promise<void> {
		await this.httpClient.fetchDELETE(publicId);
		return;
	}
}
