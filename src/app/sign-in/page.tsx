"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl">Welcome to O</CardTitle>
          <CardDescription className="text-base">
          O is our suite of tools accessible to all officers and team members of ACM UTSA. Please sign in with your 
              workspace email
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full items-center justify-center">
          <Button className="w-full max-w-sm flex items-center justify-center" onClick={async()=>{
            setIsLoading(true);
            await signIn();
          }}>{
          isLoading ? <Loader2 className="animate-spin" />:<p className="text-base">Sign In with Workspace Email</p>}</Button>
        </CardContent>
        <CardFooter><a className="text-sm underline w-full text-end" href="mailto:tech@acmutsa.org">I am an officer and need a workspace email</a></CardFooter>
      </Card>
    </div>
  );
}