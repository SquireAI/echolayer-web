import type {Readable, Subscriber, Unsubscriber, Updater } from "svelte/store";

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
	organizationId: number;
	description: string;
	resolved: boolean;
};

export interface ComponentEntity extends BaseEntity {
	organizationId: number;
};

export interface RelationEntity {
	publicId: string;
	source: BaseEntity;
	target: BaseEntity;
}

export interface RelationGraphEntity {
	publicId: string;
	sourcePublicId: string;
	targetPublicId: string;
}

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
export interface StoreComponentEntity extends BaseStoreEntity<ComponentEntity[]> {
	selected?: ComponentEntity;
};

interface BaseStore<T, U extends BaseStoreEntity<T>> {
	subscribe: (this: void, run: Subscriber<U>) => Unsubscriber;
	update: (this: void, updater: Updater<U>) => void;
	set: (this: void, value: U) => void;
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

export interface ComponentStore extends BaseStore<ComponentEntity[], StoreComponentEntity> {
	setComponents: (components: ComponentEntity[]) => void;
	setOrigin: (origin: ComponentEntity) => void;
	origin: Readable<ComponentEntity | undefined>;
}

export type OrgAndUserData = {
	user: User;
	org: Organization;
}

export type OriginAndComponentData = {
	origin?: ComponentEntity;
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	relations?: RelationGraphEntity[];
}
