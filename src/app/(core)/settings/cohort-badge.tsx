"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/shared/utils";
import { leaveCohort } from "@/actions/settings";
import { toast } from "sonner";
import { useOptimisticAction } from "next-safe-action/hooks";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CohortBadgeProps {
	cohort: { id: string; name: string };
	userCohorts: { id: string; name: string }[];
}

export function CohortBadge({ cohort, userCohorts }: CohortBadgeProps) {
	const [hover, setHover] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	// Use optimistic action to instantly remove the cohort from UI
	const { execute, isPending } = useOptimisticAction(leaveCohort, {
		// Pass current cohort state
		currentState: { userCohorts },
		// Update optimistically before server responds
		updateFn: (state, input) => {
			// Remove the cohort from user's cohorts
			return {
				userCohorts: state.userCohorts.filter(
					(c) => c.id !== input.cohortId,
				),
			};
		},
		// Handle successful action
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(
					result.data.message || "Successfully left cohort",
				);
			} else {
				toast.error(result.data?.message || "Failed to leave cohort");
			}
		},
		// Handle errors
		onError: (error) => {
			console.error("Error leaving cohort:", error);
			toast.error("An unexpected error occurred");
		},
	});

	const handleLeaveCohort = () => {
		execute({ cohortId: cohort.id });
		setConfirmOpen(false);
	};

	return (
		<>
			<div
				className="relative inline-flex"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<Badge
					variant="secondary"
					className={cn(
						"transition-all duration-200 ease-in-out",
						hover ? "pr-6" : "pr-3",
					)}
				>
					{cohort.name}
				</Badge>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setConfirmOpen(true);
					}}
					disabled={isPending}
					className={cn(
						"absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 transition-all duration-200 ease-in-out",
						"inline-flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
						hover ? "scale-100 opacity-100" : "scale-50 opacity-0",
					)}
					aria-label={`Leave ${cohort.name} cohort`}
				>
					<X size={12} />
				</button>
			</div>

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Leave Cohort</DialogTitle>
						<DialogDescription>
							Are you sure you want to leave the{" "}
							<strong>{cohort.name}</strong> cohort?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							variant="outline"
							onClick={() => setConfirmOpen(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={handleLeaveCohort}
							disabled={isPending}
						>
							{isPending ? "Leaving..." : "Leave"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
