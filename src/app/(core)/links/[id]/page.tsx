import { db } from "@/db";
import { links, clicks } from "@/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { subDays, format } from "date-fns";
import { formatDistanceToNow } from "date-fns";

import { LinkAnalyticsClient } from "./client";

// Define LinkType interface to match what's returned from the database
type LinkType = {
	id: string;
	host: string;
	slug: string;
	toUrl: string;
	clicks: number;
	createdAt: number;
	authorId?: string | null;
};

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const searchParams = await params;

	if (!searchParams.id || typeof searchParams.id !== "string") {
		return notFound();
	}

	const link = await db.query.links.findFirst({
		where: eq(links.id, searchParams.id),
	});

	if (!link) {
		return notFound();
	}

	// Convert link to the expected type if needed
	const linkData: LinkType = {
		...link,
		createdAt:
			link.createdAt instanceof Date
				? link.createdAt.getTime()
				: link.createdAt,
	};

	// Get last 7 days of click data
	const sevenDaysAgo = subDays(new Date(), 7);

	// Fetch individual click timestamps for the last 7 days
	const clicksInRange = await db
		.select({
			createdAt: clicks.createdAt,
		})
		.from(clicks)
		.where(
			and(
				eq(clicks.linkId, link.id),
				gte(clicks.createdAt, sevenDaysAgo),
			),
		)
		.orderBy(clicks.createdAt);

	// Group and count clicks by date in JavaScript
	const dailyCounts = new Map<string, number>();
	clicksInRange.forEach((click) => {
		const dateStr = format(click.createdAt, "yyyy-MM-dd");
		dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + 1);
	});

	// Format data for chart
	const clickData = Array.from(dailyCounts.entries())
		.map(([dateStr, count]) => ({
			name: dateStr,
			clicks: count,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	// Get referrer data for pie chart
	const referrerData = await db
		.select({
			referrer: clicks.referrer,
			count: sql<number>`count(*)`.as("count"),
		})
		.from(clicks)
		.where(eq(clicks.linkId, link.id))
		.groupBy(clicks.referrer)
		.orderBy(desc(sql<number>`count(*)`));

	// Format data for pie chart
	const pieData = referrerData.map((ref) => ({
		name: ref.referrer || "Direct / Unknown",
		value: ref.count,
	}));

	return (
		<div className="container py-8">
			<div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Link Analytics
						</h1>
						<p className="text-muted-foreground">
							Created{" "}
							{formatDistanceToNow(new Date(linkData.createdAt), {
								addSuffix: true,
							})}
						</p>
					</div>
					<div className="flex items-center rounded-full bg-primary/10 px-4 py-2">
						<div className="font-medium">
							Total clicks:{" "}
							<span className="font-bold">{linkData.clicks}</span>
						</div>
					</div>
				</div>
			</div>

			<LinkAnalyticsClient
				link={linkData}
				clickData={clickData}
				pieData={pieData}
			/>
		</div>
	);
}
