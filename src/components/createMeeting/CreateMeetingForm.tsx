'use client';

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeetingCreationSchema } from "@/lib/zod";
import { useAction } from "next-safe-action/hooks";
import { createMeeting } from "@/actions/meetings";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker"
import { TimePicker } from "@/components/ui/time-picker";
import { MeetingLinks } from "./MeetingLinks";

type MeetingFormData = z.input<typeof MeetingCreationSchema>;
type UserType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

export default function CreateMeetingForm({ users }: { users: UserType[] }) {
	const router = useRouter();
	const [date, setDate] = React.useState<DateRange | undefined>(undefined)

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<MeetingFormData>({
		resolver: zodResolver(MeetingCreationSchema),
		defaultValues: {
			title: "",
			description: "",
			rangeStart: undefined,
			rangeEnd: undefined,
			startTime: "09:00",
			endTime: "17:00",
			location: "",
			meetingLinks: [],
			showAttendees: true,
			invitedUsers: [],
		},
	});

	const showAttendees = watch("showAttendees");
	const invitedUsers = watch("invitedUsers");

	// meeting creation action
	const { execute, status, result } = useAction(createMeeting, {
		onSuccess: (result) => {
			if (result.data?.success && result.data?.meetingId) {
				router.push(`/meet/${result.data.meetingId}`);
			}
		},
	});

	const isLoading = status === "executing";

	const onSubmit = handleSubmit((data) => {
    	execute(data);
	});

	// format user data for the combobox component
	const userOptions = users.map((user) => ({
		value: user.id,
		label: `${user.firstName} ${user.lastName} (${user.email})`,
	}));

	const renderError = (message: string) => (
		<p className="text-sm text-red-500">{message}</p>
	);

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			{result?.serverError && (
				<div className="p-3 bg-red-100 text-red-700 rounded-md">
					Error: {result.serverError}
				</div>
			)}
			{status === "hasSucceeded" && !result?.data?.success && (
				<div className="p-3 bg-red-100 text-red-700 rounded-md">
					Failed to create meeting. Please try again.
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Left side: meeting information */}
				<div className="space-y-6">
					{/* Title */}
					<div className="space-y-2">
						<Label htmlFor="title">Title *</Label>
						<Input 
							id="title"
							{...register("title")}
							placeholder="Meeting title"
						/>
						{errors.title && renderError(errors.title.message as string)}
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<textarea 
							id="description"
							{...register("description")}
							placeholder="Meeting description"
							className="w-full rounded-md border p-2 dark:bg-transparent"
						/>
						{errors.description && renderError(errors.description.message as string)}
					</div>

					{/* Meeting links */}
					<MeetingLinks
						links={watch("meetingLinks") || []}
						onLinksChange={(links) => setValue("meetingLinks", links)}
						error={errors.meetingLinks?.message as string}
					/>

					{/* Location */}
					<div className="space-y-2">
						<Label htmlFor="location">Location</Label>
						<Input 
							id="location"
							{...register("location")}
							placeholder="Meeting location"
						/>
						{errors.location && renderError(errors.location.message as string)}
					</div>

					{/* Meeting invitation */}
					<div className="space-y-2">
						<Label>Invite People *</Label>
						<Combobox
							options={userOptions}
							selectedValues={invitedUsers || []}
							onChange={(values) => setValue("invitedUsers", values)}
							placeholder="Select users to invite..."
							multiple
						/>
						{errors.invitedUsers && renderError(errors.invitedUsers.message as string)}
					</div>

					{/* Attendee visibility */}
					<div className="flex items-center space-x-2">
						<Checkbox 
							id="showAttendees" 
							checked={showAttendees}
							onCheckedChange={(checked) => 
								setValue("showAttendees", checked as boolean)
							}
						/>
						<Label htmlFor="showAttendees">Show attendees to everyone</Label>
					</div>
				</div>

				{/* Right side: date and time selection */}
				<div className="space-y-6">
					{/* Date range picker */}
					<div className="space-y-2">
						<Label>Date Range *</Label>
						<Calendar
							mode="range"
							defaultMonth={date?.from}
							disabled={{ before: new Date() }}
							selected={date}
							onSelect={(newDate) => {
								setDate(newDate);
								if (newDate?.from) {
									setValue("rangeStart", newDate.from.toISOString());
								}
								if (newDate?.to) {
									setValue("rangeEnd", newDate.to.toISOString());
								}
								if (newDate === undefined) {
									setValue("rangeStart", "");
									setValue("rangeEnd", "");
								}
							}}
							numberOfMonths={1}
							className="border rounded-lg shadow-md p-4 bg-white"
							classNames={{
								root: "w-full flex flex-col items-center gap-4",
								months: "flex w-full justify-center",
								month: "w-full",
								table: "w-full",
								head_row: "grid grid-cols-7 text-sm text-muted-foreground font-medium",
								row: "grid grid-cols-7",
								head_cell: "h-10 flex items-center justify-center",
								day: [
									"w-full h-12",
									"flex items-center justify-center",
									"hover:bg-accent hover:text-accent-foreground",
								].join(" "),
							}}
						/>
						{errors.rangeStart && errors.rangeEnd ? (
							renderError("Invalid start and end date")
						) : (
							<>
								{errors.rangeStart && renderError(errors.rangeStart.message as string)}
								{errors.rangeEnd && renderError(errors.rangeEnd.message as string)}
							</>
						)}
					</div>

					{/* Time selection */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="startTime">Start Time</Label>
							<TimePicker
								date={watch("startTime") ? new Date(`2000-01-01T${watch("startTime")}`) : undefined}
								setDate={(date) => setValue("startTime", date ? date.toTimeString().slice(0, 5) : "")}
							/>
							{errors.startTime && renderError(errors.startTime.message as string)}
						</div>
						
						<div className="space-y-2">
							<Label htmlFor="endTime">End Time</Label>
							<TimePicker
								date={watch("endTime") ? new Date(`2000-01-01T${watch("endTime")}`) : undefined}
								setDate={(date) => setValue("endTime", date ? date.toTimeString().slice(0, 5) : "")}
							/>
							{errors.endTime && renderError(errors.endTime.message as string)}
						</div>
					</div>
				</div>
			</div>

			<Button 
				type="submit" 
				className="w-full" 
				disabled={isLoading}
			>
				{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
				Create Meeting
			</Button>
		</form>
	);
}