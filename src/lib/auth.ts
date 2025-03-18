import { betterAuth, custom } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db"; 

export const auth = betterAuth({
  appName: "O",
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // split the name into first and last name
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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    fields: {
      name: "firstName",
    },
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
  disabledPaths: ["/api/auth/signup", "/api/auth/signin/email"],
  plugins: [nextCookies()],
});
