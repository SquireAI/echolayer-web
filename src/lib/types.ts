import type { Updater, Writable } from "svelte/store";

export type Member = {
	id: number;
	name: string;
};

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

export type Component = {
	id: number;
	organizationId: number;
	name: string;
	metadata: any;
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

export type CreatedAccessToken = AccessToken & { token: string }

interface BaseEntity<T> {
	loading: boolean;
	error: boolean;
	entity?: T
}

export interface UserEntity extends BaseEntity<User> {};
export interface OrganizationEntity extends BaseEntity<Organization> {};
export interface ComponentEntity extends BaseEntity<Component[]> {};

interface BaseStore<T, U extends BaseEntity<T>> {
	subscribe: Writable<U>["subscribe"];
	update: (this: void, updater: Updater<U>) => void;
	clear: () => void;
	setLoading: (isLoading: boolean) => void;
	setError: (isError: boolean) => void;
}

export interface UserStore extends BaseStore<User, UserEntity> {
	setUser: (user: User) => void;
	updateUser: (user: User) => void;
}

export interface OrganizationStore extends BaseStore<Organization, OrganizationEntity> {
	setOrganization: (org: Organization) => void;
	updateOrganization: (org: Organization) => void;
}

export interface ComponentStore extends BaseStore<Component[], ComponentEntity> {
	setComponents: (components: Component[]) => void;
}