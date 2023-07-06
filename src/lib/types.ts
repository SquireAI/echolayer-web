import type {Readable, Updater, Writable} from "svelte/store";

export interface BaseEntity {
	publicId: string;
	name: string;
	metadata: any;
}

export interface Member extends BaseEntity {
	email: string;
};

export interface Team extends BaseEntity {
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

export interface Component extends BaseEntity {
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

export interface UserEntity extends BaseStoreEntity<User> {};
export interface OrganizationEntity extends BaseStoreEntity<Organization> {};
export interface ComponentEntity extends BaseStoreEntity<Component[]> {
	selected?: Component;
};

interface BaseStore<T, U extends BaseStoreEntity<T>> {
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
	setOrigin: (origin: Component) => void;
	origin: Readable<Component | undefined>;
}

export type OrgAndUserData = {
	user: User;
	org: Organization;
}
