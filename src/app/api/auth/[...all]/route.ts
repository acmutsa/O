import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

/*
The "toNextJsHandler" is the main handler of any api request to "/api/auth/*". 
The docs better explain all of the routes, but you will likely not interact with it too much 
*/
export const { POST, GET } = toNextJsHandler(auth);
