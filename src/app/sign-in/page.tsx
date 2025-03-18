"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
export default function SignIn() {
  // have logic for checking if signed in
  return (
    <div>
      <h1>Sign In</h1>
      <p>Please enter your credentials to sign in.</p>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}