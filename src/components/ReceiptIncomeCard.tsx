import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ReceiptIncomeCardProps {
  name: string;
  amount: number;
}

export default function ReceiptIncomeCard({
  name,
  amount,
}: ReceiptIncomeCardProps): ReactNode {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-200 rounded-full">
              <Plus className="h-3 w-3 text-green-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-green-800">{name}</div>
            </div>
          </div>
          <div className="font-semibold text-green-700">
            +QAR {amount.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}