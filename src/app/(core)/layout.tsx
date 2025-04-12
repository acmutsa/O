import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Header from "./header";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const sideBarUser = {
		firstName: session.user.firstName,
		lastName: session.user.lastName,
		email: session.user.email,
		avatar: session.user.image ?? null,
	};

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<AppSidebar user={sideBarUser} variant="inset" />
				<SidebarInset className="flex-1 px-8 py-2">
					<Header />
					<main className="flex-1 pt-5">{children}</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
