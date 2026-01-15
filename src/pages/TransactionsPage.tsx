import { ShoppingCart } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-600">
      <ShoppingCart className="h-24 w-24 mb-4 text-slate-400" />
      <h1 className="text-2xl font-semibold mb-2">Transactions</h1>
      <p className="text-slate-500">Transaction history will appear here</p>
    </div>
  )
}
