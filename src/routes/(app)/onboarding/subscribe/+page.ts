import { createDefaultContext } from '$lib/http/context';
import type { PageLoad } from './$types';
import { BillingApi } from '$lib/api/billing';
import type { Subscription } from '$lib/types';
import type { Organization } from '$lib/types';
import type { PageServerData } from './+page.server';

export type CheckoutStatus = 'success' | 'cancel' | 'change' | null;

export interface PageData extends Partial<PageServerData> {
	org: Organization;
	checkoutStatus?: CheckoutStatus;
}

export type Handlers = {
	createCheckoutSession: () => Promise<string | undefined>;
	checkActiveSubscription: () => Promise<Subscription | undefined>;
};

export const load = (async ({ parent, fetch, data, url }): Promise<PageData & Handlers> => {
	await parent();
	const { baseHeaders, baseUrl, org } = data;

	// Get checkout status
	const checkoutStatus: CheckoutStatus = (url.searchParams.get('status') as CheckoutStatus) || null;

	async function createCheckoutSession(): Promise<string | undefined> {
		const res = await new BillingApi(
			createDefaultContext(fetch, baseHeaders, baseUrl)
		).checkoutSession();
		if (!res) return undefined;
		return res.session.url;
	}

	async function createPortalSession(): Promise<string | undefined> {
		const res = await new BillingApi(
			createDefaultContext(fetch, baseHeaders, baseUrl)
		).portalSession();
		if (!res) return undefined;
		return res.session.url;
	}

	async function checkActiveSubscription(): Promise<Subscription | undefined> {
		const res = await new BillingApi(createDefaultContext(fetch, baseHeaders, baseUrl)).active();
		if (!res || !res.subscription) return undefined;
		return res;
	}

	const handlers = {
		createCheckoutSession,
		createPortalSession,
		checkActiveSubscription
	};

	return {
		...handlers,
		...(org && { org }),
		...(checkoutStatus && { checkoutStatus })
	};
}) satisfies PageLoad;
