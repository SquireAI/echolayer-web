import { BaseApi, ENDPOINT } from './baseApi';

export type CheckoutSession = {
	session: {
		url: string;
	};
};

export type Subscription = {
	subscription: {
		status: string;
	};
};

export class BillingApi extends BaseApi<any> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.billing;
	}

	public async checkoutSession(): Promise<CheckoutSession | undefined> {
		try {
			const res = await this.httpClient.fetchPOST('checkout', undefined, {});
			const body = await res.json();
			return { session: body.session } as CheckoutSession;
		} catch (err) {
			return undefined;
		}
	}

	public async active(): Promise<Subscription | undefined> {
		try {
			const res = await this.httpClient.fetchGET('active');
			const body = await res.json();
			return { subscription: body.subscription } as Subscription;
		} catch (err) {
			return undefined;
		}
	}
}
