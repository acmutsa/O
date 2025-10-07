import { getSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CreateSuborgDialog, CreateTeamDialog } from "./client";

export default async function Page() {
	const session = await getSession();

	if (!session || session.user.role !== "admin") {
		redirect("/");
	}

	const suborgs = await db.query.suborgs.findMany();

	return (
		<div className="container space-y-12 py-10">
			<div className="space-y-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-2xl font-bold tracking-tight">
						Suborgs
					</h2>
					<CreateSuborgDialog />
				</div>
				<SuborgShowcase />
			</div>

			<div className="space-y-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-2xl font-bold tracking-tight">
						Teams
					</h2>
					<CreateTeamDialog suborgs={suborgs} />
				</div>
				<TeamShowcase />
			</div>
		</div>
	);
}

async function SuborgShowcase() {
	const suborgs = await db.query.suborgs.findMany();

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Slug</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{suborgs.map((suborg) => (
						<TableRow key={suborg.slug}>
							<TableCell>{suborg.fullname}</TableCell>
							<TableCell>{suborg.slug}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

async function TeamShowcase() {
	const teams = await db.query.teams.findMany();

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Suborg</TableHead>
						<TableHead>Dates</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{teams && teams.length > 0 ? (
						teams.map((team) => (
							<TableRow key={team.id}>
								<TableCell>{team.name}</TableCell>
								<TableCell>{team.suborgSlug}</TableCell>
								<TableCell>
									{new Date(
										team.startDate,
									).toLocaleDateString()}{" "}
									-{" "}
									{new Date(
										team.endDate,
									).toLocaleDateString()}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={3} className="text-center">
								No team found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
