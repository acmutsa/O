import { createSafeActionClient } from "next-safe-action";
import { getServerAuth } from "./utils";
import { headers, cookies as nextCookies, headers as nextHeaders } from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import z from "zod"

export const actionClient = createSafeActionClient();

export const userAction = actionClient.use(async ({ next, }) => {
  const cookies = await nextCookies();
  const headersList = await nextHeaders();
  const origin = headersList.get("origin") || headersList.get("referer") || "";
  const { data: userData } = await getServerAuth(origin,cookies.toString());
  if (!userData){
    return returnValidationErrors(z.null(),{
      _errors: ["Session not found or expired! Please log in to complete action"]
    });
  }
  return next({ ctx:{
    userData,
    cookies,
    headers: headersList,
  } });
});
