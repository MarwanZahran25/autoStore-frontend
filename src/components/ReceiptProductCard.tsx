import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ReceiptProductProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
}

export default function ReceiptProductCard({
  id,
  name,
  brand,
  price,
  quantity,
}: ReceiptProductProps): ReactNode {
  const total = price * quantity;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs uppercase">
                {brand}
              </Badge>
            </div>
            <div className="text-sm font-medium">{name}</div>
            <div className="text-xs text-slate-500">#{id}</div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 text-sm mt-1 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="w-8 sm:w-14 text-center">{quantity}</span>
              <span className="text-slate-400">×</span>
              <span className="w-16 sm:w-20 text-center">QAR {price}</span>
            </div>
            <span className="font-semibold w-20 sm:w-24 text-right">
              QAR {total}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
