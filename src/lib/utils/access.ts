import {AuthApi} from "$lib/api/auth";
import {CREATE_ORG_PATH, INVALIDATED_SIGN_IN_PATH} from "./paths";
import type {Organization} from "$lib/types";
import {OrganizationApi} from "$lib/api/organization";
import {error, HttpError, redirect} from "@sveltejs/kit";
import {ErrorMessageTypes} from "$lib/error";
import type {httpContext} from "$lib/http/context";

// User authentication required
export const authRequired = async (context: httpContext): Promise<boolean> => {
    // Check if user is authenticated
    try {
        await new AuthApi(context).checkAuth();
    } catch (err) {
        throw redirect(307, INVALIDATED_SIGN_IN_PATH);
    }
    return true;
};

// Organization required
export const orgRequired = async (context: httpContext):Promise<Organization> => {
    let orgs: Organization[] = [];
    try {
        orgs = orgs.concat(await new OrganizationApi(context).list())
    } catch (err) {
        if ((err as HttpError).status === 401) {
            throw error(401, { message: ErrorMessageTypes.UNAUTHORIZED });
        } else {
            throw error(404, { message: ErrorMessageTypes.GENERIC });
        }
    }

    // Redirect to create a new org if none exist
    if (orgs.length < 1) throw redirect(307, CREATE_ORG_PATH);
    return orgs[0];
};

// Flag required
export const flagRequired = (envVariable: string | null = null, redirectPath: string | null = null): void => {
    if (!envVariable || envVariable !== "true") throw redirect(307, redirectPath || INVALIDATED_SIGN_IN_PATH);
};
