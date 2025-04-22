import { decodeSimpleFinKey } from "@/lib/server/simplefin";

export default async function Page() {
	const { url, username, password } = decodeSimpleFinKey(
		process.env.SIMPLE_FIN_KEY!,
	);

	const response = await fetch(url, {
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)}`,
		},
	});
	const data = await response.text();

	return (
		<div>
			<pre>{data}</pre>
		</div>
	);
}
