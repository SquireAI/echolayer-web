import {AuthApi} from "$lib/api/auth";
import {CREATE_ORG_PATH, INVALIDATED_SIGN_IN_PATH, ORGS_SELECT_PATH, ORGS_SELECT_PATH_WITH_INVALIDATE} from "./paths";
import type {Organization} from "$lib/types";
import {OrganizationApi} from "$lib/api/organization";
import {error, redirect} from "@sveltejs/kit";
import type {HttpError} from "@sveltejs/kit";
import {ErrorMessageTypes} from "$lib/error";
import type {httpContext} from "$lib/http/context";
import { ORGANIZATION_ID_HEADER_NAME } from "$lib/constants";
import { PUBLIC_DISCOVERY_ENABLED, PUBLIC_MULTI_ORG_ENABLED } from "$env/static/public";

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
    if (orgs.length < 1) {
        throw redirect(307, CREATE_ORG_PATH);
    }
    
    if(PUBLIC_MULTI_ORG_ENABLED === "true" && PUBLIC_DISCOVERY_ENABLED === "true") {
        // If they haven't selected an org, redirect them to the selection page
        if(!context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]) {
            throw redirect(307, ORGS_SELECT_PATH);
        }

        const selectedOrg = orgs.find(org => org.publicId === context.baseHeaders[ORGANIZATION_ID_HEADER_NAME]);

        // Their selection isn't valid, so we'll redirect them to pick a new selection.
        if(!selectedOrg) {
            throw redirect(307, ORGS_SELECT_PATH_WITH_INVALIDATE);
        }

        return selectedOrg;
    } else {
        // Return the first org as a default
        return orgs[0];
    }
    
};

// Flag required
export const flagRequired = (envVariable: string | null = null, redirectPath: string | null = null): void => {
    if (!envVariable || envVariable !== "true") throw redirect(307, redirectPath || INVALIDATED_SIGN_IN_PATH);
};
