import { type ReactNode } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { fullReceiptRes } from "@/lib/schema";
import { TransactionsDataTable } from "@/components/transactions-data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function ReceiptDetailSkeleton(): ReactNode {
  return (
    <div className="max-w-[800px] mx-auto py-10">
      <Card className="w-full">
        <CardHeader>
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
        </CardHeader>
        <CardContent>
          {/* Summary Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }, (_, i) => (
              <Card key={`skeleton-${i}`} className="bg-gray-100 py-2">
                <CardHeader className="pb-0 pt-1 px-4">
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                </CardHeader>
                <CardContent className="pt-1 pb-2 px-4">
                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReceiptDetailPage(): ReactNode {
  const { id } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["receipt", id],
    queryFn: async () => {
      const res = await api.get(`/receipt/${id}`);
      const parseResult = fullReceiptRes.safeParse(res.data);
      if (parseResult.success) {
        return parseResult.data;
      } else {
        throw new Error(parseResult.error.message);
      }
    },
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  if (error) {
    console.log(error);
    return <div>Cannot load receipt</div>;
  }

  if (isPending) {
    return <ReceiptDetailSkeleton />;
  }

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <Card className="w-full capitalize">
        <CardHeader>
          <CardTitle>Receipt #{data.id}</CardTitle>
          <CardDescription>
            Issued on {new Date(data.issuedAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Receipt Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="py-2">
              <CardHeader className="pb-0 pt-1 px-4">
                <CardTitle className="text-base">Receipt ID</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-2 px-4">
                <p className="text-lg font-semibold text-muted-foreground">
                  {data.id}
                </p>
              </CardContent>
            </Card>
            <Card className="py-2">
              <CardHeader className="pb-0 pt-1 px-4">
                <CardTitle className="text-base">Total</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-2 px-4">
                <p
                  className={`text-lg font-semibold ${
                    data.total < 0 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {data.total < 0 ? data.total : `+${data.total}`}
                </p>
              </CardContent>
            </Card>
            <Card className="py-2">
              <CardHeader className="pb-0 pt-1 px-4">
                <CardTitle className="text-base">Date</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-2 px-4">
                <p className="text-lg font-semibold text-muted-foreground">
                  {new Date(data.issuedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Transactions</h3>
            <TransactionsDataTable data={data.transactions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
