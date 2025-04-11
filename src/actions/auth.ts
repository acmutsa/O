/* Any server actions related to auth should be in this file. DO NOT REMOVE THE "use server" */
"use server";

import { userAction } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { returnValidationErrors } from "next-safe-action";
import z from "zod";
// this is mainly an example of a server action declaration
export const signUserOut = userAction.action(async ({ ctx: { headers } }) => {
  const success = await auth.api.signOut({
    headers,
  });

  return {
    success,
  };
});

export const getUserFromSession = userAction.action(async ({ ctx: { userData } }) => {  
  if (!userData)
    return returnValidationErrors(z.null(), {
      _errors: ["User information not found!"]
    });

  return userData;
});
