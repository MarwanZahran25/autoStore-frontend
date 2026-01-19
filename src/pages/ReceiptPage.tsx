import { type ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ScanLine,
  Keyboard,
  Trash2,
  Receipt as ReceiptIcon,
  Plus,
} from "lucide-react";
import ReceiptProductCard from "@/components/ReceiptProductCard";
import ReceiptIncomeCard from "@/components/ReceiptIncomeCard";
import ReceiptExpenseCard from "@/components/ReceiptExpenseCard";
import ReceiptTransactionButtons from "@/components/ReceiptTransactionButtons";
import { useReciptStore } from "@/store";
import { api } from "@/lib/api";
import { productDataAndpurchase } from "@/lib/schema";
import * as z from "zod";

export default function ReceiptPage(): ReactNode {
  const [productId, setProductId] = useState("");
  const [currentProduct, setCurrentProduct] = useState<z.infer<
    typeof productDataAndpurchase
  > | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(0);
  const { products, addEntry, resetRecipt } = useReciptStore();

  const fetchProduct = async (id: string) => {
    try {
      const response = await api.get(`/product/${id}`);
      const validatedProduct = productDataAndpurchase.parse(response.data);
      setCurrentProduct(validatedProduct);
      setSellingPrice(validatedProduct.productInfo.sellingPrice);
      setQuantity(1);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Product not found");
    }
  };

  const handleAddProduct = () => {
    if (!currentProduct) return;
    addEntry({
      productId: currentProduct.productInfo.id,
      name: currentProduct.productInfo.name,
      brand: currentProduct.productInfo.brand,
      pricePerUnit: sellingPrice,
      quantity: quantity,
    });
    setCurrentProduct(null);
    setProductId("");
    setQuantity(1);
    setSellingPrice(0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ReceiptIcon className="h-6 w-6 text-slate-700" />
                <CardTitle>Receipt</CardTitle>
              </div>
              <div className="text-sm text-slate-600">
                {new Date().toLocaleString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Scan or enter product ID"
                  className="pl-10 pr-32 h-12"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchProduct(productId);
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    onClick={() => fetchProduct(productId)}
                  >
                    <Keyboard className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              {currentProduct && (
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">
                          {currentProduct.productInfo.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {currentProduct.productInfo.brand}
                        </p>
                        {currentProduct.purchaseInfo.length > 0 && (
                          <p className="text-xs text-slate-500">
                            Purchase Price: QAR{" "}
                            {currentProduct.purchaseInfo[0].purchase.price?.toFixed(
                              2,
                            ) || "N/A"}
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
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              setSellingPrice(Number(e.target.value))
                            }
                            className="w-20 h-8"
                          />
                        </div>
                        <Button
                          onClick={handleAddProduct}
                          size="sm"
                          className="h-8"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                {products.map((entry, index) => {
                  if (entry.productId !== undefined) {
                    return (
                      <ReceiptProductCard
                        key={index}
                        id={entry.productId}
                        name={entry.name!}
                        brand={entry.brand!}
                        price={entry.pricePerUnit!}
                        quantity={entry.quantity || 1}
                      />
                    );
                  } else {
                    if (entry.pricePerUnit && entry.pricePerUnit > 0) {
                      return (
                        <ReceiptIncomeCard
                          key={index}
                          name={entry.name!}
                          amount={entry.pricePerUnit}
                        />
                      );
                    } else {
                      return (
                        <ReceiptExpenseCard
                          key={index}
                          name={entry.name!}
                          amount={Math.abs(entry.pricePerUnit || 0)}
                        />
                      );
                    }
                  }
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>
                    QAR{" "}
                    {products
                      .reduce((total, entry) => {
                        if (
                          entry.productId !== undefined &&
                          entry.quantity !== undefined
                        ) {
                          return total + entry.pricePerUnit! * entry.quantity;
                        } else {
                          return total + (entry.pricePerUnit || 0);
                        }
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <ReceiptTransactionButtons />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={resetRecipt}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={async () => {
                      const res = await api.post("/receipt/add", {
                        transactions: products,
                      });
                      console.log(res.data);
                      resetRecipt();
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
