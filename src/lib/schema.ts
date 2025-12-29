import * as z from "zod";

export const formSchema = z.object({
  productId: z.coerce.number().optional(),
  productName: z
    .string("this field is required")
    .trim()
    .min(1, "you must provide a product name"),
  brand: z.coerce.string().min(1, "this field is required").or(z.literal("")),
  newBrand: z.string(),
  description: z.string().optional(),
  sellingPrice: z.coerce
    .number("this field is required")
    .positive("this value must be bigger then 0"),
  availableUnits: z.coerce.number("this field is required"),

  ImageSRC: z.string().optional(),
  supplierID: z
    .literal("new")
    .or(z.literal("-1"))
    .or(z.coerce.number())
    .optional(),

  purchasePrice: z.coerce.number().positive().or(z.literal("")),
  purchaseDate: z.coerce.date().or(z.literal("")),
  newSupplier: z.string().optional(),
  toPrint: z.coerce.boolean(),
  copies: z
    .literal("")
    .or(z.coerce.number().positive("number of copies must be more the one")),
});
export type fieldName = keyof z.infer<typeof formSchema>;
export const brandAndSupplierSchema = z.object({
  brand: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    })
  ),
  supplier: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    })
  ),
});
