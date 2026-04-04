import { useState, type ReactNode } from "react";
import * as z from "zod";
import axios from "axios";
import { api } from "../lib/api";
import { formSchema, brandAndSupplierSchema } from "../lib/schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "@/components/FieldInput";
import SelectField from "@/components/SelectField";
import CheckboxWithInput from "@/components/CheckboxWithInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productFormFields, supplierFormFields } from "@/config/formFields";
import { Datepicker } from "@/components/Datepicker";
import { Field } from "@/components/ui/field";

type FormType = z.infer<typeof formSchema>;
const newSupplierVal = -1;
const newBrandVal = "new";
export default function AddProductForm(): ReactNode {
  const [supplierFields, setSupplierFields] = useState(false);
  async function formSubmit(d: FormType) {
    const response = await api.post(`${import.meta.env.VITE_BACKEND_SERVER}/product/add`, d);
    return response.data;
  }
  const queryClient = useQueryClient();
  const form = useForm<FormType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      purchaseDate: "",
      purchasePrice: "",
      description: "",
      copies: "",
      toPrint: false,
      newBrand: "",
    },
    mode: "onBlur",
  });
  const { isPending, error, data } = useQuery({
    queryKey: ["suppliersAndBrands"],
    queryFn: async () => {
      const res = await api.get("/product/brandsInfo");
      return brandAndSupplierSchema.parse(res.data);
    },
  });

  const mutation = useMutation({
    mutationFn: formSubmit,
    onSuccess: async (responseData: { productId: number }) => {
      const d = form.getValues();
      if (d.brand === newBrandVal || d.supplierID == newSupplierVal) {
        await queryClient.invalidateQueries({
          queryKey: ["suppliersAndBrands", "products"],
        });
      }
      toast.success(
        `product : (${d.productName}) has been added to the Database Successfully`,
      );
      form.reset();
      if (d.toPrint) {
        try {
          await axios.post(`${import.meta.env.VITE_PRINT_SERVER}/print`, {
            id: responseData.productId,
            price: d.sellingPrice,
            name: d.productName,
            numberOfCopies: d.copies,
          });
          toast.success(`${d.copies} copy sent to the printer`);
        } catch {
          toast.error("couldn't print the barcodes please try again later");
        }
      }
    },
    onError: (e) => {
      toast.error("this product couldnt be added now please try again");
      console.log(e);
    },
  });

  function onSubmit(d: FormType) {
    mutation.mutate(d);
  }

  const brand = useWatch({ control: form.control, name: "brand" });
  const supplier = useWatch({ control: form.control, name: "supplierID" });

  return (
    <div className="  p-6 flex justify-center items-start min-h-screen ">
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Add a new product</CardTitle>
          <CardDescription>
            fill in the product details to add to the product Database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid lg:grid-cols-2 gap-4 grid-cols-1"
            onSubmit={form.handleSubmit(onSubmit)}
            id="add-product-form"
          >
            {productFormFields.map((f) => {
              return (
                <FieldInput
                  key={f.name}
                  name={f.name}
                  placeholder={f.placeholder}
                  type={f.type}
                  fieldType={f.fieldType}
                  control={form.control}
                  label={f.label}
                />
              );
            })}
            <SelectField
              type={"brand"}
              values={data?.brand || []}
              name="brand"
              placeholder="Select a brand"
              control={form.control}
              label="Brand"
              pending={isPending || error != null}
            />

            <FieldInput
              name="newBrand"
              label="Brand name"
              fieldType="input"
              control={form.control}
              disabled={brand !== newBrandVal}
              placeholder="New brand name"
            />

            <CheckboxWithInput control={form.control} />
            <Button
              variant="link"
              type="button"
              className="col-start-1 max-w-35 text-md col-span-2"
              onClick={() => setSupplierFields((cur) => !cur)}
              aria-expanded={supplierFields}
            >
              + Add Supplier info
            </Button>

            {supplierFields && (
              <>
                <SelectField
                  type={"supplier"}
                  values={data?.supplier || []}
                  name="supplierID"
                  control={form.control}
                  label="Supplier"
                  placeholder="Select supplier"
                  pending={isPending || error != null}
                />

                <FieldInput
                  name="newSupplier"
                  label="Supplier Name"
                  fieldType="input"
                  control={form.control}
                  disabled={supplier != -1}
                  placeholder="New supplier Name"
                />

                {supplierFormFields.map((f) => {
                  return (
                    <FieldInput
                      key={f.name}
                      name={f.name}
                      placeholder={f.placeholder}
                      type={f.type}
                      fieldType={f.fieldType}
                      control={form.control}
                      label={f.label}
                    />
                  );
                })}
                <Datepicker
                  control={form.control}
                  name="purchaseDate"
                  label="purchase Date"
                />
              </>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation={"horizontal"}>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="add-product-form"
              disabled={mutation.isPending}
            >
              {!mutation.isPending && "Submit"}
              {mutation.isPending && <Spinner />}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
