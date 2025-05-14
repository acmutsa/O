"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import * as CommandPrimitive from "cmdk"

import { cn } from "@/lib/shared/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "./badge"

export type OptionType = {
  value: string
  label: string
}

interface ComboboxProps {
  options: OptionType[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  emptyText?: string
  multiple?: boolean
}

export function Combobox({
  options,
  selectedValues,
  onChange,
  placeholder = "Select option",
  emptyText = "No options found.",
  multiple = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  
  const selectedLabels = React.useMemo(() => {
    return selectedValues
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean) as string[]
  }, [selectedValues, options])

  const handleSelect = React.useCallback(
    (value: string) => {
      if (multiple) {
        onChange(
          selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value]
        )
      } else {
        onChange(selectedValues.includes(value) ? [] : [value])
        setOpen(false)
      }
    },
    [multiple, onChange, selectedValues]
  )

  const handleRemove = React.useCallback(
    (value: string) => {
      onChange(selectedValues.filter((v) => v !== value))
    },
    [onChange, selectedValues]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            selectedValues.length > 0 && multiple
              ? "h-auto flex-wrap"
              : "h-10"
          )}
        >
          {selectedValues.length > 0 ? (
            multiple ? (
              <div className="flex flex-wrap gap-1">
                {selectedLabels.map((label, i) => (
                  <Badge 
                    key={i} 
                    className="mr-1 mb-1"
                    variant="secondary"
                  >
                    {label}
                    <span
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(selectedValues[i])
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={() => handleRemove(selectedValues[i])}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </span>
                  </Badge>
                ))}
              </div>
            ) : (
              selectedLabels[0]
            )
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}