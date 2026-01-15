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
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus } from "lucide-react";

import { backendServer } from "@/myConfig";
import { toast } from "sonner";
import { Datepicker } from "@/components/Datepicker";

type FormData = {
  name: string;
  amount: string;
  time: Date;
};

export default function AddExpenseDialog(): ReactNode {
  const [open, setOpen] = useState(false);
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      amount: "",
      time: new Date(),
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      const reqObj = {
        name: data.name,
        pricePerUnit: parseInt(data.amount) * -1,
        time: data.time,
      };
      await api.post(`${backendServer}/transaction/add`, reqObj);
      toast.success("expense added sucssefuly");
      form.reset();
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        toast.error("couldn't add expense" + e.message);
        console.log(e);
      }
    }
  };

  const handleCancel = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-200 text-red-800 hover:bg-red-300 h-10">
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
            <Datepicker
              name="time"
              control={form.control}
              label="Date"
              placeholder="Select date"
            />
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
