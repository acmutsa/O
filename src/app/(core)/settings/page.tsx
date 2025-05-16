import { getSession } from "@/lib/server/auth";
import { db } from "@/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AddCohortCombobox from "./client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CohortBadge } from "./cohort-badge";
import SettingsForm from "@/components/settings/SettingsForm";

// Helper to get user's cohorts and all cohorts
async function getUserAndCohorts(userId: string) {
	// Get all cohorts
	const allCohorts = await db.query.cohorts.findMany();
	// Get user's cohort IDs
	const userCohortLinks = await db.query.userToCohorts.findMany({
		where: (link, { eq }) => eq(link.userId, userId),
	});
	const userCohortIds = userCohortLinks.map((link) => link.cohortId);
	const userCohorts = allCohorts.filter((c) => userCohortIds.includes(c.id));
	const addableCohorts = allCohorts.filter(
		(c) => !userCohortIds.includes(c.id),
	);
	return { userCohorts, addableCohorts };
}

export default async function Page() {
	const session = await getSession();
	if (!session) return null;
	const user = session.user;
	const { userCohorts, addableCohorts } = await getUserAndCohorts(user.id);

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
					</CardContent>
				</Card>
				<SettingsForm firstName={user.firstName} lastName={user.lastName} pronouns={user.pronouns} />

				{/* Cohorts */}
				<Card>
					<CardHeader>
						<CardTitle>Cohorts</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<div className="mb-2 text-sm text-muted-foreground">
								Your current cohorts
							</div>
							<div className="flex flex-wrap gap-2">
								{userCohorts.length === 0 && (
									<span className="text-sm text-muted-foreground">
										You are not in any cohorts.
									</span>
								)}
								{userCohorts.map((cohort) => (
									<CohortBadge
										key={cohort.id}
										cohort={cohort}
										userCohorts={userCohorts.map(
											({ id, name }) => ({ id, name }),
										)}
									/>
								))}
							</div>
						</div>

						<Separator />

						<div>
							<div className="mb-2 text-sm text-muted-foreground">
								Join a new cohort
							</div>
							<AddCohortCombobox
								cohorts={addableCohorts.map(({ id, name }) => ({
									id,
									name,
								}))}
								userCohorts={userCohorts.map(
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
