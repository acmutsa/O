import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { toast } from "sonner";

// auth client is used to handle the authentication flow in the client side
export const authClient = createAuthClient({
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
	//you can pass client configuration here
});

export const { getSession } = authClient;

// signIn function is used to initiate the sign-in process
export const signIn = async () => {
	await authClient.signIn.social({
		provider: "google",
	});
};
