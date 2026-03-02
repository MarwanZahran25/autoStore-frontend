import ReceiptProductCard from "@/components/ReceiptProductCard";
import ReceiptIncomeCard from "@/components/ReceiptIncomeCard";
import ReceiptExpenseCard from "@/components/ReceiptExpenseCard";
import type { TransactionSchema } from "@/store";

interface ReceiptEntryListProps {
  entries: TransactionSchema[];
}

export default function ReceiptEntryList({ entries }: ReceiptEntryListProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry, index) => {
        // Product entry
        if (entry.productId !== undefined) {
          return (
            <ReceiptProductCard
              key={index}
              id={entry.productId}
              name={entry.name!}
              brand={entry.brand!}
              price={entry.pricePerUnit!}
              quantity={entry.quantity || 1}
            />
          );
        }

        // Income entry (positive price)
        if (entry.pricePerUnit && entry.pricePerUnit > 0) {
          return (
            <ReceiptIncomeCard
              key={index}
              name={entry.name!}
              amount={entry.pricePerUnit}
            />
          );
        }

        // Expense entry (negative price)
        return (
          <ReceiptExpenseCard
            key={index}
            name={entry.name!}
            amount={Math.abs(entry.pricePerUnit || 0)}
          />
        );
      })}
    </div>
  );
}
