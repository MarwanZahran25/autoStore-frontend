import { type ReactNode, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { productDataAndpurchase } from "@/lib/schema";
import ProductHeaderCard from "@/components/ProductHeaderCard";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import AddIncomeDialog from "@/components/AddIncomeDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScanLine, Keyboard, ShoppingCart, X, Receipt } from "lucide-react";
import { api } from "@/lib/api";
import { useReciptStore } from "@/store";

export default function MainPage(): ReactNode {
  const navigate = useNavigate();
  const { addEntry } = useReciptStore();
  const [productId, setProductId] = useState<string>("");
  const [searchId, setSearchId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P" || e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const { data, error } = useQuery({
    queryFn: async () => {
      if (!searchId) return null;
      const res = await api.get(
        `${import.meta.env.VITE_BACKEND_SERVER}/product/${searchId}`,
      );

      if (res.status !== 200) {
        throw new Error("Product not found or invalid data");
      }

      return res.data;
    },
    queryKey: ["product", searchId],
    enabled: searchId !== null,
    retry: false,
  });

  const search = () => {
    if (productId.trim()) {
      const id = parseInt(productId.trim());
      if (!isNaN(id)) {
        setSearchId(id);
      }
    }
  };

  const handleCancel = () => {
    setProductId("");
    setSearchId(null);
  };

  const parsingResult = productDataAndpurchase.safeParse(data);
  const product = parsingResult?.success
    ? parsingResult.data.productInfo
    : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Product Scanner Section */}
        <div className="space-y-2 mt-8">
          <Label
            htmlFor="product-scanner-input"
            className="text-base font-semibold"
          >
            Product Scan
          </Label>
          <div className="relative flex-1">
            <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              id="product-scanner-input"
              type="text"
              placeholder="Scan or enter product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }}
              ref={inputRef}
              className="pl-10 pr-32 text-base h-12"
              autoFocus
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">
                Press '/' to focus
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => search()}
                className="h-8"
              >
                <Keyboard className="h-4 w-4 mr-1" />
                Enter
              </Button>
            </div>
          </div>
        </div>

        {/* Product Information Card */}

        {error && productId && (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-red-600">
                Product not found. Please try another ID.
              </p>
            </CardContent>
          </Card>
        )}

        {product && (
          <ProductHeaderCard product={product} showStock>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={() => {
                addEntry({
                  productId: product.id,
                  name: product.name,
                  brand: product.brand,
                  pricePerUnit: product.sellingPrice,
                  quantity: 1,
                });
                navigate("/receipts/new");
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Receipt
            </Button>
          </ProductHeaderCard>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-around gap-3 mt-12">
          <AddIncomeDialog />
          <AddExpenseDialog />
          <Button
            variant="outline"
            onClick={() => navigate("/receipts/new")}
            className=" md:h-10"
          >
            <Receipt className="h-4 w-4 mr-2 grow-0" />
            Start a Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
