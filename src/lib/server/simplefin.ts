import "server-only";

export function decodeSimpleFinKey(raw: string) {
	const [scheme, rest] = raw.split("//");
	const [auth, afterAuth] = rest.split("@");
	const [username, password] = auth.split(":");

	return {
		url: scheme + "//" + afterAuth + "/accounts",
		username,
		password,
	};
}
