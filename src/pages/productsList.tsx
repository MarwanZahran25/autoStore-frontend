import { type ReactNode } from "react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { productRes } from "@/lib/schema";
import { ProductsDataTable } from "../components/products-data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

function ProductListSkeleton(): ReactNode {
  return (
    <Card className="w-full capitalize">
      <CardHeader>
        <CardTitle>Product List</CardTitle>
        <CardDescription>List of all avalible products</CardDescription>
        <div className="flex items-center py-2">
          <Input
            placeholder="Filter by product name"
            className="max-w-sm"
            disabled
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableBody>
              {Array.from({ length: 10 }, (_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell className="hidden lg:block">
                    <div className="h-4 w-8 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-end space-x-2 w-full">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="default" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ProductsPage(): ReactNode {
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/product/all");
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });
  const parseResult = productRes.safeParse(data);

  if (!parseResult.success && !isPending) {
    console.log(data);
    return <div>Cant load this page</div>;
  }
  return (
    <div className="max-w-[800px] mx-auto py-10">
      {isPending ? <ProductListSkeleton /> : <ProductsDataTable data={data} />}
    </div>
  );
}
