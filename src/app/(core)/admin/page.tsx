import { getSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
export default async function Page() {
	const session = await getSession();

	if (!session || session.user.role !== "admin") {
		redirect("/");
	}

	return (
		<div className="container space-y-6 py-10">
			<h1 className="text-3xl font-bold tracking-tight">Admin</h1>
		</div>
	);
}
