import { type ReactNode } from "react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { receiptRes } from "@/lib/schema";
import { ReceiptsDataTable } from "../components/receipts-data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import * as z from "zod";

function ReceiptsSkeleton(): ReactNode {
  return (
    <Card className="w-full capitalize">
      <CardHeader>
        <CardTitle>Receipts</CardTitle>
        <CardDescription>List of all receipts</CardDescription>
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
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-end space-x-2 w-full">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            disabled
          >
            Previous
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            disabled
          >
            Next
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function AllReceiptsPage(): ReactNode {
  const { data, isPending, error } = useQuery({
    queryKey: ["receipts"],
    queryFn: async () => {
      const res = await api.get("/receipt/all");

      const parseResult = z.array(receiptRes).safeParse(res.data);
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
    return <div>Cant load this page</div>;
  }
  if (isPending) {
    return (
<div className="max-w-[800px] mx-auto py-10">
        <ReceiptsSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <ReceiptsDataTable data={data} />
    </div>
  );
}
