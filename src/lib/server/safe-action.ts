/*
Next safe actions is a library that allows you to create server actions that are safe and type-safe and also easier to work with.
This is the main file for the library which declares two clients. 
The basic "actionCleint" should not be used. Please strictly use the "userAction" client.
This client is a wrapper around the "actionClient" that adds a user to the context of the action.
*/
import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./auth";

const actionClient = createSafeActionClient();

export const authedAction = actionClient.use(async ({ next }) => {
	const session = await getSession();
	if (!session) {
		throw new Error("Unauthorized");
	}
	return next({
		ctx: {
			session,
		},
	});
});
