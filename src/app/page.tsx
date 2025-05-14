"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
export default function () {
  return (
    <>
      <div>Dash</div>
      <Button
        onClick={async () => {
          await authClient.signOut();
          redirect("/");
        }}>
        Sign Out
      </Button>
    </>
  );
}
