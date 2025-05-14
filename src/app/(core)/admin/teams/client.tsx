"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { createSuborg, createCohort } from "@/actions/admin";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

export function CreateSuborgDialog() {
	const [open, setOpen] = useState(false);
	const [fullname, setFullname] = useState("");
	const [shortname, setShortname] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { executeAsync } = useAction(createSuborg);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const result = await executeAsync({
				fullname,
				shortname,
			});

			if (result && result.data) {
				toast.success("Suborg created successfully!");
				setOpen(false);
				setFullname("");
				setShortname("");
				router.refresh();
			}
		} catch (error) {
			console.error("Action Error:", error);
			toast.error("An unexpected error occurred.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Create Suborg
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new suborg</DialogTitle>
					<DialogDescription>
						Create a new suborg below! Note that this is not the
						same as making a cohort.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="fullname">Full Name</Label>
						<Input
							id="fullname"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
							placeholder="ACM"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="shortname">Short Name</Label>
						<Input
							id="shortname"
							value={shortname}
							onChange={(e) => setShortname(e.target.value)}
							placeholder="ACM"
							required
						/>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Suborg"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

interface Suborg {
	slug: string;
	fullname: string;
	shortname: string;
}

export function CreateCohortDialog({ suborgs }: { suborgs: Suborg[] }) {
	const [open, setOpen] = useState(false);
	const [suborgSlug, setSuborgSlug] = useState("");
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	const { executeAsync } = useAction(createCohort);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const result = await executeAsync({
				suborgSlug,
				name,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			});

			if (result && result.data) {
				toast.success("Cohort created successfully!");
				setOpen(false);
				setSuborgSlug("");
				setName("");
				setStartDate("");
				setEndDate("");
				router.refresh();
			}
		} catch (error) {
			console.error("Action Error:", error);
			toast.error("An unexpected error occurred.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Create Cohort
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new cohort</DialogTitle>
					<DialogDescription>
						Create a new cohort for a suborg.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="suborg">Suborg</Label>
						<select
							id="suborg"
							value={suborgSlug}
							onChange={(e) => setSuborgSlug(e.target.value)}
							required
							className="w-full rounded border px-3 py-2"
						>
							<option value="" disabled>
								Select a suborg
							</option>
							{suborgs.map((suborg) => (
								<option key={suborg.slug} value={suborg.slug}>
									{suborg.fullname}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<Label htmlFor="name">Cohort Name</Label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Spring 2024"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="startDate">Start Date</Label>
						<Input
							id="startDate"
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="endDate">End Date</Label>
						<Input
							id="endDate"
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							required
						/>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Cohort"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
