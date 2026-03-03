import { type ReactNode } from "react";
import * as z from "zod";
import { productDataAndpurchase } from "@/lib/schema";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProductInfo = z.infer<typeof productDataAndpurchase>["productInfo"];

interface ProductHeaderCardProps {
  product: ProductInfo;
  showStock?: boolean;
  children?: ReactNode;
}

export default function ProductHeaderCard({
  product,
  showStock = false,
  children,
}: ProductHeaderCardProps): ReactNode {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-2 uppercase">
              {product.brand}
            </Badge>
            <CardTitle className="lg:text-3xl mb-2">{product.name}</CardTitle>
            <CardDescription className="text-base">
              Product ID: {product.id}
            </CardDescription>
            {showStock && (
              <div className="mt-2">
                <p
                  className={`text-sm lg:text-lg ${
                    product.availableUnits < 10
                      ? "text-red-600"
                      : "text-slate-600"
                  }`}
                >
                  Available Units: {product.availableUnits}
                </p>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm lg:text-lg text-slate-600 mb-1">
              Selling Price
            </div>
            <div className="lg:text-3xl font-bold text-slate-900">
              QAR {product.sellingPrice}
            </div>
          </div>
        </div>
      </CardHeader>
      {children && (
        <CardFooter className="mt-2 flex justify-end gap-2 ">
          {children}
        </CardFooter>
      )}
    </Card>
  );
}
