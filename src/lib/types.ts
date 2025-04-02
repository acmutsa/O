/* These are the basic types for the projet. Any type declared more than once should live in this file and be refereneced throughout the project */
import { auth } from "./auth";
export type Session = typeof auth.$Infer.Session;