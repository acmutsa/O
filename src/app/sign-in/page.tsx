"use client";
/*
This is the sign in page for the app. 
It is a simple page that allows the user to sign in with their workspace email.
*/
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/client/auth-client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
	CardHeader,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-black">
						Welcome to O
					</CardTitle>
					<CardDescription className="text-base">
						<p className="text-black">
							Please sign in with the workspace email provided to
							you. If you think you are supposed to have a
							workspace email and do not, please click "I am an
							officer and need a workspace email" below.
						</p>
					</CardDescription>
				</CardHeader>
				<CardContent className="flex w-full items-center justify-center">
					<Button
						className="flex w-full max-w-sm items-center justify-center"
						onClick={async () => {
							setIsLoading(true);
							await signIn();
						}}
					>
						{isLoading ? (
							<Loader2 className="animate-spin" />
						) : (
							<p className="text-base font-semibold">
								Sign In with Workspace Email
							</p>
						)}
					</Button>
				</CardContent>
				<CardFooter>
					<a
						className="w-full text-end text-sm underline"
						href="mailto:tech@acmutsa.org"
					>
						I am an officer and need a workspace email
					</a>
				</CardFooter>
			</Card>
		</div>
	);
}
