import type { Updater, Writable } from "svelte/store";

export interface BaseEntity {
	publicId: string;
	name: string;
	metadata: any;
}

export interface Member extends BaseEntity {
	email: string;
};

export interface TeamEntity extends BaseEntity {
	members: Member[];
}

export type Organization = {
	id: number;
	name: string;
	publicName: string;
	email: string;
	members: Member[];
	createdAt: string;
	updatedAt: string;
};

export type Issue = {
	id: number;
	orgainzationId: number;
	description: string;
	resolved: boolean;
};

export interface ComponentEntity extends BaseEntity {
	organizationId: number;
};

export type User = {
	id: number;
	name: string;
	email: string;
}

export type AccessToken = {
	id: number;
	prefix: string;
	expiresAt: string;
	createdAt: string;
}

export type CreatedAccessToken = AccessToken & { token: string };

interface BaseStoreEntity<T> {
	loading: boolean;
	error: boolean;
	entity?: T
}

export interface StoreUserEntity extends BaseStoreEntity<User> {};
export interface StoreOrganizationEntity extends BaseStoreEntity<Organization> {};
export interface StoreComponentEntity extends BaseStoreEntity<StoreComponentEntity[]> {};

interface BaseStore<T, U extends BaseStoreEntity<T>> {
	subscribe: Writable<U>["subscribe"];
	update: (this: void, updater: Updater<U>) => void;
	clear: () => void;
	setLoading: (isLoading: boolean) => void;
	setError: (isError: boolean) => void;
}

export interface UserStore extends BaseStore<User, StoreUserEntity> {
	setUser: (user: User) => void;
	updateUser: (user: User) => void;
}

export interface OrganizationStore extends BaseStore<Organization, StoreOrganizationEntity> {
	setOrganization: (org: Organization) => void;
	updateOrganization: (org: Organization) => void;
}

export interface ComponentStore extends BaseStore<StoreComponentEntity[], StoreComponentEntity> {
	setComponents: (components: StoreComponentEntity[]) => void;
}

export type OrgAndUserData = {
	user: User;
	org: Organization;
}