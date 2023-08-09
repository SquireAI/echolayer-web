import type { AnchorConnectionData, AnchorConnectionType } from '$lib/types';

export function getConnectionForNode(
	nodeId: string,
	connectionType: AnchorConnectionType,
	relationshipName: string
): AnchorConnectionData {
	return {
		relationshipName,
		connection: [getNodeId(nodeId), getAnchorId(nodeId, connectionType)]
	};
}

export const getNodeId = (publicId: string) => `node_${publicId}`;

export const getAnchorId = (publicId: string, anchorConnectionType: AnchorConnectionType) =>
	`anchor-node_${publicId}-${anchorConnectionType.toLocaleLowerCase()}-anchor`;
