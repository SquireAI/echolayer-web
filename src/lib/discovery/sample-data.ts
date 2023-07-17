import type { ComponentEntity, RelationGraphEntity, TeamEntity } from "$lib/types";

interface Payload {
	teams: TeamEntity[];
	components: ComponentEntity[];
	relations: RelationGraphEntity[];
}

export const data: Payload = {
	teams: [
		{
			name: "The Purple Monkey Dishwashers",
			publicId: "teamdishwashers",
			metadata: {},
			type: "team",
			members: [
				{
					name: "Randy Newman",
					email: "randy@example.com",
					publicId: "memberrandy",
					metadata: {},
					type: "member",
				}
			]
		},
		{
			name: "The Team",
			publicId: "teamteam",
			metadata: {},
			type: "team",
			members: [
				{
					name: "Ash Ketchum",
					email: "ash@example.com",
					publicId: "memberash",
					metadata: {},
					type: "member",
				},
				{
					name: "Skull Kid",
					email: "skullkid@example.com",
					publicId: "memberskullkid",
					metadata: {},
					type: "member",
				},
				{
					name: "Super Mario",
					email: "mario@example.com",
					publicId: "membermario",
					metadata: {},
					type: "member",
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
			type: "component",
		},
		{
			name: "monolith-redis",
			publicId: "componentredis",
			organizationId: 123,
			metadata: {},
			type: "component",
		},
		{
			name: "monolith-postgres",
			publicId: "componentpostgres",
			organizationId: 123,
			metadata: {},
			type: "component",
		}
	],
	relations: [
		{
			publicId: "1",
			sourcePublicId: "teamdishwashers",
			targetPublicId: "componentmonolith",
			relationshipName: "ownerOf",
			depth: 1,
		},
		// {
		// 	publicId: "2",
		// 	sourcePublicId: "componentmonolith",
		// 	targetPublicId: "teamdishwashers",
		// 	relationshipName: "ownedBy",
		// 	depth: 1,
		// },
		{
			publicId: "3",
			sourcePublicId: "teamteam",
			targetPublicId: "componentredis",
			relationshipName: "ownerOf",
			depth: 1,
		},
		// {
		// 	publicId: "4",
		// 	sourcePublicId: "componentredis",
		// 	targetPublicId: "teamteam",
		// 	relationshipName: "ownedBy",
		// 	depth: 1,
		// },
		{
			publicId: "5",
			sourcePublicId: "teamteam",
			targetPublicId: "componentpostgres",
			relationshipName: "ownerOf",
			depth: 1,
		},
		// {
		// 	publicId: "6",
		// 	sourcePublicId: "componentpostgres",
		// 	targetPublicId: "teamteam",
		// 	relationshipName: "ownedBy",
		// 	depth: 1,
		// }
	]
};
