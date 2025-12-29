import type { fieldName } from "@/lib/schema";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type selectFieldProps = {
  name: fieldName;
  values: supplier[];
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  label: string;
  type: "brand" | "supplier";
  pending: boolean;
};
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
type supplier = { id?: number; name: string };
export default function SelectField({
  name,
  values,
  placeholder,
  control,
  label,
  type,
  pending,
}: selectFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Select value={field.value || ""} onValueChange={field.onChange}>
            <SelectTrigger
              className="w-[180px]"
              id={name}
              aria-invalid={fieldState.invalid}
              disabled={pending}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder}</SelectLabel>
                {values.map((elment) => {
                  return (
                    <SelectItem
                      value={type === "brand" ? elment.name : String(elment.id)}
                      key={elment.name}
                    >
                      {elment.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
