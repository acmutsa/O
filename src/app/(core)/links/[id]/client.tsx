"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { updateLink } from "@/actions/links";

import {
	BarChart as RechartsBarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	PieChart as RechartsPieChart,
	Pie,
	Cell,
} from "recharts";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";

// Define the form schema matching the action input
const formSchema = z.object({
	slug: z
		.string()
		.min(1, "Slug is required")
		.startsWith("/")
		.regex(/^\/[a-zA-Z0-9_-]*$/, {
			message:
				"Slug must contain only letters, numbers, underscores, and dashes",
		}),
	toUrl: z.string().url("Must be a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

type LinkType = {
	id: string;
	host: string;
	slug: string;
	toUrl: string;
	clicks: number;
	createdAt: number;
	authorId?: string | null;
};

type ClickData = {
	name: string;
	clicks: number;
};

type PieData = {
	name: string;
	value: number;
};

type LinkAnalyticsClientProps = {
	link: LinkType;
	clickData: ClickData[];
	pieData: PieData[];
};

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export function LinkUpdateForm({ link }: { link: LinkType }) {
	const router = useRouter();

	// Use the useAction hook
	const { execute, status } = useAction(updateLink, {
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(result.data.message);
				// router.refresh(); // Revalidation happens in the action
			} else {
				toast.error(result.data?.error || "Failed to update link");
			}
		},
		onError: (error) => {
			toast.error("An unexpected error occurred");
			console.error("Action error:", error);
		},
	});

	// Initialize form with current link values
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slug: link.slug,
			toUrl: link.toUrl,
		},
	});

	async function onSubmit(data: FormValues) {
		// Pass the linkId along with the form data
		execute({ ...data, linkId: link.id });
	}

	const isLoading = status === "executing";

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label htmlFor="host">Host</Label>
					<Input
						id="host"
						value={link.host}
						disabled
						className="bg-muted"
					/>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="slug">Slug</Label>
					<Input
						id="slug"
						{...form.register("slug")}
						placeholder="/custom-slug"
					/>
					{form.formState.errors.slug && (
						<p className="text-sm text-red-500">
							{form.formState.errors.slug.message}
						</p>
					)}
				</div>

				<div className="grid gap-1">
					<Label htmlFor="toUrl">Destination URL</Label>
					<Input
						id="toUrl"
						{...form.register("toUrl")}
						placeholder="https://example.com"
					/>
					{form.formState.errors.toUrl && (
						<p className="text-sm text-red-500">
							{form.formState.errors.toUrl.message}
						</p>
					)}
				</div>
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Updating..." : "Update Link"}
			</Button>
		</form>
	);
}

function LinkUpdateFormInternal({ link }: { link: LinkType }) {
	const router = useRouter();

	// Use the useAction hook
	const { execute, status } = useAction(updateLink, {
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(result.data.message);
				// router.refresh(); // Revalidation happens in the action
			} else {
				toast.error(result.data?.error || "Failed to update link");
			}
		},
		onError: (error) => {
			toast.error("An unexpected error occurred");
			console.error("Action error:", error);
		},
	});

	// Initialize form with current link values
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slug: link.slug,
			toUrl: link.toUrl,
		},
	});

	async function onSubmit(data: FormValues) {
		// Pass the linkId along with the form data
		execute({ ...data, linkId: link.id });
	}

	const isLoading = status === "executing";

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label htmlFor="host">Host</Label>
					<Input
						id="host"
						value={link.host}
						disabled
						className="bg-muted"
					/>
				</div>

				<div className="grid gap-1">
					<Label htmlFor="slug">Slug</Label>
					<Input
						id="slug"
						{...form.register("slug")}
						placeholder="/custom-slug"
					/>
					{form.formState.errors.slug && (
						<p className="text-sm text-red-500">
							{form.formState.errors.slug.message}
						</p>
					)}
				</div>

				<div className="grid gap-1">
					<Label htmlFor="toUrl">Destination URL</Label>
					<Input
						id="toUrl"
						{...form.register("toUrl")}
						placeholder="https://example.com"
					/>
					{form.formState.errors.toUrl && (
						<p className="text-sm text-red-500">
							{form.formState.errors.toUrl.message}
						</p>
					)}
				</div>
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Updating..." : "Update Link"}
			</Button>
		</form>
	);
}

export function LinkAnalyticsClient({
	link,
	clickData,
	pieData,
}: LinkAnalyticsClientProps) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="space-y-4">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<h3 className="text-lg font-medium">Link Details</h3>
						<LinkUpdateFormInternal link={link} />
					</div>
				</div>
			</div>

			<div className="space-y-6">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<h3 className="mb-4 text-lg font-medium">
							Clicks - Last 7 Days
						</h3>
						<div className="h-[300px]">
							<ChartContainer
								config={{
									clicks: {
										label: "Clicks",
										color: "hsl(var(--chart-1))",
									},
								}}
							>
								<RechartsBarChart data={clickData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<ChartTooltip
										content={
											<ChartTooltipContent
												labelKey="name"
												indicator="dot"
											/>
										}
									/>
									<ChartLegend
										content={
											<ChartLegendContent nameKey="clicks" />
										}
									/>
									<Bar
										dataKey="clicks"
										fill="var(--color-clicks)"
									/>
								</RechartsBarChart>
							</ChartContainer>
						</div>
					</div>
				</div>

				<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="p-6">
						<h3 className="mb-4 text-lg font-medium">
							Referrer Sources
						</h3>
						<div className="h-[300px]">
							<ChartContainer
								config={pieData.reduce((acc, item, index) => {
									return {
										...acc,
										[item.name]: {
											label: item.name,
											color: COLORS[
												index % COLORS.length
											],
										},
									};
								}, {})}
							>
								<RechartsPieChart>
									<Pie
										data={pieData}
										cx="50%"
										cy="50%"
										labelLine={false}
										outerRadius={80}
										fill="#8884d8"
										dataKey="value"
										nameKey="name"
									>
										{pieData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={
													COLORS[
														index % COLORS.length
													]
												}
											/>
										))}
									</Pie>
									<ChartTooltip
										content={
											<ChartTooltipContent
												nameKey="name"
												labelKey="value"
												indicator="dot"
											/>
										}
									/>
									<ChartLegend
										content={
											<ChartLegendContent nameKey="name" />
										}
									/>
								</RechartsPieChart>
							</ChartContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
