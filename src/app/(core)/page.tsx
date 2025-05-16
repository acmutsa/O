import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { signUserOut } from "@/actions/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { auth, getSession } from "@/lib/server/auth";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { meetingInvites } from "@/db/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export default async function Page() {
	const session = await getSession();

	if (!session) {
		redirect("/signin");
	}

	const userMeetings = await db.query.meetingInvites.findMany({
		where:eq(meetingInvites.id, session.user.id),
	})

	return (
		<>
			<div>
				<h1 className="font-calsans text-7xl font-black text-acm-darker-blue">
					Hey there, {session.user.firstName}
				</h1>
			</div>
		</>
	);
}
