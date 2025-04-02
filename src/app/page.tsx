"use client";
/*
This will be the dashboard page for the app.
Currently, it is a simple page that allows the user to sign out.
*/
import { Button } from "@/components/ui/button";
import {useAction} from "next-safe-action/hooks"
import { signUserOut } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function () {
  const {push} = useRouter();
  const {execute: runSignUserOut, status} = useAction(signUserOut,{
    onError: (error) => {
      toast.dismiss()
      toast.error("Error signing user out :(");
      console.error("Error signing user out", error);
    },
    onSuccess: (res) => {
      toast.dismiss()
      if (!res.data?.success){
        toast.error("Error signing user out :(");
        return;
      }
      toast.success("Signed out successfully!");
      push("/");
    }
  })
  const isLoading = status === "executing";
  return (
    <>
      <div>Dash</div>
      <Button
      disabled={isLoading}
        onClick={() => {
          toast.loading("Signing out...");
          runSignUserOut();
        }}>
        Sign Out
      </Button>
    </>
  );
}
