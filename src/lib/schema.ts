import * as z from "zod";

export const formSchema = z.object({
  id: z.bigint().optional(),
  name: z.string().trim().min(1, "you must provide a product name"),
  brand: z.string().optional(),
  description: z.string().optional(),
  sellingPrice: z.int().min(1, "the product price must be bigger than 1 QR"),
  availableUnits: z.int().min(1, "available units must be more than 1"),
  ImageSRC: z.string().optional(),
  supplierName: z.string().trim().min(2, "you must enter supplier name"),
  purchasePrice: z
    .float32()
    .gt(0.5, "the purchase price must be greater than 0"),
  purchaseDate: z.date().default(() => new Date()),
});
