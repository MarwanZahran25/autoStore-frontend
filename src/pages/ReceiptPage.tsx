import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt as ReceiptIcon, Trash2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductLookupInput from "@/components/ReceiptProductLookupInput";
import ProductPreviewCard from "@/components/ReceiptProductPreviewCard";
import ReceiptEntryList from "@/components/ReceiptEntryList";
import ReceiptTotal from "@/components/ReceiptTotal";
import ReceiptTransactionButtons from "@/components/ReceiptTransactionButtons";
import { useReciptStore } from "@/store";
import { api } from "@/lib/api";
import { productDataAndpurchase } from "@/lib/schema";
import * as z from "zod";

type Product = z.infer<typeof productDataAndpurchase>;

export default function ReceiptPage(): ReactNode {
  const [productId, setProductId] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const { products, addEntry, resetRecipt } = useReciptStore();

  const {
    data: currentProduct,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", searchKey],
    queryFn: async () => {
      const response = await api.get(`/product/${searchKey}`);
      return productDataAndpurchase.parse(response.data);
    },
    enabled: searchKey.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const handleAddProduct = (
    productId: number,
    quantity: number,
    sellingPrice: number,
  ) => {
    if (!currentProduct) return;

    addEntry({
      productId,
      name: currentProduct.productInfo.name,
      brand: currentProduct.productInfo.brand,
      pricePerUnit: sellingPrice,
      quantity,
    });

    setProductId("");
    setSearchKey("");
  };

  const handleCheckout = async () => {
    await api.post("/receipt/add", {
      transactions: products,
    });

    resetRecipt();
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
              <ProductLookupInput
                productId={productId}
                onProductIdChange={setProductId}
                onFetch={() => setSearchKey(productId)}
              />

              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  Product not found
                </div>
              )}

              {currentProduct && !isLoading && (
                <ProductPreviewCard
                  product={currentProduct}
                  initialSellingPrice={currentProduct.productInfo.sellingPrice}
                  onAdd={handleAddProduct}
                />
              )}

              <ReceiptEntryList entries={products} />
              <ReceiptTotal products={products} />

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
                  <Button className="flex-1" onClick={handleCheckout}>
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
