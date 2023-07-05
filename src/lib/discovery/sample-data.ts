interface BaseEntity {
	name: string;
	publicId: string
}

interface Member extends BaseEntity {
	email: string;
}

type Team = {
	name: string;
	publicId: string;
	members: Member[];
}

interface Component extends BaseEntity {};

type RelationType = "owner_of" | "has_owner";

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
			members: [
				{
					name: "Randy Newman",
					email: "randy@example.com",
					publicId: "memberrandy"
				}
			]
		},
		{
			name: "The Team",
			publicId: "teamteam",
			members: [
				{
					name: "Ash Ketchum",
					email: "ash@example.com",
					publicId: "memberash"
				},
				{
					name: "Skull Kid",
					email: "skullkid@example.com",
					publicId: "memberskullkid"
				},
				{
					name: "Super Mario",
					email: "mario@example.com",
					publicId: "membermario"
				}
			]
		}
	],
	components: [
		{
			name: "monolith-service",
			publicId: "componentmonolith"
		},
		{
			name: "monolith-redis",
			publicId: "componentredis"
		},
		{
			name: "monolith-postgres",
			publicId: "componentpostgres"
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
			relation: "owner_of"
		},
		{
			source: {
				publicId: "componentmonolith"
			},
			target: {
				publicId: "teamdishwashers"
			},
			relation: "has_owner"
		},
		{
			source: {
				publicId: "teamteam"
			},
			target: {
				publicId: "componentredis"
			},
			relation: "owner_of"
		},
		{
			source: {
				publicId: "componentredis"
			},
			target: {
				publicId: "teamteam"
			},
			relation: "has_owner"
		},
		{
			source: {
				publicId: "teamteam"
			},
			target: {
				publicId: "componentpostgres"
			},
			relation: "owner_of"
		},
		{
			source: {
				publicId: "componentpostgres"
			},
			target: {
				publicId: "teamteam"
			},
			relation: "has_owner"
		}
	]
};
