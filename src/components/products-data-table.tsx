import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./datatable";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type product = {
  id: number;
  name: string;
  qty: number;
  price: number;
};

const columns: ColumnDef<product>[] = [
  {
    accessorKey: "id",
    filterFn: (row, columnId, filterValue) => {
      const idValue = row.getValue<number>(columnId);
      return idValue
        .toString()
        .includes((filterValue ?? "").toString().trim());
    },
    header: () => <div className=" hidden lg:block">ID</div>,
    cell: ({ row }) => {
      return (
        <div className=" font-medium hidden lg:block">{row.getValue("id")}</div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      const productId: number = row.getValue("id");
      return (
        <Link to={`/product/${productId}`}>
          <div className=" font-medium text-xsm lg:text-md">
            {row.getValue("name")}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Selling Price</div>,
    cell: ({ row }) => {
      return <div className=" font-medium">{row.getValue("price")}</div>;
    },
  },
  {
    accessorKey: "qty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left justify-end"
        >
          QTY
          <ArrowUpDown className="ml-2 h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const qty: number = row.getValue("qty");
      return (
        <div
          className={` font-medium px-2 ${
            qty < 5 ? "text-red-500" : "text-black"
          }`}
        >
          {qty}
        </div>
      );
    },
  },
];

interface ProductsDataTableProps {
  data: product[];
}

export function ProductsDataTable({ data }: ProductsDataTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      Description="List of all avalible products"
      title="Product List"
      input={true}
    />
  );
}
