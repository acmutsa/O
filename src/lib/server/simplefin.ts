import "server-only";

import { db } from "@/db";
import { betterFetch } from "@better-fetch/fetch";
import { FinancialDataSchema, type Transaction } from "@/validators/simplefin";
import { eq } from "drizzle-orm";
import { transaction as TransactionTable } from "@/db/schema/finance.schema";

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
	const data = JSON.parse((await response.text()).replace(/\\"/g, '"'));

	const financialData = FinancialDataSchema.safeParse(data);

	if (!financialData.success) {
		console.error("Invalid SimpleFin data", financialData.error);
		return;
	}

	const { accounts } = financialData.data;

	const t = await db.insert(TransactionTable).values(
		accounts[0].transactions.map((transaction) => ({
			id: transaction.id,
			amount: convertMoneyStringToInt(transaction.amount),
			date: transaction.posted,
			description: transaction.description,
			payee: transaction.payee,
			memo: transaction.memo,
			transactedAt: new Date(transaction.transacted_at),
			internalNotes: transaction.memo,
			updatedByUserId: "system",
		})),
	);
}

export function convertMoneyStringToInt(ammount: string) {
	const asInt = parseInt(ammount.replace(".", ""));
	return asInt;
}

export function convertMoneyIntToString(ammount: number) {
	const mainUnitAmount = ammount / 100;
	return mainUnitAmount.toFixed(2).toString();
}
