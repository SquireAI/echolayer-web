import { InvitationOrgApi } from "$lib/api/invitation-org";
import { InvitationUserApi } from "$lib/api/invitation-user";
import type { httpContext } from "$lib/http/context";
import type { Invitation } from "$lib/types";

export const createOrgInviteService = (context: httpContext) => {
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