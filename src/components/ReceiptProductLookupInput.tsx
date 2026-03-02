import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScanLine, Keyboard } from "lucide-react";

interface ProductLookupInputProps {
  productId: string;
  onProductIdChange: (id: string) => void;
  onFetch: () => void;
}

export default function ProductLookupInput({
  productId,
  onProductIdChange,
  onFetch,
}: ProductLookupInputProps) {
  return (
    <div className="relative flex-1">
      <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
      <Input
        type="text"
        placeholder="Scan or enter product ID"
        className="pl-10 pr-32 h-12"
        value={productId}
        onChange={(e) => onProductIdChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onFetch();
          }
        }}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onFetch}
          className="h-8"
        >
          <Keyboard className="h-4 w-4 mr-1" />
          Enter
        </Button>
      </div>
    </div>
  );
}
