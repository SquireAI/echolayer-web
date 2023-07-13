import type { AnchorConnectionType, AnchorConnectionTuple } from "$lib/types";

export function getConnectionForNode(nodeId: string, connectionType: AnchorConnectionType): AnchorConnectionTuple {
	return [getNodeId(nodeId), getAnchorId(nodeId, connectionType)];
}

const getNodeId = (publicId: string) => `node_${publicId}`;

const getAnchorId = (publicId: string, anchorConnectionType: AnchorConnectionType) => `anchor-node_${publicId}-${anchorConnectionType.toLocaleLowerCase()}-anchor`;
