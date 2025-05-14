import "server-only";

import { db } from "@/db";
import { betterFetch } from "@better-fetch/fetch";

interface Transaction {
	id: string;
	posted: number; // Unix timestamp
	amount: string; // String representation of a number
	description: string;
	payee: string;
	memo: string;
	transacted_at: number; // Unix timestamp
}

interface Organization {
	domain: string;
	name: string;
	"sfin-url": string;
	url: string;
	id: string;
}

interface Account {
	org: Organization;
	id: string;
	name: string;
	currency: string; // e.g., "USD"
	balance: string; // String representation of a number
	"available-balance": string; // String representation of a number
	"balance-date": number; // Unix timestamp
	transactions: Transaction[];
	holdings: any[]; // Might be able to be more explicit in the future
}

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
