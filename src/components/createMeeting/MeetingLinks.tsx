import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

/*
    links - Array of meeting links
    onLinksChange - Callback function to update the links array
    [error] - Optional error message to display
 */
interface MeetingLinksProps {
	links: string[];
	onLinksChange: (links: string[]) => void;
	error?: string;
}

export function MeetingLinks({ links, onLinksChange, error }: MeetingLinksProps) {
	const [newLink, setNewLink] = React.useState("");

	const renderError = (message: string) => (
		<p className="text-sm text-red-500">{message}</p>
	);

	return (
		<div className="space-y-2">
			<Label htmlFor="meetingLinks">Meeting Links</Label>

			{/* Input field and Add button for new links */}
			<div className="flex gap-2">
				<Input 
					id="newMeetingLink"
					placeholder="Add a meeting link"
					value={newLink}
					onChange={(e) => setNewLink(e.target.value)}
				/>
				<Button 
					type="button"
					onClick={() => {
						if (newLink.trim()) {
							onLinksChange([...links, newLink.trim()]);
							setNewLink("");
						}
					}}
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

			{error && renderError(error)}
		</div>
	);
} 