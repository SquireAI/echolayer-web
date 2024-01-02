import type { Repository } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class RepositoryApi extends BaseApi<Repository> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.repository;
	}
}
