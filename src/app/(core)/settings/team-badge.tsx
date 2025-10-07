"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/shared/utils";
import { leaveTeam } from "@/actions/settings";
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

interface TeamBadgeProps {
	team: { id: string; name: string };
	userTeams: { id: string; name: string }[];
}

export function TeamBadge({ team, userTeams }: TeamBadgeProps) {
	const [hover, setHover] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	// Use optimistic action to instantly remove the team from UI
	const { execute, isPending } = useOptimisticAction(leaveTeam, {
		// Pass current team state
		currentState: { userTeams },
		// Update optimistically before server responds
		updateFn: (state, input) => {
			// Remove the team from user's teams
			return {
				userTeams: state.userTeams.filter(
					(c) => c.id !== input.teamId,
				),
			};
		},
		// Handle successful action
		onSuccess: (result) => {
			if (result.data?.success) {
				toast.success(
					result.data.message || "Successfully left team",
				);
			} else {
				toast.error(result.data?.message || "Failed to leave team");
			}
		},
		// Handle errors
		onError: (error) => {
			console.error("Error leaving team:", error);
			toast.error("An unexpected error occurred");
		},
	});

	const handleLeaveTeam = () => {
		execute({ teamId: team.id });
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
					{team.name}
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
					aria-label={`Leave ${team.name} team`}
				>
					<X size={12} />
				</button>
			</div>

			<Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Leave Team</DialogTitle>
						<DialogDescription>
							Are you sure you want to leave the{" "}
							<strong>{team.name}</strong> team?
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
							onClick={handleLeaveTeam}
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
