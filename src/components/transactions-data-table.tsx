import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { transactionRes } from "@/lib/schema";
import * as z from "zod";

type transaction = z.infer<typeof transactionRes>;

const columns: ColumnDef<transaction>[] = [
  {
    accessorKey: "id",
    header: () => <div className="hidden lg:block">ID</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium hidden lg:block text-left">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      const productId: number = row.getValue("productId");
      console.log(productId);
      return productId ? (
        <Link to={`/product/${productId}`}>
          <div className="font-medium text-xsm lg:text-md text-left">
            {row.getValue("name")}
          </div>
        </Link>
      ) : (
        <div className="font-medium text-xsm lg:text-md text-left">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "receiptId",
    header: () => <div className="">Receipt ID</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.getValue("receiptId")}</div>
      );
    },
  },
  {
    accessorKey: "pricePerUnit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start"
        >
          Amount
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = row.getValue("pricePerUnit");
      return (
        <div
          className={`font-medium px-2 w-16 text-left ${
            price < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {price < 0 ? price : `+${price}`}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => {
      return <div className="justify-start text-left">Quantity</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium w-12 text-center">
          {row.getValue("quantity")}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: () => <div className="">Time</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.getValue("time")}</div>
      );
    },
  },
];

interface TransactionsDataTableProps {
  data: transaction[];
}

export function TransactionsDataTable({ data }: TransactionsDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      Description="List of all transactions"
      title="Transactions"
      input={false}
    />
  );
}
