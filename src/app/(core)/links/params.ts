import { parseAsArrayOf, parseAsString, createLoader } from "nuqs/server";
import { linksDomains } from "@/o.config";

export const linksParams = {
	query: parseAsString.withDefault(""),
	domains: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadSearchParams = createLoader(linksParams);
