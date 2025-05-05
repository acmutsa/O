import { decodeSimpleFinKey } from "@/lib/server/simplefin";

export default async function Page() {
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
	// console.log(JSON.stringify(data));
	console.log(data);

	return (
		<div>
			<pre>{data}</pre>
		</div>
	);
}
