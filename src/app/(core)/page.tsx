import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { signUserOut } from "@/actions/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { auth, getSession } from "@/lib/auth";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <div>
        <h1 className="text-acm-darker-blue font-black text-7xl font-calsans">
          Hey there, {session.user.firstName}
        </h1>
      </div>
    </>
  );
}
