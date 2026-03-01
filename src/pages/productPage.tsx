import { type ReactNode } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Package, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PurchaseForm from "../components/ProductPurchaseForm";
import { productDataAndpurchase } from "@/lib/schema";
import PurchaseTable from "@/components/ProductPurchaseTable";
import ProductHeaderCard from "@/components/ProductHeaderCard";

function ProductPageSkeleton(): ReactNode {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 text-sm lg:text-lg w-full">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header Card Skeleton */}
        <div className="bg-gray-200 animate-pulse rounded-xl h-32"></div>

        {/* Current Stock Card Skeleton */}
        <div className="bg-gray-200 animate-pulse rounded-xl h-48"></div>

        {/* Purchase Table Skeleton */}
        <div className="bg-gray-200 animate-pulse rounded-xl h-64"></div>

        {/* Purchase Form Skeleton */}
        <div className="bg-gray-200 animate-pulse rounded-xl h-40"></div>
      </div>
    </div>
  );
}

export default function ProductPage(): ReactNode {
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const res = await api.get(`/product/${id}`);
      return res.data;
    },
    staleTime: 5 * 60 * 100,
    queryKey: ["product", id],
    retry: false,
  });
  if (isPending) {
    return <ProductPageSkeleton />;
  }

  const parsingresult = productDataAndpurchase.safeParse(data);
  if (parsingresult.success) {
    const product = parsingresult.data.productInfo;
    const purchaseInfo = parsingresult.data.purchaseInfo;
    const isLowStock = product.availableUnits < 10;

    return (
      <div>
        {data && (
          <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 text-sm lg:text-lg wrap wrap-normal w-full ">
            <div className="max-w-6xl mx-auto space-y-5">
              {/* Header Card */}
              <ProductHeaderCard product={product}></ProductHeaderCard>

              {/* Product Description Card */}
              {product.description && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{product.description}</p>
                  </CardContent>
                </Card>
              )}

              <div className="max-w-6xl mx-auto space-y-6">
                {/* Current Stock Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Current Stock
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-sm lg:text-lg text-slate-600">
                          Available Units
                        </p>
                        <p className="text-3xl font-bold text-slate-900">
                          {product.availableUnits}
                        </p>
                      </div>
                      <div>
                        {isLowStock ? (
                          <Badge className="bg-red-500">Low Stock</Badge>
                        ) : (
                          <Badge className="bg-green-500">In Stock</Badge>
                        )}
                      </div>
                    </div>

                    {isLowStock && (
                      <div className="flex items-start gap-2 p-3 bg-red-300 border border-white rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                        <p className="text-sm lg:text-lg text-red-500">
                          Stock levels are low.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Purchase History */}
              <PurchaseTable data={purchaseInfo} />
              <PurchaseForm productId={parsingresult.data.productInfo.id} />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}
