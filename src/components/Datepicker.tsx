/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { format } from "date-fns"; // Standard for Shadcn datepickers
import { Calendar as CalendarIcon } from "lucide-react"; // Nice to have an icon
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Datepicker({
  name,
  control,
  label,
  placeholder,
  className,
}: {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-3">
          <Label htmlFor={name} className="px-1">
            {label}
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id={name}
                ref={field.ref}
                className={cn(
                  "w-48 justify-between font-normal",
                  !field.value && "text-muted-foreground",
                  className
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder || "Select date"}</span>
                )}
                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date("1900-01-01") || date > new Date()
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
