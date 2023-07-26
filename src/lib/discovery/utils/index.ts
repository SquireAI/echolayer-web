import type { BaseEntity, LeveledNodeLayout, NodeMetadataTuple } from "$lib/types";

export function getAvatarInitials(fullName: string): string {
	return fullName.trim().split(/\s+/).map((part) => part[0]).join("").toUpperCase();
};

export function setOriginOnNodeLayout(nodeLayout: LeveledNodeLayout, originPublicId: string): LeveledNodeLayout {
	return nodeLayout.map((row) => {
		return row.map(([publicId, nodeMetadata]) => {
			const metadata = {...nodeMetadata, node: {...nodeMetadata.node, isOrigin: (originPublicId === publicId ? true : false) }}
			return <NodeMetadataTuple>[publicId, metadata];
		})
	});
}
