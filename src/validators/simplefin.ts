import { z } from "zod";

const TransactionSchema = z.object({
	id: z.string(),
	posted: z.number().int(), // Assuming Unix timestamp (integer)
	amount: z.string(), // String representation of a number
	description: z.string(),
	payee: z.string(),
	memo: z.string(),
	transacted_at: z.number().int(), // Assuming Unix timestamp (integer)
});

const OrganizationSchema = z.object({
	domain: z.string(),
	name: z.string(),
	"sfin-url": z.string().url(), // Added URL validation
	url: z.string().url(), // Added URL validation
	id: z.string(),
});

const AccountSchema = z.object({
	org: OrganizationSchema,
	id: z.string(),
	name: z.string(),
	currency: z.string(), // e.g., "USD"
	balance: z.string(), // String representation of a number
	"available-balance": z.string(), // String representation of a number
	"balance-date": z.number().int(), // Assuming Unix timestamp (integer)
	transactions: z.array(TransactionSchema),
	holdings: z.array(z.unknown()), // This could be more strict in the future
});

export const FinancialDataSchema = z.object({
	errors: z.array(z.string()),
	accounts: z.array(AccountSchema),
});

// To infer the TypeScript type from the Zod schema:
export type FinancialData = z.infer<typeof FinancialDataSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;

// Example usage (optional, for demonstration):
const exampleData = {
	errors: ["Connection to Frost National Bank may need attention"],
	accounts: [
		{
			org: {
				domain: "www.frostbank.com",
				name: "Frost National Bank",
				"sfin-url": "https://beta-bridge.simplefin.org/simplefin",
				url: "https://www.frostbank.com/",
				id: "www.frostbank.com",
			},
			id: "ACT-96906445-91f0-4397-a93d-02ba4936a85e",
			name: "Frost Business Checking",
			currency: "USD",
			balance: "34851.44",
			"available-balance": "34851.44",
			"balance-date": 1746746608,
			transactions: [
				{
					id: "TRN-c2e83eda-5f6f-42bd-a35d-c2a3a17d10bc",
					posted: 1746532800,
					amount: "39.99",
					description:
						"VBAS AMAZON MKTPLACE PMTS AMZN.COM/BILL WA CARD: 1121",
					payee: "Amazon",
					memo: "",
					transacted_at: 1746532800,
				},
				// ... more transactions
			],
			holdings: [],
		},
	],
};

try {
	const parsedData = FinancialDataSchema.parse(exampleData);
	console.log("Data is valid:", parsedData);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error("Validation errors:", error.errors);
	} else {
		console.error("An unexpected error occurred:", error);
	}
}
