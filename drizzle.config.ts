/*
This configuration file is used to set up the Drizzle ORM with Turso (Sqlite) for
database migrations and schema management. It specifies the schema file, output directory for migrations,
and database credentials (URL and auth token) for connecting to the Turso database.
it is also used for anything related to drizzle-kit or running migrations.
*/
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./.env" });

export default defineConfig({
	schema: "src/db/schema.ts",
	out: "src/db/migrations",
	dialect: "turso",
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
