import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { betterFetch } from "@better-fetch/fetch";
import type {Session} from "./types"
import { NextRequest } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function getServerAuth(baseURL:string, cookie:string) {
  return betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL,
      headers: {
        cookie
      },
    }
  );
}