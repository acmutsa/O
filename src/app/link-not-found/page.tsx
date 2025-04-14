import Link from "next/link";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-2xl font-bold">Link not found</h1>
				<Link href="/" className="text-blue-500">
					Go back to home
				</Link>
			</div>
		</div>
	);
}
