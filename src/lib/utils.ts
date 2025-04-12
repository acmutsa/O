/* These are all utility functions that are referenced throughout the project. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
