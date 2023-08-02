import type { ComponentType } from "svelte";
import type {Readable, Subscriber, Unsubscriber, Updater } from "svelte/store";

export enum EntityTypes {
	TEAM = "Team",
	COMPONENT = "Component",
	MEMBER = "Member",
}
export interface BaseEntity {
	publicId: string;
	name: string;
	metadata: any;
	type: EntityTypes;
	links: Link[];
}

export interface Link {
	name: string;
	url: string;
}

export interface GraphBaseEntity extends BaseEntity {
	isOrigin: boolean;
	isSelected: boolean;
}

export interface Member extends BaseEntity {
	email: string;
}

export interface TeamEntity extends BaseEntity {
	type: EntityTypes.TEAM;
	members: Member[];
}

export interface GraphTeamEntity extends TeamEntity, GraphBaseEntity {
	type: EntityTypes.TEAM;
};

export type Organization = {
	id: number;
	publicId: string;
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
	type: EntityTypes.COMPONENT;
	organizationId: number;
};

export interface GraphComponentEntity extends ComponentEntity, GraphBaseEntity {
	type: EntityTypes.COMPONENT;
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
export interface StoreOrganizationsEntity extends BaseStoreEntity<Organization[]> {};
export interface StoreComponentEntity extends BaseStoreEntity<ComponentEntity[]> {};
export interface StoreOriginEntity extends BaseStoreEntity<BaseEntity> {};
export interface StoreEntityRelationship extends BaseStoreEntity<RelationGraphEntity[]> {};
export interface StoreTeamEntity extends BaseStoreEntity<TeamEntity[]> {};
export interface StoreSelectedEntity extends BaseStoreEntity<TeamEntity|ComponentEntity> {};

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

export interface OrganizationsStore extends BaseStore<Organization[], StoreOrganizationsEntity> {
	setOrganizations: (org: Organization[]) => void;
	updateOrganizations: (org: Organization[]) => void;
	addOrganization: (org: Organization) => void;
}

export interface ComponentStore extends BaseStore<ComponentEntity[], StoreComponentEntity> {
	setComponents: (components: ComponentEntity[]) => void;
}

export interface OriginStore extends BaseStore<BaseEntity, StoreOriginEntity> {
	setEntity: (entity: BaseEntity) => void;
}

export interface EntityRelationshipStore extends BaseStore<RelationGraphEntity[], StoreEntityRelationship> {
	setEntityRelationships: (entityRelationships: RelationGraphEntity[]) => void;
}

export interface TeamStore extends BaseStore<TeamEntity[], StoreTeamEntity> {
	setTeams: (teams: TeamEntity[]) => void;
}

export interface SelectedStore extends BaseStore<BaseEntity, StoreSelectedEntity> {
	setEntity: (entity: TeamEntity|ComponentEntity) => void;
}

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

export type TeamAndComponentData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
}

export const AnchorConnectionTypes = {
	INPUT: "INPUT",
	OUTPUT: "OUTPUT"
};

export type AnchorConnectionType = typeof AnchorConnectionTypes[keyof typeof AnchorConnectionTypes];

/**
 * [relationshipName, [nodeId, anchorId]]
 */
export type AnchorConnectionTuple = [string, [string, string]];

export type NodeAnchorConnectionTuple = Array<[string | number, string | number] | string | number | null>;

export type NodeCoordinates = {
	x: number;
	y: number;
};

export type NodeMetadata = {
	origin: NodeCoordinates;
	nodeType: ComponentType;
	node: GraphBaseEntity;
	inputConnections: AnchorConnectionTuple[];
	outputConnections: AnchorConnectionTuple[];
};

export type NodeMetadataTuple = [string, NodeMetadata];

export type LeveledNodeLayout = Array<NodeMetadataTuple[]>;

export const ANCHOR_EDGE_NAMES_CONTEXT_KEY = "anchor-edge-names";