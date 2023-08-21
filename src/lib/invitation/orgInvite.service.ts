import { InvitationOrgApi } from "$lib/api/invitation-org";
import { InvitationUserApi } from "$lib/api/invitation-user";
import type { httpContext } from "$lib/http/context";
import type { Invitation } from "$lib/types";

export const ORG_INVITATION_SERVICE_CONTEXT_NAME = "service.invitation.org";

export interface OrgInvitationService {
    createInvite: (email: string) => Promise<Invitation>;
    deleteInvite: (publicId: string) => Promise<void>;
    getInvites: () => Promise<Invitation[]>;
};

export const createOrgInviteService = (context: httpContext): OrgInvitationService => {
    const orgApi = new InvitationOrgApi(context);
    return {
        createInvite: function(email: string): Promise<Invitation> {
            return orgApi.create({ invitedEmail: email });
        },
        deleteInvite: function(publicId: string): Promise<void> {
            return orgApi.delete(publicId);
        },
        getInvites: function(): Promise<Invitation[]> {
            return orgApi.list();
        }
    }
}