import { type ReactNode } from "react";
import ReceiptIncomeDialog from "@/components/ReceiptIncomeDialog";
import ReceiptExpenseDialog from "@/components/ReceiptExpenseDialog";

interface ReceiptTransactionButtonsProps {
  className?: string;
}

export default function ReceiptTransactionButtons({
  className,
}: ReceiptTransactionButtonsProps): ReactNode {
  return (
    <div className={`flex gap-2 ${className}`}>
      <ReceiptIncomeDialog />
      <ReceiptExpenseDialog />
    </div>
  );
}
