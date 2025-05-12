import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import {
	LinksToolBar,
	LinksTable,
	CreateLinkDialog,
	type Link,
} from "./client";
import { loadSearchParams } from "./params";
import { db } from "@/db";
import { like, or, inArray, and } from "drizzle-orm";
import { linksDomains } from "@/o.config";
import { links as linksTable } from "@/db/schema";

// TODO: Add pagination

export default async function LinksPage({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const params = loadSearchParams(searchParams);

	const linksData = await db.query.links.findMany({
		where: and(
			or(
				like(linksTable.slug, `%${params.query}%`),
				like(linksTable.host, `%${params.query}%`),
				like(linksTable.toUrl, `%${params.query}%`),
			),
			params.domains.length > 0
				? inArray(
						linksTable.host,
						params.domains as (typeof linksDomains)[number][],
					)
				: undefined,
		),
		orderBy: (links, { desc }) => [desc(links.createdAt)],
	});

	const links: Link[] = linksData.map((link) => ({
		...link,
		createdAt: new Date(link.createdAt),
	}));

	return (
		<div className="container space-y-6 py-10">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-3xl font-bold tracking-tight">Links</h1>
				<CreateLinkDialog />
			</div>

			<LinksToolBar />

			<Suspense
				fallback={
					<div className="py-10 text-center">Loading links...</div>
				}
			>
				<LinksTable links={links} />
			</Suspense>
		</div>
	);
}
