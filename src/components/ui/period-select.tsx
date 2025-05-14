"use client";

import * as React from "react";
import { Period, convert12HourTo24Hour, display12HourValue } from "./time-picker-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePeriodSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  period: Period;
  setPeriod: (period: Period) => void;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  onLeftFocus?: () => void;
}

const TimePeriodSelect = React.forwardRef<HTMLButtonElement, TimePeriodSelectProps>(
  ({ period, setPeriod, date, setDate, onLeftFocus, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onLeftFocus?.();
      } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const newPeriod = period === "AM" ? "PM" : "AM";
        setPeriod(newPeriod);
        
        if (date && setDate) {
          const newDate = new Date(date);
          const hours = date.getHours();
          const hour12 = display12HourValue(hours);
          const newHour24 = convert12HourTo24Hour(hour12, newPeriod);
          newDate.setHours(newHour24);
          setDate(newDate);
        }
      }
    };

    const handleValueChange = (value: string) => {
      const newPeriod = value as Period;
      setPeriod(newPeriod);
      
      if (date && setDate) {
        const newDate = new Date(date);
        const hours = date.getHours();
        const hour12 = display12HourValue(hours);
        const newHour24 = convert12HourTo24Hour(hour12, newPeriod);
        newDate.setHours(newHour24);
        setDate(newDate);
      }
    };

    return (
      <Select value={period} onValueChange={handleValueChange}>
        <SelectTrigger 
          ref={ref} 
          onKeyDown={handleKeyDown}
          className="w-[70px]"
        >
          <SelectValue placeholder={period} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    );
  }
);

TimePeriodSelect.displayName = "TimePeriodSelect";

export { TimePeriodSelect }; 