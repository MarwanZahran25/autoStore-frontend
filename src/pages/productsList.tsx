import { type ReactNode } from "react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";
import { productRes } from "@/lib/schema";
import { DataTable } from "../components/datatable";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
export default function ProductsPage(): ReactNode {
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/product/all");
      return res.data;
    },
  });
  type product = {
    id: number;
    name: string;
    qty: number;
    price: number;
  };

  const parseResult = productRes.safeParse(data);
  const columns: ColumnDef<product>[] = [
    {
      accessorKey: "id",
      header: () => <div className=" hidden lg:block">ID</div>,
      cell: ({ row }) => {
        return (
          <div className=" font-medium hidden lg:block">
            {row.getValue("id")}
          </div>
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
            className=" justify-end"
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
  if (!parseResult.success) {
    console.log(data);
    return <div>Cant load this page</div>;
  }
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-[800px] mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        Description="List of all avalible products"
        title="Product List"
        input={true}
      />
    </div>
  );
}
