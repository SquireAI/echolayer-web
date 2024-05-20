import { BaseApi, ENDPOINT } from './baseApi';

export type CheckoutSession = {
	session: { url: string };
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
}
