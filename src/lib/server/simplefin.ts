import "server-only";

import { db } from "@/db";

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

async function writeRecentTransactionsToDB() {
	const { url, username, password } = decodeSimpleFinKey(
		process.env.SIMPLE_FIN_KEY!,
	);

	const twoWeeksAgo = Math.floor(
		(Date.now() - 14 * 24 * 60 * 60 * 1000) / 1000,
	);
	const response = await fetch(`${url}?start-date=${twoWeeksAgo}`, {
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)}`,
		},
	});
	const data = (await response.text()).replace(/\\"/g, '"');

	console.log(data);
}
