import { getSession } from "@/lib/server/auth";
import { db } from "@/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AddTeamCombobox from "./client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TeamBadge } from "./team-badge";
import SettingsForm from "@/components/settings/SettingsForm";
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

// Helper to get user's teamss and all teams
async function getUserAndTeams(userId: string) {
	// Get all teams
	const allTeams = await db.query.teams.findMany();
	// Get user's team IDs
	const userTeamLinks = await db.query.userToTeams.findMany({
		where: (link, { eq }) => eq(link.userId, userId),
	});
	const userTeamIds = userTeamLinks.map((link) => link.teamId);
	const userTeams= allTeams.filter((c) => userTeamIds.includes(c.id));
	const addableTeams = allTeams.filter(
		(c) => !userTeamIds.includes(c.id),
	);
	return { userTeams, addableTeams };
}

export default async function Page() {
	const session = await getSession();
	if (!session) return null;
	const user = session.user;
	const { userTeams, addableTeams } = await getUserAndTeams(user.id);

	return (
		<div className="max-w-4xl py-12">
			<h1 className="pb-8 font-calsans text-7xl font-black text-acm-darker-blue">
				Settings
			</h1>

			<div className="space-y-8">
				{/* Profile Information */}
				<Card>
					<CardHeader>
						<CardTitle>Profile Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-6">
							<Avatar className="h-16 w-16">
								{user.image && (
									<AvatarImage
										src={user.image}
										alt={
											user.firstName + " " + user.lastName
										}
									/>
								)}
								<AvatarFallback>
									{user.firstName.charAt(0).toUpperCase() +
										user.lastName.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="text-2xl font-bold">
									{user.firstName} {user.lastName}
								</div>
								<div className="text-muted-foreground">
									{user.email}
								</div>
								{user.pronouns && (
									<div className="text-sm text-muted-foreground">
										{user.pronouns}
									</div>
								)}
							</div>
						</div>
						<div className="flex w-full items-center justify-end">
							<EditSettingsButton
								firstName={user.firstName}
								lastName={user.lastName}
								pronouns={user.pronouns}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Teams */}
				<Card>
					<CardHeader>
						<CardTitle>Teams</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<div className="mb-2 text-sm text-muted-foreground">
								Your current teams
							</div>
							<div className="flex flex-wrap gap-2">
								{userTeams.length === 0 && (
									<span className="text-sm text-muted-foreground">
										You are not in any teams.
									</span>
								)}
								{userTeams.map((team) => (
									<TeamBadge
										key={team.id}
										team={team}
										userTeams={userTeams.map(
											({ id, name }) => ({ id, name }),
										)}
									/>
								))}
							</div>
						</div>

						<Separator />

						<div>
							<div className="mb-2 text-sm text-muted-foreground">
								Join a new team
							</div>
							<AddTeamCombobox
								teams={addableTeams.map(({ id, name }) => ({
									id,
									name,
								}))}
								userTeams={userTeams.map(
									({ id, name }) => ({
										id,
										name,
									}),
								)}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


function EditSettingsButton({
	firstName,
	lastName,
	pronouns,
}: {
	firstName:string;
	lastName:string;
	pronouns:string;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					
				</DialogHeader>
				<div className="flex w-full items-center justify-center">
					<SettingsForm
						firstName={firstName}
						lastName={lastName}
						pronouns={pronouns}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}