import { AnchorConnectionTypes, type AnchorConnectionTuple, type BaseEntity, type EntityRelationship } from "$lib/types";
import type { ComponentType } from "svelte";
import TeamEntityNode from "./components/TeamEntityNode.svelte";
import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
import { getAnchorId, getConnectionForNode, getNodeId } from "./components/anchors";

type NodeCoordinates = {
	x: number;
	y: number;
}
type NodeMetadata = {
	origin: NodeCoordinates;
	nodeType: ComponentType;
	node: BaseEntity;
	inputConnections: AnchorConnectionTuple[];
	outputConnections: AnchorConnectionTuple[];
}

type NodeLayoutMap = Map<string, NodeMetadata>;

type NodeOrigin = {
	publicId: string;
	nodeType: ComponentType;
	origin: NodeCoordinates;
};

type Connections = {
	inputConnections: AnchorConnectionTuple[];
	outputConnections: AnchorConnectionTuple[];
};

type NodeConnections = Map<string, Connections>;

const ROW_GAP: number = 120;
const COLUMN_GAP: number = 50;
const NODE_WIDTH: number = 240;
const NODE_HEIGHT: number = 140;

const { INPUT, OUTPUT } = AnchorConnectionTypes;

/**
 * Determines the layout of the graph for a collection of nodes and their relationships, anchored
 * by the node given by sourcePublicId.
 * @param nodes The full collection of nodes we are to render
 * @param entityRelationships The collection of entity relationships
 * @param sourcePublicId The publicId of the node marked as the origin
 * @param depth The number of levels of connections to layout from the source node
 * @returns A map that provides the details of where to draw nodes and what to connect them to
 */
export function layout(nodes: BaseEntity[], entityRelationships: EntityRelationship[], sourcePublicId: string, depth: number = 2): NodeLayoutMap {
	const sourceNode: BaseEntity | undefined = nodes.find((n) => n.publicId === sourcePublicId);

	if (!sourceNode) {
		throw new Error("Could not find a node for given sourcePublicId");
	}

	let sourceNodes: BaseEntity[] = [sourceNode];

	const rowNodes: BaseEntity[][] = [];

	const nodeConnections: NodeConnections = new Map();
	const resp: NodeLayoutMap = new Map();

	// sets the current source nodes for a given level and sets their targets as the next source nodes
	for (let i = 0; i <= depth; i++) {
		rowNodes[i] = sourceNodes;
		const sourcePublicIds = sourceNodes.map((s) => s.publicId);
		const targetPublicIds = entityRelationships
			.filter((n) => sourcePublicIds.some((spid) => spid === n.sourcePublicId))
			.map((rel) => rel.targetPublicId);
		const targetNodes: BaseEntity[] = targetPublicIds
			.map((publicId) => nodes.find((n) => n.publicId === publicId))
			.filter((n): n is BaseEntity => !!n);

		// Make the connections
		sourcePublicIds.forEach((spid) => {
			const targetPublicIds = entityRelationships
			.filter((n) =>  n.sourcePublicId === spid)
			.map((rel) => rel.targetPublicId);

			const sourceOutputConns: AnchorConnectionTuple[] = targetPublicIds.map((tpid) => (getConnectionForNode(tpid, INPUT)));
			const nodeConns = nodeConnections.get(spid) || { inputConnections: [], outputConnections: [] };
			nodeConns.outputConnections = nodeConns.outputConnections.concat(sourceOutputConns);
			nodeConnections.set(spid, nodeConns);

			targetPublicIds.forEach((tpid) => {
				const nodeConns = nodeConnections.get(tpid) || { inputConnections: [], outputConnections: [] };
				nodeConns.inputConnections = nodeConns.inputConnections.concat([getConnectionForNode(spid, OUTPUT)]);
				nodeConnections.set(tpid, nodeConns);
			});
		})

		// Set the target nodes to be the source nodes for the next iteration
		sourceNodes = [...targetNodes];
	}

	// let's track how wide each row is. Each index corresponds to the rowNodes index for a given row
	const rowWidths: number[] = [0, 0, 0];
	
	// a collection of row indices of rowNodes that tell us which index has the most rows in DESC
	const rowIndicesDesc = getRowIndicesDesc(rowNodes);

	// track the maximum width of a row. We'll use this to centre less-wide rows
	let maxRowWidth = rowWidths[0];
	
	// let's calculate their positions
	for (const rowIndex of rowIndicesDesc) {
		let rowWidth: number = 0;
		const rowEntities: BaseEntity[] = rowNodes[rowIndex];
		const rowY = rowIndex !== 0 ? (rowIndex * NODE_HEIGHT) + ROW_GAP : 0;
		const nodeOrigins: NodeOrigin[] = rowEntities.map((entity, index) => {
			// since we're centering things, we need to know how much to shift rows from the left against the largest row
			const rowStartOffset = getRowXOffset(maxRowWidth, rowNodes[rowIndicesDesc[0]].length, rowNodes[rowIndex].length);
			const rowX = (index * NODE_WIDTH) + (Number(!!index) * COLUMN_GAP) + rowStartOffset;
			rowWidth = rowX >= COLUMN_GAP ? rowX - COLUMN_GAP : 0;
			return { publicId: entity.publicId, origin: { x: rowX, y: rowY }, nodeType: entity.type === "team" ? TeamEntityNode : ComponentEntityNode };
		});
		rowWidths[rowIndex] = rowWidth;
		maxRowWidth = maxRowWidth < rowWidth ? rowWidth : maxRowWidth;
		
		nodeOrigins.forEach((nodeOrigin) => {
			const pid = nodeOrigin.publicId;
			resp.set(pid, { 
				origin: nodeOrigin.origin,
				inputConnections: nodeConnections.get(pid)?.inputConnections || [],
				outputConnections: nodeConnections.get(pid)?.outputConnections || [],
				nodeType: nodeOrigin.nodeType,
				node: nodes.find((n) => n.publicId === pid)! });
		});

		// TODO set the input and output connections
	}
	console.log(resp);
	return resp;
}

type IndexToCount = [number, number];

// returns list of indices from rows with greatest to smallest number or entities per row
function getRowIndicesDesc(rowNodes: BaseEntity[][]): number[] {
	const foo: IndexToCount[] = rowNodes.map((row, index) => ([index, row.length]));
	const bar = foo.sort(([_indexA, sizeA], [_indexB, sizeB]) => sizeB - sizeA);
	return bar.map(([index, _]) => index);
}

function getRowXOffset(maxRowWidth: number, numMaxRowEntities: number, currentRowNumEntities: number): number {
	if (maxRowWidth === 0) {
		return 0;
	}
	return (maxRowWidth / 2) + (((numMaxRowEntities - 1) * COLUMN_GAP) / 2) - (((currentRowNumEntities - 1) * COLUMN_GAP) / 2);
}
