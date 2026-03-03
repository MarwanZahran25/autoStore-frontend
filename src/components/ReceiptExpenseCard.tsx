import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Minus } from "lucide-react";

interface ReceiptExpenseCardProps {
  name: string;
  amount: number;
}

export default function ReceiptExpenseCard({
  name,
  amount,
}: ReceiptExpenseCardProps): ReactNode {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-200 rounded-full">
              <Minus className="h-3 w-3 text-red-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-red-800">{name}</div>
            </div>
          </div>
          <div className="font-semibold text-red-700">
            -QAR {amount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}