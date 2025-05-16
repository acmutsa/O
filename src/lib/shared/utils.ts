/* These are all utility functions that are referenced throughout the project. They should only include things that are shared between the client and server. */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
