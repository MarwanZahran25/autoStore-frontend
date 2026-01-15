import { type ReactNode } from "react";
import { DataTable } from "./datatable";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Supplier = {
  id: number;
  name: string;
};

type Purchase = {
  purchase: {
    id: number;
    supplierId: number | null;

    qty: number;
    price: number | null;
    timeOfPurchase: string | null;
  };
  supplier: Supplier | null;
};

export default function PurchaseTable({
  data,
}: {
  data: Purchase[];
}): ReactNode {
  const columns: ColumnDef<Purchase>[] = [
    {
      accessorKey: "supplier",
      header: () => <div>Supplier</div>,
      cell: ({ row }) => {
        const supplier = row.original.supplier;
        return (
          <div className="font-medium text-xsm lg:text-md">
            {supplier ? supplier.name : "N/A"}
          </div>
        );
      },
    },

    {
      accessorKey: "purchase.qty",
      header: () => {
        return <div>QTY</div>;
      },
      cell: ({ row }) => {
        const qty = row.original.purchase.qty;
        return <div className="font-medium px-2">{qty}</div>;
      },
    },
    {
      accessorKey: "purchase.price",
      header: () => <div>Purchase Price</div>,
      cell: ({ row }) => {
        const price = row.original.purchase.price;
        return (
          <div className="font-medium">{price !== null ? price : "N/A"}</div>
        );
      },
    },
    {
      accessorKey: "purchase.timeOfPurchase",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-end"
        >
          Date
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      ),
      cell: ({ row }) => {
        const time = row.original.purchase.timeOfPurchase;
        return (
          <div className="font-medium text-xsm lg:text-md">
            {time ? new Date(time).toLocaleDateString() : "N/A"}
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      Description="history of all purchases"
      title="purchase history"
      input={false}
    />
  );
}
