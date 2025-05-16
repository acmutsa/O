import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { z } from "zod";
import { urlValidator } from "@/lib/zod";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

/**
 * A component for managing a list of meeting links with add/remove functionality.
 * When only one link is present, it shows as a single input.
 * When multiple links are present, they are displayed in a collapsible list.
 *
 * @example
 * const [links, setLinks] = useState<string[]>([]);
 * 
 * <MeetingLinks
 *   links={links}
 *   onLinksChange={setLinks}
 * />
 *
 * @param props.links - Array of meeting link strings
 * @param props.onLinksChange - Callback function to update the links array
 *
 */

interface MeetingLinksProps {
	links: string[];
	onLinksChange: (links: string[]) => void;
}

export function MeetingLinks({ links, onLinksChange }: MeetingLinksProps) {
	const [newLink, setNewLink] = React.useState("");
	const [validationError, setValidationError] = React.useState<string>("");

	const renderError = (message: string) => (
		<p className="text-sm text-red-500 mt-1">{message}</p>
	);

	const validateAndAddLink = () => {
		const trimmedLink = newLink.trim();
		if (!trimmedLink) return;

		try {
			urlValidator.parse(trimmedLink);
			onLinksChange([...links, trimmedLink]);
			setNewLink("");
			setValidationError("");
		} catch (error) {
			if (error instanceof z.ZodError) {
				setValidationError(error.errors[0].message);
			}
		}
	};

	return (
		<div className="space-y-2">
			<Label htmlFor="meetingLinks">Meeting Links</Label>

			{/* Input field and Add button for new links */}
			<div className="flex gap-2">
				<div className="flex-1">
					<Input 
						id="newMeetingLink"
						placeholder="Add a meeting link"
						value={newLink}
						onChange={(e) => {
							setNewLink(e.target.value);
							setValidationError("");
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								validateAndAddLink();
							}
						}}
					/>
					{validationError && (
						<p className="text-sm text-red-500 mt-1">{validationError}</p>
					)}
				</div>
				<Button 
					type="button"
					onClick={validateAndAddLink}
				>
					Add
				</Button>
			</div>

			{/* Display links */}
			<div className="space-y-2 mt-2">
				{links.length === 1 && (
					<div className="flex items-center gap-2">
						<Input value={links[0] || ""} readOnly />
						<Button
							type="button"
							variant="destructive"
							size="sm"
							onClick={() => {
								onLinksChange([]);
							}}
						>
							Remove
						</Button>
					</div>
				)}
				{links.length > 1 && (
					<Collapsible>
						<CollapsibleTrigger asChild>
							<Button variant="outline" className="w-full justify-between">
								{links.length} Links Added
								<ChevronDown className="h-4 w-4" />
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent className="space-y-2 mt-2">
							{links.map((link, index) => (
								<div key={index} className="flex items-center gap-2">
									<Input value={link} readOnly />
									<Button
										type="button"
										variant="destructive"
										size="sm"
										onClick={() => {
											onLinksChange(links.filter((_, i) => i !== index));
										}}
									>
										Remove
									</Button>
								</div>
							))}
						</CollapsibleContent>
					</Collapsible>
				)}
			</div>
		</div>
	);
}
