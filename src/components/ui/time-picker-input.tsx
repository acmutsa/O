"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import {
  Period,
  TimePickerType,
  getArrowByType,
  getDateByType,
  setDateByType,
} from "./time-picker-utils";

export interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  period?: Period;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

const TimePickerInput = React.forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = "tel",
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      setDate,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false);
    const [prevIntKey, setPrevIntKey] = React.useState<string>("0");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onRightFocus?.();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onLeftFocus?.();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const valueToUse = e.currentTarget.value || getDateByType(date, picker);
        const newValue = getArrowByType(valueToUse, 1, picker);
        if (date) {
          const newDate = new Date(date);
          const updatedDate = setDateByType(newDate, newValue, picker, period);
          setDate(updatedDate);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const valueToUse = e.currentTarget.value || getDateByType(date, picker);
        const newValue = getArrowByType(valueToUse, -1, picker);
        if (date) {
          const newDate = new Date(date);
          const updatedDate = setDateByType(newDate, newValue, picker, period);
          setDate(updatedDate);
        }
      }

      onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const parsedInt = parseInt(inputValue.slice(-1), 10);

      if (isNaN(parsedInt)) {
        e.preventDefault();
        return;
      }

      let newValue: string;

      if (flag) {
        newValue = prevIntKey + inputValue.slice(-1);
        setFlag(false);
      } else {
        setPrevIntKey(inputValue.slice(-1));
        setFlag(true);
        newValue = inputValue.slice(-1).padStart(2, "0");
      }

      if (!date) return;

      const newDate = new Date(date);
      const updatedDate = setDateByType(newDate, newValue, picker, period);
      setDate(updatedDate);

      onChange?.(e);
    };

    const handleClick = () => {
      setFlag(false);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
      setFlag(false);
    };

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={className}
        type={type}
        inputMode="numeric"
        onClick={handleClick}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={date ? getDateByType(date, picker) : ""}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = "TimePickerInput";

export { TimePickerInput }; 