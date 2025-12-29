import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import * as z from "zod";
import { formSchema } from "@/lib/schema";

export type FieldInputProps = {
  name: keyof z.infer<typeof formSchema>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  placeholder?: string;
  label: string;
  type?: "number" | "text";
  fieldType: "input" | "textarea" | "checkbox";
  width?: number;
  className?: string;
};
export default function FieldInput({
  name,
  label,
  control,
  placeholder,
  type,
  fieldType,
  width,
  className,
}: FieldInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          {fieldType === "input" && (
            <Input
              style={{ maxWidth: `${width || 350}px` }}
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              type={type}
              value={field.value || ""}
            />
          )}
          {fieldType === "textarea" && (
            <Textarea
              className="max-w-[350px]"
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete="off"
              value={field.value || ""}
            />
          )}
          {fieldType === "checkbox" && (
            <Checkbox
              className="max-w-[25px] min-h-[25px]"
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              checked={field.value || false}
              onCheckedChange={field.onChange}
            />
          )}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
