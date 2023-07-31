import { AnchorConnectionTypes, type AnchorConnectionTuple, type BaseEntity, type RelationGraphEntity, type NodeMetadata, type NodeCoordinates, type LeveledNodeLayout, type GraphBaseEntity, EntityTypes } from "$lib/types";
import type { ComponentType } from "svelte";
import TeamEntityNode from "./components/node/TeamEntityNode.svelte";
import ComponentEntityNode from "./components/node/ComponentEntityNode.svelte";
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

const ROW_GAP: number = 60;
const COLUMN_GAP: number = 50;
const NODE_WIDTH: number = 240;
const NODE_HEIGHT: number = 140;
const INITIAL_ROW_OFFSET: number = 40;
const INITIAL_COLUMN_OFFSET: number = 40;

const { INPUT, OUTPUT } = AnchorConnectionTypes;

/**
 * Determines the layout of the graph for a collection of nodes and their relationships, anchored
 * by the node given by sourcePublicId.
 * @param nodes The full collection of nodes we are to render
 * @param entityRelationships The collection of entity relationships
 * @param originPublicId The publicId of the node marked as the origin
 * @param depth The number of levels of connections to layout from the source node
 * @returns A map that provides the details of where to draw nodes and what to connect them to
 */
export function layout(nodes: BaseEntity[], entityRelationships: RelationGraphEntity[], originPublicId: string, depth: number = 2, selectedPublicId?: string): LeveledNodeLayout {
	const sourceNode: BaseEntity | undefined = nodes.find((n) => n.publicId === originPublicId);

	if (!sourceNode) {
		throw new Error("Could not find a node for given sourcePublicId");
	}

	// set the origin as our source nodes to begin with
	let sourceNodes: GraphBaseEntity[] = [{ ...sourceNode, isOrigin: true, isSelected: sourceNode.publicId === selectedPublicId }];

	// we're going to build an array of rows so we know how to render this
	// the nodes in the first index are the top, the next index are nodes that are targets for the 
	// preview row, etc.
	const rowNodes: GraphBaseEntity[][] = [];

	// As we calculate connections for nodes, we'll collect them in this map
	let nodeConnections: NodeConnections = new Map();

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
		const targetNodes: GraphBaseEntity[] = targetPublicIds
			.map((publicId) => nodes.find((n) => n.publicId === publicId))
			.filter((n): n is BaseEntity => !!n)
			.map((n) => ({ ...n, isOrigin: false, isSelected: n.publicId === selectedPublicId })); // set if the node isSelected here!!

		// Make the bi-directional connections for source nodes and their targets
		const rowNodeConnections: [string, Connections][] = getNodeConnections(sourcePublicIds, entityRelationships);
		// Update our overall understanding of node connections as we uncover them at each row depth
		nodeConnections = updateNodeConnections(rowNodeConnections, nodeConnections);

		// Set the target nodes to be the source nodes for the next iteration
		sourceNodes = [...targetNodes];
	}
	
	// a collection of row indices of rowNodes that tell us which index has the most rows in DESC
	const largestRowIndicesDesc: number[] = getRowIndicesDesc(rowNodes);
	
	// This map will collect origins and other node metadata as we uncover them
	const nodesMap: NodeLayoutMap = positionNodes(largestRowIndicesDesc, rowNodes, nodeConnections, depth);

	// We need to return a collection of rows of nodes, starting from the top down
	// This is needed so that svelvet can properly render edges from source to target
	const leveled: LeveledNodeLayout = rowNodes.map((nodes) => {
		return nodes.map((node) => ([node.publicId, nodesMap.get(node.publicId)!]));
	});
	return leveled;
}

/**
 * Takes the newly discovered source and target connections for a given row of nodes and updates the full
 * collection of node connections as we uncover them at each level
 * @param rowNodeConnections The current input and output node connections for a give row
 * @param nodeConnections The current input and output connections we're tracking for all nodes
 * @returns The node connections (input and output) for a set of row nodes
 */
function updateNodeConnections(rowNodeConnections: [string, Connections][], nodeConnections: NodeConnections): NodeConnections {
	rowNodeConnections.forEach((rowNodeConn) => {
		const [ publicId, connections ] = rowNodeConn;
		const currentNodeConnections = nodeConnections.get(publicId) || { inputConnections: [], outputConnections: [] };
		currentNodeConnections.inputConnections = currentNodeConnections.inputConnections.concat(connections.inputConnections);
		currentNodeConnections.outputConnections = currentNodeConnections.outputConnections.concat(connections.outputConnections);
		nodeConnections.set(publicId, currentNodeConnections);
	});
	return nodeConnections;
}

