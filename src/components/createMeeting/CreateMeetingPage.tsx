import { auth } from "@/lib/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CreateMeetingForm from "@/components/createMeeting/CreateMeetingForm";
import { db } from "@/db";

export default async function CreateMeetingPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		redirect("/login");
	}

	// fetch all users for the invitation combobox
	const users = await db.query.user.findMany({
		columns: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
		},
	});

	return (
		<div className="container mx-auto py-0">
			<CreateMeetingForm users={users}/>
		</div>
	);
}
