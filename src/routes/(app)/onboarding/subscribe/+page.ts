import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import { BillingApi } from '$lib/api/billing';
import type { Organization } from '$lib/types';

export type PageData = {
	org?: Organization;
};

export type Handlers = {
	createCheckoutSession: () => Promise<string | undefined>;
};

export const load = (async ({ parent, fetch, data }): Promise<PageData & Handlers> => {
	await parent();
	const { baseHeaders, baseUrl, org } = data;

	async function createCheckoutSession(): Promise<string | undefined> {
		const res = await new BillingApi(
			createDefaultContext(fetch, baseHeaders, baseUrl)
		).checkoutSession();
		if (!res) return undefined;
		return res.session.url;
	}

	const handlers = {
		createCheckoutSession
	};

	return {
		...handlers,
		...(org && { org })
	};
}) satisfies PageLoad;
