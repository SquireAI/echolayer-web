import type { BaseEntity, Component, Team } from "$lib/types";

type RelationType = "ownerOf" | "hasOwner";

interface Relation {
	source: Pick<BaseEntity, "publicId">;
	target: Pick<BaseEntity, "publicId">;
	relation: RelationType;
}

interface Payload {
	teams: Team[];
	components: Component[];
	relations: Relation[];
}

export const data: Payload = {
	teams: [
		{
			name: "The Purple Monkey Dishwashers",
			publicId: "teamdishwashers",
			metadata: {},
			members: [
				{
					name: "Randy Newman",
					email: "randy@example.com",
					publicId: "memberrandy",
					metadata: {},
				}
			]
		},
		{
			name: "The Team",
			publicId: "teamteam",
			metadata: {},
			members: [
				{
					name: "Ash Ketchum",
					email: "ash@example.com",
					publicId: "memberash",
					metadata: {},
				},
				{
					name: "Skull Kid",
					email: "skullkid@example.com",
					publicId: "memberskullkid",
					metadata: {},
				},
				{
					name: "Super Mario",
					email: "mario@example.com",
					publicId: "membermario",
					metadata: {},
				}
			]
		}
	],
	components: [
		{
			name: "monolith-service",
			publicId: "componentmonolith",
			organizationId: 123,
			metadata: {},
		},
		{
			name: "monolith-redis",
			publicId: "componentredis",
			organizationId: 123,
			metadata: {},
		},
		{
			name: "monolith-postgres",
			publicId: "componentpostgres",
			organizationId: 123,
			metadata: {},
		}
	],
	relations: [
		{
			source: {
				publicId: "teamdishwashers"
			},
			target: {
				publicId: "componentmonolith"
			},
			relation: "ownerOf"
		},
		{
			source: {
				publicId: "componentmonolith"
			},
			target: {
				publicId: "teamdishwashers"
			},
			relation: "hasOwner"
		},
		{
			source: {
				publicId: "teamteam"
			},
			target: {
				publicId: "componentredis"
			},
			relation: "ownerOf"
		},
		{
			source: {
				publicId: "componentredis"
			},
			target: {
				publicId: "teamteam"
			},
			relation: "hasOwner"
		},
		{
			source: {
				publicId: "teamteam"
			},
			target: {
				publicId: "componentpostgres"
			},
			relation: "ownerOf"
		},
		{
			source: {
				publicId: "componentpostgres"
			},
			target: {
				publicId: "teamteam"
			},
			relation: "hasOwner"
		}
	]
};
