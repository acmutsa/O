import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";

import { db } from "@/db";

export const auth = betterAuth({
  appName: "O",
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  databaseHooks: {
    user: {
      create: {
        // used in order to break up the first and last name into separate fields
        before: async (user) => {
          // split the name into first and last name (name object is mapped to the first name by the config)
          const [firstName, ...rest] = user.name.split(" ");
          const lastName = rest.join(" ");
          return {
            data: { ...user, firstName, lastName },
          };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  // cookie cache is enabled to speed up the session retrieval to avoid calling the database each time
  // https://better-auth.vercel.app/docs/concepts/session-management#cookie-cache
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  // social login is enabled for google
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    // this maps the default "name" field to the "firstName" field in the database
    fields: {
      name: "firstName",
    },
    // this declares the extra fields that are not in the default user schema that better auth creates, but are in the database
    additionalFields: {
      firstName: {
        type: "string",
        defaultValue: "",
      },
      lastName: {
        type: "string",
        defaultValue: "",
      },
      pronouns: {
        type: "string",
        nullable: true,
      },
    },
    changeEmail: {
      enabled: false,
    },
  },
  advanced: {
    cookiePrefix: "O",
  },
  // this disables the default signup and signin routes, as we are using our own custom routes
  disabledPaths: ["/api/auth/signup", "/api/auth/signin/email"],
  // this allows for server actions to use cookies
  // https://better-auth.vercel.app/docs/integrations/next#server-action-cookies
  plugins: [nextCookies()],
});

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
