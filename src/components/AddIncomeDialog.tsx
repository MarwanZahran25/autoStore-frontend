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
import { Plus } from "lucide-react";
import axios from "axios";
import { backendServer } from "@/myConfig";
import { toast } from "sonner";
import { Datepicker } from "@/components/Datepicker";

type FormData = {
  name: string;
  amount: string;
  time: Date;
};

export default function AddIncomeDialog(): ReactNode {
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
        pricePerUnit: data.amount,
        time: data.time
      };
      await axios.post(`${backendServer}/transaction/add`, reqObj);
      toast.success("income added sucssefuly");
      form.reset();
      setOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        toast.error("couldn't add income" + e.message);
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
        <Button className="bg-green-200 text-green-800 hover:bg-green-300 h-10">
          <Plus className="h-4 w-4 mr-2" />
          Add Income
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          <DialogDescription>
            Enter the income details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="income-name">Name</Label>
              <Input
                id="income-name"
                type="text"
                placeholder="Enter income name"
                {...form.register("name", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income-amount">Amount</Label>
              <Input
                id="income-amount"
                type="number"
                step="1"
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
            <Button type="submit">Add Income</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
