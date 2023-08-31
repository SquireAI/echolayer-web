import type { ComponentType, SvelteComponent, SvelteComponentTyped } from 'svelte';
import type { Subscriber, Unsubscriber, Updater } from 'svelte/store';
import type { FetchHeader } from '$lib/api/apiUtils';

export enum EntityTypes {
	TEAM = 'Team',
	COMPONENT = 'Component',
	MEMBER = 'Member'
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

export interface Member extends BaseEntity {
	email: string;
}

export interface TeamEntity extends BaseEntity {
	type: EntityTypes.TEAM;
	members: Member[];
}

export type Organization = {
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
	publicId: string;
	organizationId: number;
	description: string;
	resolved: boolean;
	component: ComponentEntity;
	createdAt: string;
};

export interface ComponentEntity extends BaseEntity {
	type: EntityTypes.COMPONENT;
	organizationId: number;
	relations: RelationEntity[];
}

export interface Invitation {
	publicId: string;
	invitedEmail: string;
	organization: Organization;
	pending: boolean;
}

export const EntityRelationshipNames = {
	OWNER_OF: 'ownerOf',
	OWNED_BY: 'ownedBy',
	COMPONENT_OF: 'componentOf',
	HAS_COMPONENT: 'hasComponent',
	MEMBER_OF: 'memberOf',
	HAS_MEMBER: 'hasMember'
} as const;

export type RelationType = (typeof EntityRelationshipNames)[keyof typeof EntityRelationshipNames];

export interface RelationEntity {
	publicId: string;
	source: BaseEntity;
	target: BaseEntity;
	relationshipName: RelationType;
}

export interface RelationUpdateParams {
	sourcePublicId?: string;
	targetPublicId?: string;
}

export type EntityRelationship = {
	publicId: string;
	sourcePublicId: string;
	targetPublicId: string;
	depth: number;
	relationshipName: RelationType;
};

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
};

export type AccessToken = {
	id: number;
	prefix: string;
	expiresAt: string;
	createdAt: string;
};

export type CreatedAccessToken = AccessToken & { token: string };

interface BaseStoreEntity<T> {
	loading: boolean;
	error: boolean;
	entity?: T;
}

export type StoreUserEntity = BaseStoreEntity<User>;
export type StorePublicId = BaseStoreEntity<string>;
export type StoreOrganizationEntity = BaseStoreEntity<Organization>;
export type StoreOrganizationsEntity = BaseStoreEntity<Organization[]>;
export type StoreComponentEntity = BaseStoreEntity<ComponentEntity[]>;
export type StoreOriginEntity = BaseStoreEntity<GraphedEntity>;
export type StoreEntityRelationship = BaseStoreEntity<RelationGraphEntity[]>;
export type StoreTeamEntity = BaseStoreEntity<TeamEntity[]>;
export type StoreSelectedEntity = BaseStoreEntity<GraphedEntity>;
export type StoreHomeTabIndex = BaseStoreEntity<number>;
export type StoreUserInvitationsEntity = BaseStoreEntity<Invitation[]>;
export type StoreOrgInvitationsEntity = BaseStoreEntity<Invitation[]>;

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

export interface SelectedOrganizationStore
	extends Omit<BaseStore<Organization, StoreOrganizationEntity>, 'set' | 'update'> {
	setOrganization: (publicId: string) => void;
	updateOrganization: (publicId: string) => void;
}

export interface OrganizationsStore extends BaseStore<Organization[], StoreOrganizationsEntity> {
	setOrganizations: (org: Organization[]) => void;
	updateOrganizations: (org: Organization[]) => void;
	addOrganization: (org: Organization) => void;
}

export interface ComponentStore extends BaseStore<ComponentEntity[], StoreComponentEntity> {
	setComponents: (components: ComponentEntity[]) => void;
}

export interface OriginStore extends BaseStore<GraphedEntity, StoreOriginEntity> {
	setEntity: (entity?: GraphedEntity) => void;
}

export interface EntityRelationshipStore
	extends BaseStore<RelationGraphEntity[], StoreEntityRelationship> {
	setEntityRelationships: (entityRelationships: RelationGraphEntity[]) => void;
}

export interface TeamStore extends BaseStore<TeamEntity[], StoreTeamEntity> {
	setTeams: (teams: TeamEntity[]) => void;
}

export interface SelectedStore extends BaseStore<GraphedEntity, StoreSelectedEntity> {
	setEntity: (entity?: GraphedEntity) => void;
}

export interface HomeTabStore extends BaseStore<number, StoreHomeTabIndex> {
	setHomeTabIndex: (index: number) => void;
}

export interface UserInvitationStore extends BaseStore<Invitation[], StoreUserInvitationsEntity> {
	setInvitations: (invitations: Invitation[]) => void;
}

export interface OrgInvitationStore extends BaseStore<Invitation[], StoreUserInvitationsEntity> {
	setInvitations: (invitations: Invitation[]) => void;
}

export type BaseContextData = {
	baseUrl: string;
	baseHeaders: FetchHeader;
};

export type OrgAndUserData = {
	user: User;
	org: Organization;
};

export type OriginAndComponentData = {
	origin?: GraphedEntity;
	selected?: GraphedEntity;
	teams?: TeamEntity[];
	components?: ComponentEntity[];
	relations?: RelationGraphEntity[];
};

export type TeamAndComponentData = {
	teams?: TeamEntity[];
	components?: ComponentEntity[];
};

export const AnchorConnectionTypes = {
	INPUT: 'INPUT',
	OUTPUT: 'OUTPUT'
};

export type AnchorConnectionType =
	(typeof AnchorConnectionTypes)[keyof typeof AnchorConnectionTypes];

export type AnchorConnectionData = {
	relationshipName: string;
	connection: [string, string];
};

export type NodeAnchorConnectionTuple = Array<
	[string | number, string | number] | string | number | null
>;

export type NodeCoordinates = {
	x: number;
	y: number;
};

export type NodeMetadata = {
	origin: NodeCoordinates;
	nodeType: ComponentType;
	node: GraphedEntity;
	inputConnections: AnchorConnectionData[];
	outputConnections: AnchorConnectionData[];
	owners?: BaseEntity[];
};

export type NodeMetadataTuple = [string, NodeMetadata];

export type LeveledNodeLayout = Array<NodeMetadataTuple[]>;

export type GraphedEntity = TeamEntity | ComponentEntity;

export const SVELVET_INTERNAL_EDGE_STORE = 'edge';

export const SVELVET_INTERNAL_NODE_STORE = 'node';

export type DetailProperty = {
	title: string;
	value: string;
	status?: 'warning' | 'error';
	fieldIcon?: ComponentType;
	itemIcon?: ComponentType;
	classes?: string;
	clickHandler?: () => Promise<void> | void;
};
