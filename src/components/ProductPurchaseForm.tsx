import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectField from "./SelectField";
import FieldInput from "./FieldInput";
import { purchaseSchema, brandAndSupplierSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { backendServer } from "@/myConfig";
import { Button } from "./ui/button";
import { Datepicker } from "./Datepicker";
import { Field } from "./ui/field";
import { api } from "@/lib/api";
export default function PurchaseForm({ productId }: { productId: number }) {
  const form = useForm<z.infer<typeof purchaseSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(purchaseSchema) as any,
    defaultValues: {
      quantity: "",
      purchasePrice: "",
      supplierID: "",
      newSupplier: "",
      purchaseDate: "",
    },
    mode: "onChange",
  });
  const { data, isPending } = useQuery({
    queryKey: ["suppliersAndBrands"],
    queryFn: async () => {
      const res = await api.get(`${backendServer}/product/brandsInfo`);
      const parseRes = brandAndSupplierSchema.safeParse(res.data);
      if (parseRes.success) {
        return parseRes.data;
      }
    },
  });
  const supplierValues = data?.supplier;
  const supplier = useWatch({ control: form.control, name: "supplierID" });

  async function onSubmit(data: z.infer<typeof purchaseSchema>) {
    const newData = { ...data, productId };
    console.log(newData);
    await api.post(`${backendServer}/qty/add`, { newData });
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Purchase Entry</CardTitle>
          <CardDescription>
            Enter purchase details to Add a new Stock
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="purchase-form"
            className="space-y-4 grid lg:grid-cols-2 grid-cols-1 gap-4"
          >
            <FieldInput
              label="Quantity"
              name="quantity"
              placeholder="number of new units"
              control={form.control}
              type="number"
              fieldType="input"
              width={500}
            />
            <FieldInput
              label="purchase Price"
              name="purchasePrice"
              placeholder="price of new units"
              control={form.control}
              type="number"
              fieldType="input"
              width={500}
            />
            <SelectField
              values={supplierValues || []}
              name="supplierID"
              placeholder="Choose A Supplier"
              label="Supplier"
              control={form.control}
              type="supplier"
              pending={isPending}
              className="max-w-[500px]"
            />
            <FieldInput
              label="New Supplier"
              name="newSupplier"
              placeholder="Name of the new supplier"
              control={form.control}
              type="text"
              fieldType="input"
              width={500}
              disabled={supplier != -1}
            />

            <Datepicker
              control={form.control}
              label="Date of purchase"
              placeholder="Date"
              name="purchaseDate"
            />
          </form>
        </CardContent>

        <CardFooter>
          <Field>
            <Button
              form="purchase-form"
              disabled={!form.formState.isValid}
              className="col-span-2 max-w-24 self-center"
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
