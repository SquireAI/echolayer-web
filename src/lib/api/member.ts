import type { Member } from '../types';
import { BaseApi, ENDPOINT } from './baseApi';

export class MemberApi extends BaseApi<Member> {
	initializeVariables(): void {
		this.endpoint = ENDPOINT.member;
	}
}
