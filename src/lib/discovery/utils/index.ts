export function getAvatarInitials(fullName: string): string {
	return fullName.trim().split(/\s+/).map((part) => part[0]).join("").toUpperCase();
};
