import { type ReactNode } from "react";
import * as z from "zod";
import { formSchema } from "../lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
export default function AddProductForm(): ReactNode {
  type FormType = z.infer<typeof formSchema>;
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  return (
    <div className="w-screen flex justify-center items-center h-screen"></div>
  );
}
