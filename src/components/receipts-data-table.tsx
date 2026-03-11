import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { receiptRes } from "@/lib/schema";
import * as z from "zod";

type receipt = z.infer<typeof receiptRes>;

const columns: ColumnDef<receipt>[] = [
  {
    accessorKey: "id",
    header: () => <div className="hidden lg:block max-w-[80px]">ID</div>,
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return (
        <div className="font-medium hidden lg:block text-left">
          <Link to={`/receipt/${id}`} className="hover:underline text-blue-600">
            {id}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start max-w-[120px]"
        >
          Total
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const total: number = row.getValue("total");
      return (
        <div
          className={`font-medium px-2 text-left ${
            total < 0 ? "text-red-500" : "text-green-600"
          }`}
        >
          {total < 0 ? total : `+${total}`}
        </div>
      );
    },
  },
  {
    accessorKey: "issuedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-left "
        >
          Issued At
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const issuedAt: string = row.getValue("issuedAt");
      return (
        <div className="font-medium pl-3 text-left">
          {new Date(issuedAt).toLocaleDateString()}
        </div>
      );
    },
  },
];

interface ReceiptsDataTableProps {
  data: receipt[];
}

export function ReceiptsDataTable({ data }: ReceiptsDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      Description="List of all receipts"
      title="Receipts"
      input={false}
    />
  );
}
