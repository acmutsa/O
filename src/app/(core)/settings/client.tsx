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
import { joinCohort } from "@/actions/settings";
import { toast } from "sonner";
import { useOptimisticAction } from "next-safe-action/hooks";

export function AddCohortCombobox({
	cohorts,
	userCohorts,
}: {
	cohorts: { id: string; name: string }[];
	userCohorts: { id: string; name: string }[];
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	// Use optimistic action to instantly show the user in the new cohort
	const { execute, isPending } = useOptimisticAction(joinCohort, {
		// Pass current cohort state
		currentState: { userCohorts },
		// Update optimistically before server responds
		updateFn: (state, input) => {
			const selectedCohort = cohorts.find((c) => c.id === input.cohortId);
			if (!selectedCohort) return state;

			// Add the selected cohort to user's cohorts
			return {
				userCohorts: [...state.userCohorts, selectedCohort],
			};
		},
		// Handle successful action
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(
					result.data.message || "Successfully joined cohort",
				);
			} else {
				toast.error(result.data?.message || "Failed to join cohort");
			}
		},
		// Handle errors
		onError: (error) => {
			console.error("Error joining cohort:", error);
			toast.error("An unexpected error occurred");
		},
	});

	const handleJoinCohort = (cohortId: string) => {
		execute({ cohortId });
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
						? cohorts.find((c) => c.id === value)?.name
						: "Add to cohort..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[240px] p-0">
				<Command>
					<CommandInput placeholder="Search cohorts..." />
					<CommandList>
						<CommandEmpty>No cohorts found.</CommandEmpty>
						<CommandGroup>
							{cohorts.map((cohort) => (
								<CommandItem
									key={cohort.id}
									value={cohort.id}
									onSelect={(currentValue) => {
										setValue(
											currentValue === value
												? ""
												: currentValue,
										);
										setOpen(false);

										// Join the selected cohort
										if (currentValue !== value) {
											handleJoinCohort(currentValue);
										}
									}}
									disabled={isPending}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === cohort.id
												? "opacity-100"
												: "opacity-0",
										)}
									/>
									{cohort.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default AddCohortCombobox;
