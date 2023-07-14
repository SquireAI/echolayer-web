import { AnchorConnectionTypes, type AnchorConnectionTuple, type BaseEntity, type EntityRelationship, type NodeMetadata, type NodeCoordinates, type LeveledNodeLayout } from "$lib/types";
import type { ComponentType } from "svelte";
import TeamEntityNode from "./components/TeamEntityNode.svelte";
import ComponentEntityNode from "./components/ComponentEntityNode.svelte";
import { getConnectionForNode } from "./components/anchors";

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
export function layout(nodes: BaseEntity[], entityRelationships: EntityRelationship[], sourcePublicId: string, depth: number = 2): LeveledNodeLayout {
	const sourceNode: BaseEntity | undefined = nodes.find((n) => n.publicId === sourcePublicId);

	if (!sourceNode) {
		throw new Error("Could not find a node for given sourcePublicId");
	}

	// set the origin as our source nodes to begin with
	let sourceNodes: BaseEntity[] = [sourceNode];

	// we're going to build an array of rows so we know how to render this
	// the nodes in the first index are the top, the next index are nodes that are targets for the 
	// preview row, etc.
	const rowNodes: BaseEntity[][] = [];

	// As we calculate connections for nodes, we'll collect them in this map
	const nodeConnections: NodeConnections = new Map();

	/**
	 * Traverse down a given depth to find the targets of source nodes. Each iteration will set a new
	 * collection of source nodes from target nodes for given iteration and the next iteration will
	 * then figure out their target nodes until the depth condition is met
	 */
	for (let i = 0; i <= depth; i++) {
		rowNodes[i] = sourceNodes;
		const sourcePublicIds = sourceNodes.map((s) => s.publicId);
		const targetPublicIds = entityRelationships
			.filter((n) => sourcePublicIds.some((spid) => spid === n.sourcePublicId))
			.map((rel) => rel.targetPublicId);
		const targetNodes: BaseEntity[] = targetPublicIds
			.map((publicId) => nodes.find((n) => n.publicId === publicId))
			.filter((n): n is BaseEntity => !!n);

		// Make the bi-directional connections for source nodes and their targets
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
		});

		// Set the target nodes to be the source nodes for the next iteration
		sourceNodes = [...targetNodes];
	}
	
	// a collection of row indices of rowNodes that tell us which index has the most rows in DESC
	const largestRowIndicesDesc: number[] = getRowIndicesDesc(rowNodes);
	
	// This map will collect origins and other node metadata as we uncover them
	const nodesMap: NodeLayoutMap = getNodeConnections(largestRowIndicesDesc, rowNodes, nodeConnections, depth);

	// We need to return a collection of rows of nodes, starting from the top down
	// This is needed so that svelvet can properly render edges from source to target
	const leveled: LeveledNodeLayout = rowNodes.map((nodes) => {
		return nodes.map((node) => ([node.publicId, nodesMap.get(node.publicId)!]));
	});
	return leveled;
}

/**
	 * Calculate the origins for each node.
	 * We start with the row that has the most nodes and then use its width
	 * to center the nodes of other rows
	 */
function getNodeConnections(rowIndices: number[], rowNodes: BaseEntity[][], nodeConnections: NodeConnections, depth: number): NodeLayoutMap {
	const rowWidths: number[] = [...Array(depth).keys()].map((_) => 0);
	let maxRowWidth = rowWidths[0];
	const nodesMap: NodeLayoutMap = new Map();
	for (const rowIndex of rowIndices) {
		let rowWidth: number = 0;
		const rowEntities: BaseEntity[] = rowNodes[rowIndex];
		const rowY = rowIndex !== 0 ? (rowIndex * NODE_HEIGHT) + ROW_GAP : 0;
		const nodeOrigins: NodeOrigin[] = rowEntities.map((entity, index) => {
			// since we're centering things, we need to know how much to shift rows from the left against the largest row
			const rowStartOffset = getRowXOffset(maxRowWidth, rowNodes[rowIndices[0]].length, rowNodes[rowIndex].length);
			const rowX = (index * NODE_WIDTH) + (Number(!!index) * COLUMN_GAP) + rowStartOffset;
			rowWidth = rowX >= COLUMN_GAP ? rowX - COLUMN_GAP : 0;
			return { publicId: entity.publicId, origin: { x: rowX, y: rowY }, nodeType: entity.type === "team" ? TeamEntityNode : ComponentEntityNode };
		});
		rowWidths[rowIndex] = rowWidth;
		maxRowWidth = maxRowWidth < rowWidth ? rowWidth : maxRowWidth;
		
		nodeOrigins.forEach((nodeOrigin) => {
			const pid = nodeOrigin.publicId;
			nodesMap.set(pid, { 
				origin: nodeOrigin.origin,
				inputConnections: nodeConnections.get(pid)?.inputConnections || [],
				outputConnections: nodeConnections.get(pid)?.outputConnections || [],
				nodeType: nodeOrigin.nodeType,
				node: rowEntities.find((n) => n.publicId === pid)! });
		});
	}
	return nodesMap;
}

// returns list of indices from rows with greatest to smallest number or entities per row
function getRowIndicesDesc(rowNodes: BaseEntity[][]): number[] {
	const numNodesPerRow: [number, number][] = rowNodes.map((row, index) => ([index, row.length]));
	const sortedNumNodesPerRow = numNodesPerRow.sort(([_indexA, sizeA], [_indexB, sizeB]) => sizeB - sizeA);
	return sortedNumNodesPerRow.map(([index, _]) => index);
}

function getRowXOffset(maxRowWidth: number, numMaxRowEntities: number, currentRowNumEntities: number): number {
	if (maxRowWidth === 0) {
		return 0;
	}
	return (maxRowWidth / 2) + (((numMaxRowEntities - 1) * COLUMN_GAP) / 2) - (((currentRowNumEntities - 1) * COLUMN_GAP) / 2);
}
