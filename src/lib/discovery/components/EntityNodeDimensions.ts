const EntityNodeTypes = {
	COMPONENT: "COMPONENT",
	TEAM: "TEAM"
};

export type EntityNodeType = typeof EntityNodeTypes[keyof typeof EntityNodeTypes];

type NodeDimensions = {
	width: number; 
	height: number;
};

type EntityNodeDimensions = {
	type: EntityNodeType;
	dimensions: NodeDimensions;
}

export const dimensions: EntityNodeDimensions[] = [
	{ type: EntityNodeTypes.COMPONENT, dimensions: { width: 0, height: 0 }},
	{ type: EntityNodeTypes.TEAM, dimensions: { width: 0, height: 0 }},
];

export function getDimensionsForNode(type: EntityNodeType): NodeDimensions | undefined {
	return dimensions.find((d) => d.type === type)?.dimensions;
}
