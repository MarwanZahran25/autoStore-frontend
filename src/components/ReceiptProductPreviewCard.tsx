import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import * as z from "zod";
import { productDataAndpurchase } from "@/lib/schema";

type Product = z.infer<typeof productDataAndpurchase>;

interface ProductPreviewCardProps {
  product: Product;
  initialSellingPrice: number;
  onAdd: (productId: number, quantity: number, sellingPrice: number) => void;
}

export default function ProductPreviewCard({
  product,
  initialSellingPrice,
  onAdd,
}: ProductPreviewCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(initialSellingPrice);

  const handleAdd = () => {
    onAdd(product.productInfo.id, quantity, sellingPrice);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium">{product.productInfo.name}</h3>
            <p className="text-sm text-slate-600">{product.productInfo.brand}</p>
            {product.purchaseInfo.length > 0 && (
              <p className="text-xs text-slate-500">
                Purchase Price: QAR{" "}
                {product.purchaseInfo[0].purchase.price || "N/A"}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="quantity" className="text-sm">
                Qty:
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 h-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="price" className="text-sm">
                Price:
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-20 h-8"
              />
            </div>
            <Button onClick={handleAdd} size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              Add to Receipt
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
