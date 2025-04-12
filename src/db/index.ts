/*
This is the main driver file for Drizzle ORM with Turso (Sqlite) for the application.
It exports the database instance (one for edge and one for node serverless) 
It references a schema which is declared in the same directory 
*/
import { drizzle } from "drizzle-orm/libsql";
import { createClient as createClientEdge } from "@libsql/client/web";
import { createClient as createClientNodeServerless } from "@libsql/client";
import * as schema from "./schema";

export * from "drizzle-orm";

const tursoEdge = createClientEdge({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

const tursoNodeServerless = createClientNodeServerless({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create the drizzle instance for both edge and node serverless environments
export const db = drizzle(tursoEdge, { schema });
export const dbNodeServerless = drizzle(tursoNodeServerless, { schema });
