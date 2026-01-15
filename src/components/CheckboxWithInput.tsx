/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldInput from "./FieldInput";
import { useWatch } from "react-hook-form";
export default function CheckboxWithInput({ control }: { control: any }) {
  const toPrint = useWatch({
    control: control,
    name: "toPrint",
  });
  return (
    <div className="flex items-end justify-start gap-3 col-start-1">
      <FieldInput
        label="print barcode"
        name="toPrint"
        placeholder=""
        fieldType="checkbox"
        control={control}
        className="max-w-20"
      />

      <FieldInput
        label="Copies"
        name="copies"
        placeholder="copies"
        fieldType="input"
        control={control}
        width={70}
        disabled={!toPrint}
      />
    </div>
  );
}
