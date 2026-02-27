import type { FieldInputProps } from "@/components/FieldInput";

type FormField = Omit<FieldInputProps, "control">;

export const productFormFields: FormField[] = [
  {
    name: "productId",
    placeholder: "enter the product ID (if it exists)",
    label: "Product ID",
    type: "number",
    fieldType: "input",
  },
  {
    name: "productName",
    placeholder: "ex. car charging cable",
    label: "Product Name",
    type: "text",
    fieldType: "input",
  },
  {
    name: "availableUnits",
    placeholder: "how many units are available of this product",
    label: "Available Units",
    type: "number",
    fieldType: "input",
  },
  {
    name: "sellingPrice",
    placeholder: "How much would this product sell for",
    label: "Selling Price",
    type: "number",
    fieldType: "input",
  },
  {
    name: "description",
    placeholder: "Enter a description for the product",
    label: "Description",
    fieldType: "textarea",
    type: "text",
  },
];

export const supplierFormFields: FormField[] = [
  {
    name: "purchasePrice",
    placeholder: "How much did you buy this product for",
    label: "Purchase Price",
    fieldType: "input",
    type: "number",
  },
];
