"use client";
import { useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/shared/utils";
import { joinTeam } from "@/actions/settings";
import { toast } from "sonner";
import { useOptimisticAction } from "next-safe-action/hooks";

export function AddTeamCombobox({
	teams,
	userTeams,
}: {
	teams: { id: string; name: string }[];
	userTeams: { id: string; name: string }[];
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	// Use optimistic action to instantly show the user in the new team
	const { execute, isPending } = useOptimisticAction(joinTeam, {
		// Pass current team state
		currentState: { userTeams },
		// Update optimistically before server responds
		updateFn: (state, input) => {
			const selectedTeam = teams.find((c) => c.id === input.teamId);
			if (!selectedTeam) return state;

			// Add the selected team to user's teams
			return {
				userTeams: [...state.userTeams, selectedTeam],
			};
		},
		// Handle successful action
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(
					result.data.message || "Successfully joined team",
				);
			} else {
				toast.error(result.data?.message || "Failed to join team");
			}
		},
		// Handle errors
		onError: (error) => {
			console.error("Error joining team:", error);
			toast.error("An unexpected error occurred");
		},
	});

	const handleJoinTeam = (teamId: string) => {
		execute({ teamId });
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[240px] justify-between"
					disabled={isPending}
				>
					{value
						? teams.find((c) => c.id === value)?.name
						: "Add to team..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[240px] p-0">
				<Command>
					<CommandInput placeholder="Search teams..." />
					<CommandList>
						<CommandEmpty>No teams found.</CommandEmpty>
						<CommandGroup>
							{teams.map((team) => (
								<CommandItem
									key={team.id}
									value={team.id}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue,
										);
										setOpen(false);

										// Join the selected team
										if (currentValue !== value) {
											handleJoinTeam(currentValue);
										}
									}}
									disabled={isPending}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === team.id
												? "opacity-100"
												: "opacity-0",
										)}
									/>
									{team.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default AddTeamCombobox;
