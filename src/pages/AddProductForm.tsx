import { type ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductInfo = {
  id?: number;
  name: string;
  brand: string;
  description?: string;
  sellingPrice: number;
  availableUnits: number;
  imageSrc?: string;
  toPrint: boolean;
  copies?: number;
};

export default function AddProductForm(): ReactNode {
  const [toPrint, setToPrint] = useState(false);

  const { register, handleSubmit } = useForm<ProductInfo>();
  async function onSubmit(data: ProductInfo) {
    const newObj = {
      productInfo: {
        ...data,
        toPrint,
      },
    };
    console.log(newObj);
    await axios.post(`http://localhost:8080/product/add`, newObj);
  }
  return (
    <div className="w-screen flex justify-center items-center h-screen">
      <Card className="w-md max-w-lg">
        <CardHeader>
          <CardTitle>Add a new product</CardTitle>
          <CardDescription>
            Enter product information to add to you inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="id">Product ID</Label>
                <Input {...register("id")} id="id" type="number" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="Name">Name </Label>
                </div>
                <Input {...register("name")} id="Name" type="text" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="Brand">Brand </Label>
                </div>
                <Input {...register("brand")} id="Brand" type="text" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="Description">Description </Label>
                </div>
                <Textarea {...register("description")} id="Description" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="price">Product price </Label>
                </div>
                <Input {...register("sellingPrice")} id="price" type="number" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="availableUnits">Available units </Label>
                </div>
                <Input
                  {...register("availableUnits")}
                  id="availableUnits"
                  type="number"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-row-reverse justify-end gap-3">
                  <Label htmlFor="print">Print barcode </Label>
                  <Checkbox onClick={() => setToPrint((e) => !e)} id="print" />
                </div>
                {toPrint && (
                  <div className="flex flex-col gap-3 items-center">
                    <Label htmlFor="print">Copies</Label>
                    <Input
                      {...register("copies")}
                      type="number"
                      className="w-12 p-2 pl-2 pr-2"
                    />
                  </div>
                )}
              </div>
            </div>
            <CardFooter className="flex-col gap-2 mt-5">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
