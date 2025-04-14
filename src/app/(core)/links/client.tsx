"use client";

import { useState } from "react";
import { useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	ChevronDown,
	Search,
	Plus,
	Copy,
	ExternalLink,
	MoreVertical,
	Sparkles,
} from "lucide-react";
import { linksParams } from "./params";
import { linksDomains } from "@/o.config";
import { useRouter } from "next/navigation";
import { createLink } from "@/actions/links";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

export function LinksToolBar() {
	const [params, setParams] = useQueryStates(linksParams, {
		shallow: false,
		throttleMs: 200,
	});

	return (
		<div className="mb-6 flex w-full flex-col gap-4 sm:flex-row">
			<div className="relative flex-1">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search links..."
					className="pl-8"
					onChange={(e) =>
						setParams({
							query: e.target.value,
						})
					}
					defaultValue={params.query}
				/>
			</div>
			<DomainsDropdown />
		</div>
	);
}

function DomainsDropdown() {
	const [params, setParams] = useQueryStates(linksParams, {
		shallow: false,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					Domains <ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Filter by Domain</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{linksDomains.map((domain) => (
					<DropdownMenuCheckboxItem
						key={domain}
						checked={
							params.domains.length === 0 ||
							params.domains.includes(domain)
						}
						onCheckedChange={(checked) =>
							setParams({
								domains: checked
									? [...new Set([...params.domains, domain])]
									: params.domains.filter(
											(d) => d !== domain,
										),
							})
						}
					>
						{domain}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export type Link = {
	id: string;
	host: string;
	slug: string;
	toUrl: string;
	clicks: number;
	createdAt: Date;
	authorId: string | null;
};

interface LinksTableProps {
	links: Link[];
}

export function LinksTable({ links }: LinksTableProps) {
	return (
		<div className="space-y-4">
			{links.length === 0 ? (
				<div className="rounded-md border p-8 text-center">
					No links found.
				</div>
			) : (
				links.map((link) => <LinkRow key={link.id} link={link} />)
			)}
		</div>
	);
}

function LinkRow({ link }: { link: Link }) {
	const [copied, setCopied] = useState(false);
	const shortUrl = `${link.host}${link.slug}`;

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="flex items-center justify-between rounded-md border p-5">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
					<img
						src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(link.toUrl)}&sz=64`}
						alt=""
						className="h-5 w-5"
						onError={(e) => {
							// Fallback if favicon fails to load
							(e.target as HTMLImageElement).src =
								"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'%3E%3C/path%3E%3Cpath d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'%3E%3C/path%3E%3C/svg%3E";
						}}
					/>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<span className="font-semibold text-gray-800 dark:text-gray-200">
							{shortUrl}
						</span>
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6"
							onClick={() =>
								copyToClipboard(`https://${shortUrl}`)
							}
						>
							<Copy className="h-3.5 w-3.5" />
							<span className="sr-only">Copy short URL</span>
						</Button>
					</div>
					<a
						href={link.toUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="line-clamp-1 text-sm text-muted-foreground"
					>
						{link.toUrl}
					</a>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="text-sm text-muted-foreground">
					{new Date(link.createdAt).toLocaleDateString()}
				</div>

				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
						<Sparkles className="h-3.5 w-3.5" />
						<p>{link.clicks} clicks</p>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
							>
								<MoreVertical className="h-4 w-4" />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onClick={() =>
									window.open(`https://${shortUrl}`, "_blank")
								}
								className="cursor-pointer"
							>
								<ExternalLink className="mr-2 h-4 w-4" />
								Open short link
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() =>
									copyToClipboard(`https://${shortUrl}`)
								}
								className="cursor-pointer"
							>
								<Copy className="mr-2 h-4 w-4" />
								Copy short URL
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => copyToClipboard(link.toUrl)}
								className="cursor-pointer"
							>
								<Copy className="mr-2 h-4 w-4" />
								Copy destination URL
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}

export function CreateLinkDialog() {
	const [open, setOpen] = useState(false);
	const [slug, setSlug] = useState("");
	const [domain, setDomain] = useState<(typeof linksDomains)[number]>(
		linksDomains[0],
	);
	const [toUrl, setToUrl] = useState("");
	const router = useRouter();

	const { execute, status } = useAction(createLink, {
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(result.data.message);
				setOpen(false);
				setSlug("");
				setDomain(linksDomains[0]);
				setToUrl("");
				router.refresh();
			} else {
				toast.error(result.data?.error || "Failed to create link");
			}
		},
		onError: (error) => {
			console.error("Action Error:", error);
			toast.error(
				error.error.serverError || "An unexpected error occurred.",
			);
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		execute({
			slug: slug.startsWith("/") ? slug : `/${slug}`,
			host: domain,
			toUrl: toUrl,
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Create Link
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new link</DialogTitle>
					<DialogDescription>
						Create a new shortened link. Click create when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="toUrl">Destination URL</Label>
						<Input
							id="toUrl"
							value={toUrl}
							onChange={(e) => setToUrl(e.target.value)}
							placeholder="https://example.com/long-url"
							type="url"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="domain">Domain</Label>
						<select
							id="domain"
							value={domain}
							onChange={(e) =>
								setDomain(
									e.target
										.value as (typeof linksDomains)[number],
								)
							}
							className="w-full rounded-md border border-input bg-background p-2"
						>
							{linksDomains.map((d) => (
								<option key={d} value={d}>
									{d}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="slug">Slug</Label>
						<div className="flex items-center">
							<span className="mr-2">/</span>
							<Input
								id="slug"
								value={
									slug.startsWith("/")
										? slug.substring(1)
										: slug
								}
								onChange={(e) => setSlug(`/${e.target.value}`)}
								placeholder="my-awesome-link"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={status === "executing"}>
							{status === "executing"
								? "Creating..."
								: "Create Link"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
