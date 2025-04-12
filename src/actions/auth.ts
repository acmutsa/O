/* Any server actions related to auth should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { userAction } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// this is mainly an example of a server action declaration
export const signUserOut = userAction.action(async ({ ctx: { session } }) => {
	const success = await auth.api.signOut({
		headers: await headers(),
	});

	return {
		success,
	};
});
