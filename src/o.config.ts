// NOTE: This is imported on both the client and server. Do not add sensitive information here.

export const linksDomains = ["go.acmutsa.org", "go.rowdyhacks.org"] as const;

type SuborgConfig = Record<
	string,
	{
		name: string;
	}
>;

export const suborgs = {
	acm: {
		name: "ACM",
	},
	"acm-w": {
		name: "ACM-W",
	},
	rowdycreators: {
		name: "Rowdy Creators",
	},
	cic: {
		name: "Coding in Color",
	},
	rowdyhacks: {
		name: "RowdyHacks",
	},
	cq: {
		name: "Code Quantum",
	},
	rowdydatathon: {
		name: "Rowdy Datathon",
	},
} as const satisfies SuborgConfig;