/**
 * Generates the bi-directional connections from source node to target node anchors.
 * Each source to target connection has the reciprocal target to source connection made as well
 * @param sourcePublicIds The public ids of the source nodes we want to establish target connections to
 * @param entityRelationships The full set of entity source to target relationships to search through
 * @returns collection of tuples that tell us the collection of input and output connections for a node
 */
function getNodeConnections(sourcePublicIds: string[], entityRelationships: RelationGraphEntity[]): [string, Connections][] {
	const nodeConnections: Map<string, Connections> = new Map();

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

	return Array.from(nodeConnections.entries());
}

/**
	 * Calculate the origins for each node.
	 * We start with the row that has the most nodes and then use its width
	 * to center the nodes of other rows
	 */
function positionNodes(rowIndices: number[], rowNodes: GraphBaseEntity[][], nodeConnections: NodeConnections, depth: number): NodeLayoutMap {
	const rowWidths: number[] = [...Array(depth).keys()].map((_) => 0);
	let maxRowWidth = rowWidths[0];
	const nodesMap: NodeLayoutMap = new Map();
	for (const rowIndex of rowIndices) {
		let rowWidth: number = 0;
		const rowEntities: GraphBaseEntity[] = rowNodes[rowIndex];
		const rowY = rowIndex !== 0 ? INITIAL_ROW_OFFSET + (rowIndex * NODE_HEIGHT) + (rowIndex * ROW_GAP) : INITIAL_ROW_OFFSET;
		const positionedNodes: NodeOrigin[] = rowEntities.map((entity, index) => {
			// since we're centering things, we need to know how much to shift rows from the left against the largest row
			const rowStartOffset = getRowXOffset(maxRowWidth, rowNodes[rowIndices[0]].length, rowNodes[rowIndex].length);
			const rowX = INITIAL_COLUMN_OFFSET + (index * NODE_WIDTH) + (Number(!!index) * COLUMN_GAP) + rowStartOffset;
			rowWidth = rowX >= COLUMN_GAP ? rowX - COLUMN_GAP : 0;
			return { publicId: entity.publicId, origin: { x: rowX, y: rowY }, nodeType: entity.type === EntityTypes.TEAM ? TeamEntityNode : ComponentEntityNode };
		});
		rowWidths[rowIndex] = rowWidth;
		maxRowWidth = maxRowWidth < rowWidth ? rowWidth : maxRowWidth;
		
		positionedNodes.forEach((nodeOrigin) => {
			const pid = nodeOrigin.publicId;
			const node = rowEntities.find((n) => n.publicId === pid)!
			nodesMap.set(pid, { 
				origin: nodeOrigin.origin,
				inputConnections: nodeConnections.get(pid)?.inputConnections || [],
				outputConnections: nodeConnections.get(pid)?.outputConnections || [],
				nodeType: nodeOrigin.nodeType,
				node
			});
		});
	}
	return nodesMap;
}

/**
 * Returns an array of numbers that tell us, in descending order, the indeces of the collection of
 * row nodes that have the most nodes.
 * Ex: [2,0,1] tells us that the last, first and then middle index have the most nodes at those indices,
 * respecitvely, for a given rowNodes collection
 * @param rowNodes The collection of row collections of nodes that we are to graph
 * @returns an ordered array of indices from rowNodes about which have to most to least nodes
 */
function getRowIndicesDesc(rowNodes: BaseEntity[][]): number[] {
	const numNodesPerRow: [number, number][] = rowNodes.map((row, index) => ([index, row.length]));
	const sortedNumNodesPerRow = numNodesPerRow.sort(([_indexA, sizeA], [_indexB, sizeB]) => sizeB - sizeA);
	return sortedNumNodesPerRow.map(([index, _]) => index);
}

/**
 * Returns a integer of how many pixels to offset a set of nodes for a given row.
 * Takes into account the widest row and uses it give an x-axis offset of where to lay the x-origin 
 * for number of nodes for the given row.
 * @param maxRowWidth The width of the row with the most nodes
 * @param numMaxRowEntities The number of nodes in a row so we can account for the gaps between nodes
 * @param currentRowNumEntities The number of nodes the current row will need to draw
 * @returns a number to be used for calculating part of the x-axis origin value for nodes in a given row
 */
function getRowXOffset(maxRowWidth: number, numMaxRowEntities: number, currentRowNumEntities: number): number {
	// since we always find the origins for the largest row first, it's implied they don't need an x-offset
	if (maxRowWidth === 0) {
		return 0;
	}
	return (maxRowWidth / 2) + (((numMaxRowEntities - 1) * COLUMN_GAP) / 2) - (((currentRowNumEntities - 1) * COLUMN_GAP) / 2);
}
