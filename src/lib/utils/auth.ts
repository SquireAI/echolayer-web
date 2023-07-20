import type { RedirectPath } from "./paths";
import {AuthApi} from "$lib/api/auth";
import {CREATE_ORG_PATH, INVALIDATED_SIGN_IN_PATH} from "./paths";
import type {Organization} from "$lib/types";
import {OrganizationApi} from "$lib/api/organization";
import {error, HttpError, redirect} from "@sveltejs/kit";
import {ErrorMessageTypes} from "$lib/error";
import type {httpContext} from "$lib/http/context";

export const authRequired = async (context: httpContext) => {
    // Check if user is authenticated
    try {
        await new AuthApi(context).checkAuth();
    } catch (err) {
        throw redirect(307, INVALIDATED_SIGN_IN_PATH);
    }

    // Check if user has any organizations
    let orgs: Organization[] = [];
    try {
        orgs = orgs.concat(await new OrganizationApi(context).list());
    } catch (err) {
        if ((err as HttpError).status === 401) {
            throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
        } else {
            throw error(404, { message: ErrorMessageTypes.GENERIC });
        }
    }

    if (orgs.length < 1) throw redirect(307, CREATE_ORG_PATH);

    return {
        orgs
    }
};
