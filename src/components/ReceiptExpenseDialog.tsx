import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus } from "lucide-react";
import { useReciptStore } from "@/store";

type FormData = {
  name: string;
  amount: string;
};

interface ReceiptExpenseDialogProps {
  className?: string;
}

export default function ReceiptExpenseDialog({
  className,
}: ReceiptExpenseDialogProps): ReactNode {
  const [open, setOpen] = useState(false);
  const { addEntry } = useReciptStore();
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    addEntry({
      name: data.name,
      pricePerUnit: -Number(data.amount),
    });
    form.reset();
    setOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`flex-1 bg-red-200 text-red-800 hover:bg-red-300 h-10 ${className}`}>
          <Minus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Enter the expense details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="expense-name">Name</Label>
              <Input
                id="expense-name"
                type="text"
                placeholder="Enter expense name"
                {...form.register("name", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-amount">Amount</Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                {...form.register("amount", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
