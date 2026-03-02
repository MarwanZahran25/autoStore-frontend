import type { TransactionSchema } from "@/store";

interface ReceiptTotalProps {
  products: TransactionSchema[];
}

export default function ReceiptTotal({ products }: ReceiptTotalProps) {
  const total = products.reduce((total, entry) => {
    if (entry.productId !== undefined && entry.quantity !== undefined) {
      return total + entry.pricePerUnit! * entry.quantity;
    } else {
      return total + (entry.pricePerUnit || 0);
    }
  }, 0);

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between text-xl font-bold">
        <span>Total:</span>
        <span>QAR {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
