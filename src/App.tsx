import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProductForm from "./pages/AddProductForm";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors={true} />
      <AddProductForm />;
    </QueryClientProvider>
  );
}
