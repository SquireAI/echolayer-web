import type { ContributionContextResult } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';
import _ from 'lodash';

export class ContributionApi extends BaseApi<ContributionContextResult> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.contribution;
	}

	public async getContext(context: string): Promise<ContributionContextResult> {
		return this.list({ context });
	}

	public sortContextByScore(contextResults: ContributionContextResult): ContributionContextResult {
		if (contextResults.length === 0) return [];
		const contextOwnersSortedByScore = contextResults.map(function (el) {
			return {
				...el,
				owners: _.sortBy(el.owners, 'contributionCount').reverse()
			};
		});
		return _.sortBy(contextOwnersSortedByScore, 'locationScore').reverse();
	}
}
