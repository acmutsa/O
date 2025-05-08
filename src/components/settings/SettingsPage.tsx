import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SettingsForm from "./SettingsForm";
import { user } from "@/db/schema";


export default async function UserSettingsPage() {

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in");
    }
    const { user: userSettings } = session;

    return (
        <SettingsForm firstName={userSettings.firstName} lastName={userSettings.lastName} pronouns={userSettings.pronouns} />

    )
}

