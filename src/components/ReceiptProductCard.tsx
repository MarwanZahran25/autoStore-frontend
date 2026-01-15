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
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs uppercase">
                {brand}
              </Badge>
              <span className="text-xs text-slate-500">#{id}</span>
            </div>
            <div className="text-sm font-medium truncate">{name}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-14 text-center">{quantity}</span>
            <span className="text-slate-400">×</span>
            <span className="w-20 text-center">QAR {price.toFixed(2)}</span>
            <span className="font-semibold w-24 text-right">
              QAR {total.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
