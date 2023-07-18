import type { ComponentType } from "svelte";
import type {Readable, Subscriber, Unsubscriber, Updater } from "svelte/store";

export interface BaseEntity {
	publicId: string;
	name: string;
	metadata: any;
	type: "team" | "component" | "member";
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

export const EntityRelationshipNames = {
	OWNER_OF: "ownerOf",
	OWNED_BY: "ownedBy",
	COMPONENT_OF: "componentOf",
	HAS_COMPONENT: "hasComponent",
	MEMBER_OF: "memberOf",
	HAS_MEMBER: "hasMember",
} as const;

export type RelationType = typeof EntityRelationshipNames[keyof typeof EntityRelationshipNames];

export interface RelationEntity {
	publicId: string;
	source: BaseEntity;
	target: BaseEntity;
	relationshipName: RelationType;
}

export type EntityRelationship = {
	publicId: string;
	sourcePublicId: string;
	targetPublicId: string;
	depth: number;
	relationshipName: RelationType;
}

export interface RelationGraphEntity {
	publicId: string;
	sourcePublicId: string;
	targetPublicId: string;
	relationshipName: RelationType;
	depth: number;
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
export interface StoreComponentEntity extends BaseStoreEntity<ComponentEntity[]> {};
export interface StoreOriginComponentEntity extends BaseStoreEntity<ComponentEntity> {};

export interface StoreEntityRelationship extends BaseStoreEntity<RelationGraphEntity[]> {};

export interface StoreTeamEntity extends BaseStoreEntity<TeamEntity[]> {};

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
}

export interface OriginComponentStore extends BaseStore<ComponentEntity, StoreOriginComponentEntity> {
	setComponent: (component: ComponentEntity) => void;
}

export interface EntityRelationshipStore extends BaseStore<RelationGraphEntity[], StoreEntityRelationship> {
	setEntityRelationships: (entityRelationships: RelationGraphEntity[]) => void;
}

export interface TeamStore extends BaseStore<TeamEntity[], StoreTeamEntity> {
	setTeams: (teams: TeamEntity[]) => void;
};

export type OrgAndUserData = {
	user: User;
	org: Organization;
}

export type OriginAndComponentData = {
	origin?: BaseEntity;
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	relations?: RelationGraphEntity[];
}
export const AnchorConnectionTypes = {
	INPUT: "INPUT",
	OUTPUT: "OUTPUT"
};

export type AnchorConnectionType = typeof AnchorConnectionTypes[keyof typeof AnchorConnectionTypes];

export type AnchorConnectionTuple = [string, string];

export type NodeAnchorConnectionTuple = Array<[string | number, string | number] | string | number | null>;

export type NodeCoordinates = {
	x: number;
	y: number;
};

export type NodeMetadata = {
	origin: NodeCoordinates;
	nodeType: ComponentType;
	node: BaseEntity;
	inputConnections: AnchorConnectionTuple[];
	outputConnections: AnchorConnectionTuple[];
};

type NodeMetadataTuple = [string, NodeMetadata];

export type LeveledNodeLayout = Array<NodeMetadataTuple[]>;
