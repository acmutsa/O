/*
Next safe actions is a library that allows you to create server actions that are safe and type-safe and also easier to work with.
This is the main file for the library which declares two clients. 
The basic "actionCleint" should not be used. Please strictly use the "userAction" client.
This client is a wrapper around the "actionClient" that adds a user to the context of the action.
This is done by using the "getServerAuth" function from the utils.ts file.
*/
import { createSafeActionClient } from "next-safe-action";
import { getServerAuth } from "./utils";
import {
	headers,
	cookies as nextCookies,
	headers as nextHeaders,
} from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import z from "zod";

const actionClient = createSafeActionClient();

export const userAction = actionClient.use(async ({ next }) => {
	const cookies = await nextCookies();
	const headersList = await nextHeaders();
	const origin =
		headersList.get("origin") || headersList.get("referer") || "";
	const { data: userData } = await getServerAuth(origin, cookies.toString());
	if (!userData) {
		return returnValidationErrors(z.null(), {
			_errors: [
				"Session not found or expired! Please log in to complete action",
			],
		});
	}
	const { session, user } = userData;
	return next({
		ctx: {
			session,
			user,
			cookies,
			headers: headersList,
		},
	});
});
